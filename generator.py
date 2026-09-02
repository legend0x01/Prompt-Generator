"""
PROMPT GENERATOR - ALGORITHMIC PROMPT ENHANCEMENT ENGINE
Pure Python prompt synthesis, framework builders (PTCC, CREATE, CoT, RTF),
strength scoring, variable tokenizers, and multi-format exporters.
100% API-Free, Standalone & Deterministic.
"""

import re
import json
from typing import Dict, List, Any, Optional
from templates import CURATED_TEMPLATES

# Tone instruction mappings
TONE_INSTRUCTIONS = {
    "authoritative": "Tone: Authoritative, decisive, highly technical, and uncompromising on best practices. Omit conversational pleasantries.",
    "socratic": "Tone: Socratic, inquisitive, probing assumptions, and highlighting trade-offs across competing paradigms.",
    "concise": "Tone: Ultra-concise, telegram-style efficiency, maximum information density with zero fluff.",
    "step_by_step": "Tone: Methodical, structured step-by-step pedagogical breakdown, explaining the 'why' behind each recommendation.",
    "conversational": "Tone: Engaging, relatable, clear, and punchy while maintaining deep domain authority.",
    "technical": "Tone: Senior engineering rigor, mathematically precise terminology, explicit edge-case handling, and strict type safety."
}

# Domain Expert Personas
DOMAIN_PERSONAS = {
    "code": "Principal Software Architect and Senior Security Engineer with 15+ years of experience across distributed systems, clean architecture, and performance optimization.",
    "image": "World-Class Cinematographer, Concept Artist, and Visual Effects Director specialized in 8K photorealism, Octane Render, and artistic composition.",
    "copy": "Elite Direct-Response Copywriting Director and Conversion Rate Optimization (CRO) strategist who has driven over $50M in customer acquisition.",
    "research": "Distinguished University Research Fellow and Epistemologist specializing in rigorous empirical synthesis, methodology critique, and peer-reviewed analysis.",
    "video": "Hollywood Director of Photography and AI Motion Director with expertise in dynamic camera blocking, lighting pacing, and physics simulation.",
    "agent": "Autonomous AI Alignment Specialist and Prompt Architect designing enterprise autonomous agent personas, guardrails, and deterministic tool-use systems.",
    "general": "Master Prompt Architect and Polymath with deep expertise in optimizing Large Language Model reasoning and structured problem solving."
}


