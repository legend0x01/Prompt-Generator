"""
PROMPT GENERATOR - PRODUCTION PYTHON BACKEND & REST API SERVER
Serves the modern frontend and provides algorithmic prompt enhancement endpoints.
Built entirely using the Python Standard Library (0 External Dependencies).
"""

import sys
import os
import json
import mimetypes
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from generator import PromptEngine
from templates import CURATED_TEMPLATES

# Initialize Prompt Engine
engine = PromptEngine()

class PromptServerHandler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def _send_response_data(self, status_code=200, content_type='application/json', data=b''):
        self.send_response(status_code)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Connection', 'close')
        self.end_headers()
        if data:
            self.wfile.write(data)

    def do_OPTIONS(self):
        """Handle CORS pre-flight requests."""
        self._send_response_data(204, 'text/plain', b'')

    def do_GET(self):
        """Serve Static Web Files & REST API Endpoints."""
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        # REST API Routes
        if path == '/api/health':
            res_data = json.dumps({"status": "ok", "version": "1.0.0", "service": "Prompt Generator"}).encode('utf-8')
            self._send_response_data(200, 'application/json', res_data)
            return

        if path == '/api/templates':
            res_data = json.dumps({"status": "success", "templates": CURATED_TEMPLATES}).encode('utf-8')
            self._send_response_data(200, 'application/json', res_data)
            return

        # Static File Serving
        if path == '/' or path == '':
            file_path = os.path.join(os.path.dirname(__file__), 'index.html')
        else:
            clean_path = path.lstrip('/')
            file_path = os.path.join(os.path.dirname(__file__), clean_path)

        # Normalize and prevent directory traversal
        file_path = os.path.abspath(file_path)
        base_dir = os.path.abspath(os.path.dirname(__file__))
        if not file_path.startswith(base_dir):
            self._send_response_data(403, 'text/plain', b'403 Forbidden')
            return

        if os.path.exists(file_path) and os.path.isfile(file_path):
            mime_type, _ = mimetypes.guess_type(file_path)
            if not mime_type:
                mime_type = 'application/octet-stream'
            if file_path.endswith('.js'):
                mime_type = 'application/javascript; charset=utf-8'
            elif file_path.endswith('.css'):
                mime_type = 'text/css; charset=utf-8'
            elif file_path.endswith('.svg'):
                mime_type = 'image/svg+xml'
            elif file_path.endswith('.html'):
                mime_type = 'text/html; charset=utf-8'

            try:
                with open(file_path, 'rb') as f:
                    content = f.read()
                self._send_response_data(200, mime_type, content)
            except Exception as e:
                self._send_response_data(500, 'text/plain', f"500 Internal Error: {e}".encode('utf-8'))
        else:
            self._send_response_data(404, 'text/html', b"<h1>404 Not Found</h1><p>Prompt Generator could not find the requested file.</p>")

    def do_POST(self):
        """Handle Prompt Enhancement & Evaluation API Requests."""
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'

        try:
            body = json.loads(post_data) if post_data else {}
        except Exception:
            err_data = json.dumps({"status": "error", "message": "Invalid JSON body"}).encode('utf-8')
            self._send_response_data(400, 'application/json', err_data)
            return

        if path == '/api/enhance':
            raw_prompt = body.get('prompt', '')
            domain = body.get('domain', 'general')
            framework = body.get('framework', 'ptcc')
            tone = body.get('tone', 'authoritative')
            target_ai = body.get('target_ai', 'Universal LLM')
            custom_vars = body.get('variables', {})

            result = engine.enhance(
                raw_prompt=raw_prompt,
                domain=domain,
                framework=framework,
                tone=tone,
                target_ai=target_ai,
                custom_vars=custom_vars
            )
            res_data = json.dumps(result).encode('utf-8')
            self._send_response_data(200, 'application/json', res_data)
            return

        if path == '/api/evaluate':
            prompt_text = body.get('prompt', '')
            strength = engine.evaluate_strength(prompt_text)
            res_data = json.dumps({"status": "success", "strength": strength}).encode('utf-8')
            self._send_response_data(200, 'application/json', res_data)
            return

        err_data = json.dumps({"status": "error", "message": "API endpoint not found"}).encode('utf-8')
        self._send_response_data(404, 'application/json', err_data)

    def log_message(self, format, *args):
        """Clean console output formatting."""
        sys.stderr.write(f"[PromptServer] {self.address_string()} - {format % args}\n")


def run_tests():
    """Run backend verification test suite."""
    print("=== Running Prompt Engine Self-Tests ===")
    test_result = engine.enhance(
        raw_prompt="Write a React login component with OAuth",
        domain="code",
        framework="ptcc",
        tone="authoritative"
    )
    assert test_result["status"] == "success", "Enhance returned non-success"
    assert test_result["strength"]["total_score"] >= 80, "Prompt score below benchmark"
    assert len(test_result["enhanced_prompt"]) > 100, "Enhanced prompt too short"
    print("[PASS] Code Domain PTCC Enhancement Test")

    image_result = engine.enhance(
        raw_prompt="A futuristic cyberpunk samurai in rain",
        domain="image"
    )
    assert "--ar" in image_result["enhanced_prompt"], "Midjourney parameters missing"
    print("[PASS] Image Domain Parameter Synthesis Test")

    score_result = engine.evaluate_strength("Act as a Senior Architect. Output JSON with strict constraints.")
    assert score_result["total_score"] >= 60, "Evaluation scoring mismatch"
    print("[PASS] Prompt Strength Evaluator Test")

    print("=== ALL BACKEND TESTS PASSED SUCCESSFULLY ===")


def main():
    if '--test' in sys.argv:
        run_tests()
        return

    port = 8000
    for arg in sys.argv:
        if arg.isdigit():
            port = int(arg)

    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')

    server_address = ('', port)
    httpd = HTTPServer(server_address, PromptServerHandler)
    print("==================================================")
    print(f"[Prompt Generator] Server Active on port {port}")
    print(f"[Prompt Generator] Local URL: http://localhost:{port}")
    print("[Prompt Generator] Engine: Python Standard Library + Pure JavaScript")
    print("==================================================")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()


if __name__ == '__main__':
    main()