class PromptEngine:
    """Core Algorithmic Prompt Engineering & Synthesis Engine"""

    def __init__(self):
        self.templates = CURATED_TEMPLATES

    def enhance(
        self,
        raw_prompt: str,
        domain: str = "general",
        framework: str = "ptcc",
        tone: str = "authoritative",
        target_ai: str = "Universal LLM (GPT-4o / Claude 3.5)",
        custom_vars: Optional[Dict[str, str]] = None
    ) -> Dict[str, Any]:
        """
        Takes raw user input and algorithmically elevates it into a master prompt.
        """
        clean_input = (raw_prompt or "").strip()
        if not clean_input:
            clean_input = "Build a high-performance modern web application with clean architecture"

        domain_key = domain.lower()
        if domain_key not in DOMAIN_PERSONAS:
            domain_key = "general"

        framework_key = framework.lower()

        # Route by domain & framework
        if domain_key == "image":
            enhanced_text = self._enhance_image(clean_input, target_ai, tone)
        elif domain_key == "video":
            enhanced_text = self._enhance_video(clean_input, target_ai, tone)
        elif framework_key == "create":
            enhanced_text = self._enhance_create(clean_input, domain_key, tone, target_ai)
        elif framework_key == "cot":
            enhanced_text = self._enhance_cot(clean_input, domain_key, tone, target_ai)
        elif framework_key == "rtf":
            enhanced_text = self._enhance_rtf(clean_input, domain_key, tone, target_ai)
        else:
            # Default to PTCC (Persona, Task, Context, Constraints)
            enhanced_text = self._enhance_ptcc(clean_input, domain_key, tone, target_ai)

        # Apply custom variable replacements if provided
        if custom_vars:
            enhanced_text = self.render_variables(enhanced_text, custom_vars)

        # Extract variables remaining in the prompt
        extracted_vars = self.extract_variables(enhanced_text)

        # Evaluate quality & strength
        strength_eval = self.evaluate_strength(enhanced_text)

        # Generate multi-platform exports
        exports = self.generate_exports(enhanced_text, domain_key, target_ai)

        return {
            "status": "success",
            "original_prompt": clean_input,
            "enhanced_prompt": enhanced_text,
            "domain": domain_key,
            "framework": framework_key,
            "tone": tone,
            "target_ai": target_ai,
            "strength": strength_eval,
            "variables": extracted_vars,
            "exports": exports
        }

    def _enhance_ptcc(self, input_text: str, domain: str, tone: str, target_ai: str) -> str:
        """Persona, Task, Context, Constraints Framework (Deep Multi-Section Synthesis)"""
        persona = DOMAIN_PERSONAS.get(domain, DOMAIN_PERSONAS["general"])
        tone_line = TONE_INSTRUCTIONS.get(tone, TONE_INSTRUCTIONS["authoritative"])

        return f"""### 1. EXECUTIVE ROLE & COGNITIVE PERSONA
You are operating as a **{persona}**.
Your cognitive mode is set to maximum rigor, systems-level thinking, and uncompromising adherence to industry best practices. You provide production-ready, battle-tested solutions rather than high-level theoretical overviews.

### 2. PRIMARY OBJECTIVE & CORE MISSION
{input_text}

### 3. CONTEXT & ARCHITECTURAL FOUNDATION
- **Execution Target**: High-stakes production environment optimized for {target_ai}.
- **Target Audience / Stakeholders**: Senior technical architects, enterprise leads, and product teams requiring zero-defect execution.
- **Architectural Tenets**:
  - Modular, decoupled, and highly maintainable structure.
  - High performance, minimal latency, and defensive memory/resource management.
  - Strict type safety, deterministic logic, and clear separation of concerns.

### 4. GRANULAR EXECUTION DIRECTIVES & STEP-BY-STEP METHODOLOGY
Execute this mission through the following systematic stages:
1. **Pre-Implementation Analysis**: Briefly evaluate the problem space from first principles, outlining core assumptions and key architectural trade-offs.
2. **Production-Grade Implementation**: Deliver the complete, fully articulated solution. Provide exhaustive implementations with zero placeholders (`// todo`, `// add more here` are strictly forbidden).
3. **Defensive Hardening & Edge-Case Coverage**: Explicitly identify and mitigate at least 3 edge cases, race conditions, security vulnerabilities, or error states.
4. **Verification & Quality Assurance Suite**: Provide test assertions, validation schemas, or a concrete QA checklist verifying correctness against edge cases.

### 5. EXHAUSTIVE NEGATIVE CONSTRAINTS & ANTI-PATTERNS (GUARDRAILS)
- **Zero-Fluff Rule**: Strictly eliminate conversational preambles, introductory small talk, and generic conclusions. Begin directly with the core solution.
- **Anti-Hallucination Mandate**: Never fabricate non-existent API parameters or deprecated libraries. Ground all recommendations in verified industry standards.
- **No Incomplete Snippets**: All code, configurations, copy, or diagrams must be syntactically valid and completely copy-pasteable.
- **Strict Formatting**: Enforce consistent Markdown hierarchy, syntax-highlighted code blocks, and structured comparison tables where appropriate.

### 6. TONE & DELIVERY SPECIFICATION
{tone_line}"""

    def _enhance_create(self, input_text: str, domain: str, tone: str, target_ai: str) -> str:
        """Character, Request, Examples, Adjustments, Type, Extras Framework (Deep Synthesis)"""
        persona = DOMAIN_PERSONAS.get(domain, DOMAIN_PERSONAS["general"])
        tone_line = TONE_INSTRUCTIONS.get(tone, TONE_INSTRUCTIONS["authoritative"])

        return f"""### [CHARACTER] Role & Domain Authority
Act as a **{persona}**. You possess world-class expertise in strategic execution, clean design patterns, and high-performance delivery.

### [REQUEST] Primary Deliverable & Core Mission
{input_text}

### [EXAMPLES & BENCHMARK STANDARDS]
- The standard of execution must match the level of a Principal Staff Engineer or Fortune 500 Creative Director.
- All structural patterns must adhere strictly to verified industry reference architectures, clean code guidelines, and empirical evidence.
- Prioritize concrete implementations with clear examples of input, transformation, and validated output.

### [ADJUSTMENTS & TRADE-OFF ANALYSIS]
- Dissect the non-obvious trade-offs between architectural complexity vs maintainability, developer ergonomics vs raw performance.
- If requirements present ambiguities, state the optimal industry-standard assumption explicitly and proceed with full execution.
- Anticipate secondary side-effects, scalability limits, and lifecycle maintenance costs.

### [TYPE OF OUTPUT] Structured Deliverable Taxonomy
Provide a structured, multi-section artifact formatted in clean Markdown with:
1. `## 1. Executive Summary & Strategic Architecture Blueprint`
2. `## 2. Complete Production Implementation (Fully Documented)`
3. `## 3. Edge-Case Matrix & Security / Performance Optimizations`
4. `## 4. Verification Suite & Deployment / Testing Checklist`

### [EXTRAS] Strict Guardrails & Tone Directives
- Eliminate boilerplate pleasantries and filler text.
- {tone_line}
- Optimized for high-reasoning fidelity in {target_ai}."""

    def _enhance_cot(self, input_text: str, domain: str, tone: str, target_ai: str) -> str:
        """Chain-of-Thought (CoT) & Tree-of-Thoughts Deep Multi-Stage Reasoning"""
        persona = DOMAIN_PERSONAS.get(domain, DOMAIN_PERSONAS["general"])
        tone_line = TONE_INSTRUCTIONS.get(tone, TONE_INSTRUCTIONS["authoritative"])

        return f"""You are operating as a **{persona}**.

### PRIMARY OBJECTIVE:
{input_text}

### MANDATORY CHAIN-OF-THOUGHT (CoT) REASONING WORKFLOW:
Before delivering the final output, you must explicitly document your reasoning across the following structured stages:

```markdown
### STAGE 1: First-Principles Problem Decomposition
- Break the core objective down into fundamental conceptual and technical components.
- Identify hidden constraints, critical dependencies, user personas, and runtime boundaries.

### STAGE 2: Architectural Trade-Off Analysis (Approach A vs Approach B)
- Formulate at least two distinct viable approaches to solving this objective.
- Compare them systematically across: (1) Performance & Latency, (2) Architectural Complexity, (3) Maintainability, (4) Failure Modes.
- Explicitly declare the winning approach and justify the selection.

### STAGE 3: Threat Modeling & Defensive Risk Mitigation
- Anticipate potential failure modes, edge cases, race conditions, or security vectors.
- Define explicit validation, retry, or fallback mechanisms.
```

### FINAL PRODUCTION DELIVERABLE:
Deliver the finalized, production-grade output strictly adhering to:
1. Complete, non-truncated implementation artifacts with zero placeholders.
2. Production-grade error handling, comments, and structure.
3. Verification test suite or operational validation steps.
4. {tone_line}"""

    def _enhance_rtf(self, input_text: str, domain: str, tone: str, target_ai: str) -> str:
        """Role, Task, Format Framework (Deep Multi-Section Specification)"""
        persona = DOMAIN_PERSONAS.get(domain, DOMAIN_PERSONAS["general"])
        tone_line = TONE_INSTRUCTIONS.get(tone, TONE_INSTRUCTIONS["authoritative"])

        return f"""### 1. ROLE & IDENTITY
{persona}

### 2. EXHAUSTIVE TASK SPECIFICATION
{input_text}

### 3. FORMAT & OUTPUT SPECIFICATION:
Your response must strictly follow this structured hierarchy:
- **Executive Blueprint**: 2-3 sentences outlining the strategic rationale.
- **Core Architecture & Schemas**: Definitions of data structures, interfaces, and configurations.
- **Production Implementation**: Complete, robust implementation code/copy with zero placeholder comments.
- **Edge-Case & Validation Matrix**: Formatted comparison table listing:
  | Scenario / Edge Case | Threat / Failure Vector | Defensive Mitigation |
- **Verification Assertions**: Concrete unit tests or verification checklist.
- **Tone Directive**: {tone_line}"""

    def _enhance_image(self, input_text: str, target_ai: str, tone: str) -> str:
        """Midjourney / Flux / SDXL Visual Art Engine (Ultra-Detailed Cinematic Specification)"""
        return f"""An ultra-detailed cinematic 8K masterpiece photograph of {input_text}.

Environment, Scene & Atmosphere:
- Intricate environmental storytelling with rich atmospheric depth, delicate volumetric fog, rain-slicked reflective surfaces, and subtle atmospheric dust motes.
- Raytraced global illumination with dramatic golden hour ambient fill, neon/cyan rim lighting accents, and natural subsurface scattering on organic textures.

Camera, Optics & Composition:
- Shot on Hasselblad H6D-100c medium format camera with an 85mm f/1.4 prime lens.
- Razor-sharp focus on primary subject with creamy, soft optical bokeh in background.
- Cinematic anamorphic lens flare, natural film grain texture, and Golden Ratio dynamic framing.

Color Grading & Render Quality:
- Kodak Portra 400 color science, deep rich shadows, balanced highlights with high dynamic range (HDR).
- Octane Render 3D and Unreal Engine 5 level physical fidelity, masterpiece composition trending on ArtStation and Behance.

Parameters:
--ar 16:9 --v 6.0 --style raw --stylize 350 --quality 2

Negative Prompt:
blurry, low resolution, deformed limbs, extra fingers, mutated hands, bad anatomy, cartoon, 3d render, plastic skin, watermark, signature, text, oversaturated, amateur photography, cropped, duplicate"""

    def _enhance_video(self, input_text: str, target_ai: str, tone: str) -> str:
        """Video & Motion Generation Engine (Sora, Runway Gen-3, Kling)"""
        return f"""Cinematic 4K hyper-detailed dynamic video shot: {input_text}.

Camera Choreography & Motion Vectors:
- Begins with a dynamic low-angle tracking shot sweeping smoothly along the subject, transitioning into a sweeping high-angle aerial drone orbit.
- Seamless fluid motion with cinematic camera damping, subtle handheld realism, and intentional depth-of-field focus pulls.

Lighting Dynamics & Atmospheric Pacing:
- Volumetric sunbeams piercing through atmospheric haze, dramatic rim light separating subject from background, and dynamic shadows shifting realistically across surfaces.
- 35mm Panavision anamorphic lens flares with natural optical aberrations and rich cinematic color grade.

Physics, Particle & Surface Interactions:
- Physically accurate fluid dynamics, micro-particles/dust swirling in illumination beams, and lifelike material inertia and surface reflections.
- 60fps high-framerate capture rendered down to 24fps cinema standard with realistic optical motion blur."""

    # -------------------------------------------------------------
    # PROMPT STRENGTH & QUALITY SCORER
    # -------------------------------------------------------------
    def evaluate_strength(self, prompt_text: str) -> Dict[str, Any]:
        """
        Evaluates a prompt on 5 dimensions (0-100 score).
        """
        text = prompt_text or ""
        score = 0
        breakdown = {}

        # 1. Role & Persona Clarity (0-20)
        has_role = bool(re.search(r'\b(act as|you are|role|persona|expert|specialist|architect|fellow|engineer|tester|director|strategist)\b', text, re.I))
        role_score = 20 if has_role else 5
        score += role_score
        breakdown["role_clarity"] = {
            "score": role_score,
            "max": 20,
            "status": "Optimal Persona Set" if role_score == 20 else "Needs Persona Definition"
        }

        # 2. Context & Objective Richness (0-20)
        word_count = len(text.split())
        if word_count > 120:
            context_score = 20
        elif word_count > 60:
            context_score = 15
        elif word_count > 20:
            context_score = 10
        else:
            context_score = 5
        score += context_score
        breakdown["context_depth"] = {
            "score": context_score,
            "max": 20,
            "status": "Rich & Detailed Context" if context_score >= 15 else "Could be more detailed"
        }

        # 3. Explicit Constraints & Guardrails (0-20)
        has_constraints = bool(re.search(r'\b(constraints?|guardrails?|do not|never|avoid|must|strictly|zero-fluff|rules?|limitations?|strictest)\b', text, re.I))
        constraint_score = 20 if has_constraints else 6
        score += constraint_score
        breakdown["constraints_guardrails"] = {
            "score": constraint_score,
            "max": 20,
            "status": "Guarded & Strict Constraints" if constraint_score == 20 else "Add explicit negative constraints"
        }

        # 4. Output Formatting & Structure (0-20)
        has_format = bool(re.search(r'\b(formats?|markdown|headings?|bullets?|tables?|json|code blocks?|step-by-step|sections?|schema|output)\b', text, re.I))
        format_score = 20 if has_format else 6
        score += format_score
        breakdown["output_formatting"] = {
            "score": format_score,
            "max": 20,
            "status": "Strict Output Format Defined" if format_score == 20 else "Specify output format explicitly"
        }

        # 5. Reasoning Triggers & Specificity (0-20)
        has_reasoning = bool(re.search(r'\b(reasoning|chain-of-thought|analy(ze|se)|dissect|first principles|trade-offs?|edge cases?|steps?|methodical)\b', text, re.I))
        reasoning_score = 20 if has_reasoning else 8
        score += reasoning_score
        breakdown["reasoning_depth"] = {
            "score": reasoning_score,
            "max": 20,
            "status": "Deep Reasoning Triggers Active" if reasoning_score == 20 else "Add step-by-step reasoning prompts"
        }

        # Rating Tier
        if score >= 90:
            rating = "Elite (Production Ready)"
            grade = "A+"
            color = "#10b981"
        elif score >= 75:
            rating = "Strong (High Quality)"
            grade = "A"
            color = "#3b82f6"
        elif score >= 55:
            rating = "Moderate (Average)"
            grade = "B"
            color = "#f59e0b"
        else:
            rating = "Basic (Needs Enhancement)"
            grade = "C"
            color = "#ef4444"

        return {
            "total_score": score,
            "grade": grade,
            "rating": rating,
            "color": color,
            "breakdown": breakdown
        }

    # -------------------------------------------------------------
    # VARIABLE EXTRACTION & RENDERING
    # -------------------------------------------------------------
    def extract_variables(self, text: str) -> List[str]:
        """Extract all {{variable}} tags from text."""
        matches = re.findall(r'\{\{([a-zA-Z0-9_]+)\}\}', text or "")
        # Return unique in order of appearance
        seen = set()
        unique = []
        for m in matches:
            if m not in seen:
                seen.add(m)
                unique.append(m)
        return unique

    def render_variables(self, text: str, vars_dict: Dict[str, str]) -> str:
        """Replace all {{var}} with actual string values."""
        result = text
        for k, v in vars_dict.items():
            pattern = re.compile(r'\{\{' + re.escape(k) + r'\}\}')
            result = pattern.sub(str(v), result)
        return result

    # -------------------------------------------------------------
    # MULTI-PLATFORM EXPORTERS
    # -------------------------------------------------------------
    def generate_exports(self, prompt_text: str, domain: str, target_ai: str) -> Dict[str, str]:
        """Generates formats for System Prompt, Raw, JSON, Markdown, and Ollama."""
        raw = prompt_text.strip()

        # System Prompt format
        system_prompt = f"""[SYSTEM_PROMPT]
{raw}
[/SYSTEM_PROMPT]"""

        # JSON Format
        json_export = json.dumps({
            "prompt": raw,
            "domain": domain,
            "target_model": target_ai,
            "variables": self.extract_variables(raw)
        }, indent=2)

        # Ollama Modelfile format
        ollama_modelfile = f"""FROM llama3.2
# System instructions engineered for {domain}
SYSTEM \"\"\"
{raw}
\"\"\"
PARAMETER temperature 0.3
PARAMETER top_p 0.9"""

        return {
            "raw": raw,
            "system_prompt": system_prompt,
            "json": json_export,
            "ollama_modelfile": ollama_modelfile
        }
