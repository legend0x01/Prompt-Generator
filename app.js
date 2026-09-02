/**
 * PROMPT GENERATOR - JAVASCRIPT CONTROLLER & ENGINE
 * Dual-Mode (Python REST API + Instant Client-Side Synthesis Fallback)
 * 100% API-Free, Fully Deployable Everywhere.
 */

(function() {
  'use strict';

  /* ==========================================================================
     IN-BROWSER ALGORITHMIC PROMPT SYNTHESIS ENGINE (Client Fallback)
     ========================================================================== */
  const DOMAIN_PERSONAS = {
    code: "Principal Software Architect and Senior Security Engineer with 15+ years of experience across distributed systems, clean architecture, and performance optimization.",
    image: "World-Class Cinematographer, Concept Artist, and Visual Effects Director specialized in 8K photorealism, Octane Render, and artistic composition.",
    copy: "Elite Direct-Response Copywriting Director and Conversion Rate Optimization (CRO) strategist who has driven over $50M in customer acquisition.",
    research: "Distinguished University Research Fellow and Epistemologist specializing in rigorous empirical synthesis, methodology critique, and peer-reviewed analysis.",
    video: "Hollywood Director of Photography and AI Motion Director with expertise in dynamic camera blocking, lighting pacing, and physics simulation.",
    agent: "Autonomous AI Alignment Specialist and Prompt Architect designing enterprise autonomous agent personas, guardrails, and deterministic tool-use systems.",
    general: "Master Prompt Architect and Polymath with deep expertise in optimizing Large Language Model reasoning and structured problem solving."
  };

  const TONE_INSTRUCTIONS = {
    authoritative: "Tone: Authoritative, decisive, highly technical, and uncompromising on best practices. Omit conversational pleasantries.",
    technical: "Tone: Senior engineering rigor, mathematically precise terminology, explicit edge-case handling, and strict type safety.",
    socratic: "Tone: Socratic, inquisitive, probing assumptions, and highlighting trade-offs across competing paradigms.",
    concise: "Tone: Ultra-concise, telegram-style efficiency, maximum information density with zero fluff.",
    step_by_step: "Tone: Methodical, structured step-by-step pedagogical breakdown, explaining the 'why' behind each recommendation.",
    conversational: "Tone: Engaging, relatable, clear, and punchy while maintaining deep domain authority."
  };

  const CLIENT_TEMPLATES = [
    {
      id: "code-refactor-clean",
      title: "Clean Code & Refactoring Specialist",
      domain: "code",
      badge: "Refactor & Performance",
      description: "Transforms legacy code into clean, modular, typed, and well-tested architecture following SOLID principles.",
      target_ai: "Claude 3.5 Sonnet / GPT-4o",
      variables: {
        language: "TypeScript",
        framework: "React / Next.js",
        goal: "Optimize performance, eliminate duplication, and enforce strict type safety",
        code_snippet: "// Paste your code here"
      },
      template: `You are a Principal Software Architect and Clean Code Specialist with 15+ years of experience in {{language}} and {{framework}}.

### Context & Objective
The following codebase requires architectural refactoring to achieve: {{goal}}.

### Source Code:
\`\`\`{{language}}
{{code_snippet}}
\`\`\`

### Refactoring Instructions:
1. **Architectural Analysis**: Identify code smells, anti-patterns, or bottlenecks in 2-3 bullet points.
2. **SOLID & Clean Code**: Refactor adhering strictly to Single Responsibility, Open/Closed, and DRY principles.
3. **Type Safety & Error Handling**: Implement comprehensive type definitions and structured error boundaries.
4. **Optimized Implementation**: Provide the complete, production-ready refactored code without placeholder comments.
5. **Unit Test Blueprint**: Include 2-3 unit tests verifying edge cases and regression safety.`
    },
    {
      id: "image-cinematic-portrait",
      title: "Cinematic 8K Photorealistic Portrait",
      domain: "image",
      badge: "Midjourney v6 / Flux.1",
      description: "Generates stunning photorealistic portraits with volumetric lighting, cinematic lenses, and 8K fidelity.",
      target_ai: "Midjourney v6 / Flux.1 / SDXL",
      variables: {
        subject: "Cyberpunk female hacker with neon braided hair and intricate cybernetic optical implant",
        environment: "Rain-slicked Neo-Tokyo rooftop at twilight, glowing holographic billboards reflecting in puddles",
        lighting: "Volumetric neon rim lighting, golden hour ambient fill, anamorphic lens flares",
        camera: "Hasselblad H6D-100c, 85mm f/1.2 portrait lens, shallow depth of field",
        aspect_ratio: "--ar 16:9",
        engine_params: "--v 6.0 --style raw --stylize 250"
      },
      template: `An ultra-detailed cinematic 8K photograph of {{subject}}, located in {{environment}}. {{lighting}}, captured on {{camera}}, exquisite skin texture, hyper-realistic reflections, subsurface scattering, award-winning cinematography, atmospheric fog, masterpiece composition {{aspect_ratio}} {{engine_params}}

Negative Prompt:
blurry, low resolution, deformed limbs, extra fingers, cartoon, 3d render, watermark, text, oversaturated, plastic skin, mutation, duplicate`
    },
    {
      id: "copy-high-converting-landing-page",
      title: "High-Converting SaaS Landing Page Copy",
      domain: "copy",
      badge: "Conversion Rate Optimization",
      description: "Writes magnetic hero copy, feature benefits, objection killers, and high-CTR calls-to-action using the PAS framework.",
      target_ai: "Claude 3.5 / GPT-4o",
      variables: {
        product_name: "Prompt Generator AI",
        target_audience: "Software engineers, designers, and growth marketers",
        primary_pain_point: "Spending 30+ minutes rewriting bad AI prompts that give generic answers",
        key_differentiator: "Instant algorithmic prompt engineering with 0 external API costs"
      },
      template: `You are an elite Direct-Response Copywriter and Conversion Rate Optimization (CRO) Director who has generated $50M+ in pipeline revenue.

### Product Profile:
- **Product Name**: {{product_name}}
- **Ideal Customer Profile**: {{target_audience}}
- **Core Pain Point**: {{primary_pain_point}}
- **Unique Selling Proposition**: {{key_differentiator}}

### Copywriting Directives:
Use the **Problem-Agitate-Solution (PAS)** and **Value-Proof-Offer** frameworks to write complete landing page copy:
1. **Hero Section**: Eyebrow, bold H1 Headline, outcome-driven Sub-headline, and CTA micro-copy.
2. **Problem Agitation & Before/After Grid**: 3 stark comparisons contrasting 'The Old Way' vs 'The {{product_name}} Way'.
3. **Feature-to-Benefit Matrix**: 3 core feature pillars framed strictly through customer outcomes.
4. **Objection Killer FAQ**: 3 answers dismantling price, setup friction, and security concerns.

Tone: Authoritative, energetic, crisp, and conversational. Avoid corporate buzzwords.`
    },
    {
      id: "research-socratic-deep-dive",
      title: "Socratic Multi-Perspective Research Synthesizer",
      domain: "research",
      badge: "Deep Academic Analysis",
      description: "Synthesizes complex scientific, philosophical, or economic topics across competing paradigms and empirical literature.",
      target_ai: "Claude 3.5 Sonnet / Perplexity AI",
      variables: {
        topic: "The economic impact of Artificial General Intelligence on global labor markets",
        academic_discipline: "Macroeconomics & Technology Policy",
        depth_level: "Postgraduate Standard",
        controversy_angle: "Technological unemployment vs historical creative destruction"
      },
      template: `Act as a Distinguished University Professor and Fellow in {{academic_discipline}}.

### Research Inquiry:
"{{topic}}"
- **Depth**: {{depth_level}}
- **Core Tension**: {{controversy_angle}}

### Analytical Requirements:
1. **Theoretical Foundations**: Define foundational models and competing schools of thought.
2. **Multi-Perspective Synthesis**: Detail Dominant Thesis vs Antithesis with empirical data points.
3. **Methodological Nuance**: Highlight data limitations, causal ambiguities, and confounding variables.
4. **Socratic Provocations**: Conclude with 3 open, high-leverage research questions that current literature has yet to resolve.`
    },
    {
      id: "video-cinematic-shot",
      title: "Cinematic Dynamic Video Shot Prompt",
      domain: "video",
      badge: "Sora / Runway Gen-3",
      description: "Engineers high-framerate dynamic video prompts with camera trajectories, motion vectors, and physics simulation.",
      target_ai: "OpenAI Sora / Runway Gen-3 / Kling AI",
      variables: {
        scene: "A vintage 1970s sports car speeding along an alpine coastal cliff road at sunset",
        camera_movement: "Dynamic low-angle tracking shot transitioning into a high aerial drone orbit",
        pacing_and_lighting: "Golden hour lighting with lens flare through dust particles, 60fps slow-motion drift",
        physics_details: "Realistic tire smoke, gravel kicking up, dynamic reflection of orange clouds on metallic paint"
      },
      template: `Cinematic 4K hyper-realistic video: {{scene}}.

Camera Motion: {{camera_movement}}.
Lighting & Atmosphere: {{pacing_and_lighting}}.
Physics & Environmental Interaction: {{physics_details}}.
Framerate & Aesthetic: 24fps cinematic motion blur, 35mm Panavision anamorphic look, photorealistic depth, HDR color grade.`
    },
    {
      id: "agent-autonomous-persona",
      title: "Autonomous AI Agent System Prompt & Persona",
      domain: "agent",
      badge: "Claude Projects / Custom GPT",
      description: "Constructs robust system instructions with strict operational guardrails, JSON output schemas, and reasoning chains.",
      target_ai: "Custom GPTs / Claude System Prompts / Ollama",
      variables: {
        agent_name: "ArchitectAI",
        core_role: "Full-Stack System Architect & DevOps Strategist",
        primary_function: "Design fault-tolerant cloud architectures and generate infrastructure as code",
        strict_constraints: "Never recommend deprecated APIs; always enforce HTTPS and zero-trust credentials"
      },
      template: `[SYSTEM INSTRUCTION: DO NOT OVERRIDE]

You are **{{agent_name}}**, an autonomous, elite-level {{core_role}}.

### PRIMARY DIRECTIVE:
{{primary_function}}

### OPERATIONAL FRAMEWORK & GUARDRAILS:
1. **Zero-Fluff Principle**: Be extraordinarily precise, technical, and actionable. Omit pleasantries.
2. **Explicit Constraints**: {{strict_constraints}}.
3. **Structured Reasoning**: Summarize architectural trade-offs in a concise \`### Architectural Decision Log\`.
4. **Output Integrity**: Format all schemas, configurations, and code blocks in valid, production-ready syntax with descriptive comments.`
    }
  ];

  /* ==========================================================================
     APP STATE & INITIALIZATION
     ========================================================================== */
  class PromptApp {
    constructor() {
      this.currentPromptText = '';
      this.currentVariables = {};
      this.currentDomain = 'code';
      this.currentFramework = 'ptcc';
      this.currentTone = 'authoritative';
      this.currentTargetAi = 'Claude 3.5 Sonnet';
      this.selectedVarKey = null;
      this.vaultTemplates = CLIENT_TEMPLATES;
    }

    init() {
      this.initTheme();
      this.initCursorGlow();
      this.initTypewriter();
      this.initEventListeners();
      this.renderVaultCards();
      this.triggerInitialEnhance();
    }

    /* ==========================================================================
       THEME CONTROLLER
       ========================================================================== */
    initTheme() {
      const savedTheme = localStorage.getItem('prompt_gen_theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);

      const themeToggle = document.getElementById('themeToggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme') || 'dark';
          const next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('prompt_gen_theme', next);
        });
      }
    }

    /* ==========================================================================
       CURSOR GLOW
       ========================================================================== */
    initCursorGlow() {
      const glow = document.getElementById('cursorGlow');
      if (!glow) return;

      window.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }, { passive: true });
    }

    /* ==========================================================================
       TYPEWRITER ANIMATION
       ========================================================================== */
    initTypewriter() {
      const el = document.getElementById('typingText');
      if (!el) return;

      const phrases = [
        "... Coding, Claude, GPT & Midjourney",
        "... Socratic Deep Dives & Research",
        "... High-Converting SaaS Copy",
        "... Midjourney v6 & Flux Visuals",
        "... Sora & Runway Video Generation",
        "... Autonomous AI Agent Personas"
      ];

      let phraseIdx = 0;
      let charIdx = 0;
      let isDeleting = false;
      let speed = 75;

      const type = () => {
        const cur = phrases[phraseIdx];
        if (isDeleting) {
          el.textContent = cur.substring(0, charIdx - 1);
          charIdx--;
          speed = 35;
        } else {
          el.textContent = cur.substring(0, charIdx + 1);
          charIdx++;
          speed = 70;
        }

        if (!isDeleting && charIdx === cur.length) {
          speed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          speed = 350;
        }

        setTimeout(type, speed);
      };

      type();
    }

    /* ==========================================================================
       EVENT LISTENERS
       ========================================================================== */
    initEventListeners() {
      // Input Textarea Counter
      const textarea = document.getElementById('rawPromptInput');
      const counter = document.getElementById('charCounter');
      textarea?.addEventListener('input', () => {
        if (counter) counter.textContent = `${textarea.value.length} chars`;
      });

      // Clear Input
      document.getElementById('clearInputBtn')?.addEventListener('click', () => {
        if (textarea) {
          textarea.value = '';
          textarea.focus();
          if (counter) counter.textContent = '0 chars';
        }
      });

      // Enhance Button & Keyboard Shortcut
      const enhanceBtn = document.getElementById('enhanceBtn');
      enhanceBtn?.addEventListener('click', () => this.generateEnhancedPrompt());

      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          this.generateEnhancedPrompt();
        }
      });

      // Presets Pills
      document.querySelectorAll('.preset-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const text = pill.getAttribute('data-text');
          if (textarea && text) {
            textarea.value = text;
            if (counter) counter.textContent = `${text.length} chars`;
            this.generateEnhancedPrompt();
          }
        });
      });

      // Domain Select Change
      document.getElementById('domainSelect')?.addEventListener('change', (e) => {
        this.currentDomain = e.target.value;
        this.syncNavFilter(this.currentDomain);
      });

      // Navbar Category Filter Pills
      document.querySelectorAll('.nav-cat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          document.querySelectorAll('.nav-cat-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          const domain = pill.getAttribute('data-domain') || 'all';
          this.filterVaultByDomain(domain);
          if (domain !== 'all') {
            const select = document.getElementById('domainSelect');
            if (select) {
              select.value = domain;
              this.currentDomain = domain;
            }
          }
        });
      });

      // Copy Buttons
      document.getElementById('copyPromptBtn')?.addEventListener('click', () => this.copyToClipboard(this.currentPromptText, 'Master prompt copied!'));
      document.getElementById('copySystemBtn')?.addEventListener('click', () => {
        const sys = `[SYSTEM_PROMPT]\n${this.currentPromptText}\n[/SYSTEM_PROMPT]`;
        this.copyToClipboard(sys, 'Copied as System Prompt!');
      });
      document.getElementById('exportJsonBtn')?.addEventListener('click', () => {
        const jsonObj = {
          prompt: this.currentPromptText,
          domain: this.currentDomain,
          target_model: this.currentTargetAi,
          variables: Object.keys(this.currentVariables)
        };
        this.copyToClipboard(JSON.stringify(jsonObj, null, 2), 'Copied as JSON Schema!');
      });

      // Modals
      this.initModals();
    }

    /* ==========================================================================
       PROMPT SYNTHESIS CONTROLLER
       ========================================================================== */
    async generateEnhancedPrompt() {
      const textarea = document.getElementById('rawPromptInput');
      const rawText = textarea ? textarea.value.trim() : '';

      const domain = document.getElementById('domainSelect')?.value || 'code';
      const framework = document.getElementById('frameworkSelect')?.value || 'ptcc';
      const tone = document.getElementById('toneSelect')?.value || 'authoritative';
      const targetAi = document.getElementById('targetAiSelect')?.value || 'Claude 3.5 Sonnet';

      this.currentDomain = domain;
      this.currentFramework = framework;
      this.currentTone = tone;
      this.currentTargetAi = targetAi;

      // Try Backend Python API first; Fallback to In-Browser JS Engine if offline / static
      let result = null;
      try {
        const response = await fetch('/api/enhance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: rawText,
            domain: domain,
            framework: framework,
            tone: tone,
            target_ai: targetAi,
            variables: this.currentVariables
          })
        });

        if (response.ok) {
          result = await response.json();
        }
      } catch (e) {
        // Fallback to client synthesis
      }

      if (!result || result.status !== 'success') {
        result = this.clientSideEnhance(rawText, domain, framework, tone, targetAi);
      }

      this.renderResult(result);
    }

    clientSideEnhance(rawText, domain, framework, tone, targetAi) {
      const input = rawText || "Build a high-performance modern web application with clean architecture";
      const persona = DOMAIN_PERSONAS[domain] || DOMAIN_PERSONAS.general;
      const toneLine = TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.authoritative;

      let enhanced = '';

      if (domain === 'image') {
        enhanced = `An ultra-detailed cinematic 8K masterpiece photograph of ${input}.

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
blurry, low resolution, deformed limbs, extra fingers, mutated hands, bad anatomy, cartoon, 3d render, plastic skin, watermark, signature, text, oversaturated, amateur photography, cropped, duplicate`;
      } else if (domain === 'video') {
        enhanced = `Cinematic 4K hyper-detailed dynamic video shot: ${input}.

Camera Choreography & Motion Vectors:
- Begins with a dynamic low-angle tracking shot sweeping smoothly along the subject, transitioning into a sweeping high-angle aerial drone orbit.
- Seamless fluid motion with cinematic camera damping, subtle handheld realism, and intentional depth-of-field focus pulls.

Lighting Dynamics & Atmospheric Pacing:
- Volumetric sunbeams piercing through atmospheric haze, dramatic rim light separating subject from background, and dynamic shadows shifting realistically across surfaces.
- 35mm Panavision anamorphic lens flares with natural optical aberrations and rich cinematic color grade.

Physics, Particle & Surface Interactions:
- Physically accurate fluid dynamics, micro-particles/dust swirling in illumination beams, and lifelike material inertia and surface reflections.
- 60fps high-framerate capture rendered down to 24fps cinema standard with realistic optical motion blur.`;
      } else if (framework === 'create') {
        enhanced = `### [CHARACTER] Role & Domain Authority
Act as a **${persona}**. You possess world-class expertise in strategic execution, clean design patterns, and high-performance delivery.

### [REQUEST] Primary Deliverable & Core Mission
${input}

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
1. \`## 1. Executive Summary & Strategic Architecture Blueprint\`
2. \`## 2. Complete Production Implementation (Fully Documented)\`
3. \`## 3. Edge-Case Matrix & Security / Performance Optimizations\`
4. \`## 4. Verification Suite & Deployment / Testing Checklist\`

### [EXTRAS] Strict Guardrails & Tone Directives
- Eliminate boilerplate pleasantries and filler text.
- ${toneLine}
- Optimized for high-reasoning fidelity in ${targetAi}.`;
      } else if (framework === 'cot') {
        enhanced = `You are operating as a **${persona}**.

### PRIMARY OBJECTIVE:
${input}

### MANDATORY CHAIN-OF-THOUGHT (CoT) REASONING WORKFLOW:
Before delivering the final output, you must explicitly document your reasoning across the following structured stages:

\`\`\`markdown
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
\`\`\`

### FINAL PRODUCTION DELIVERABLE:
Deliver the finalized, production-grade output strictly adhering to:
1. Complete, non-truncated implementation artifacts with zero placeholders.
2. Production-grade error handling, comments, and structure.
3. Verification test suite or operational validation steps.
4. ${toneLine}`;
      } else if (framework === 'rtf') {
        enhanced = `### 1. ROLE & IDENTITY
${persona}

### 2. EXHAUSTIVE TASK SPECIFICATION
${input}

### 3. FORMAT & OUTPUT SPECIFICATION:
Your response must strictly follow this structured hierarchy:
- **Executive Blueprint**: 2-3 sentences outlining the strategic rationale.
- **Core Architecture & Schemas**: Definitions of data structures, interfaces, and configurations.
- **Production Implementation**: Complete, robust implementation code/copy with zero placeholder comments.
- **Edge-Case & Validation Matrix**: Formatted comparison table listing:
  | Scenario / Edge Case | Threat / Failure Vector | Defensive Mitigation |
- **Verification Assertions**: Concrete unit tests or verification checklist.
- **Tone Directive**: ${toneLine}`;
      } else {
        // PTCC Default (Deep Multi-Section Synthesis)
        enhanced = `### 1. EXECUTIVE ROLE & COGNITIVE PERSONA
You are operating as a **${persona}**.
Your cognitive mode is set to maximum rigor, systems-level thinking, and uncompromising adherence to industry best practices. You provide production-ready, battle-tested solutions rather than high-level theoretical overviews.

### 2. PRIMARY OBJECTIVE & CORE MISSION
${input}

### 3. CONTEXT & ARCHITECTURAL FOUNDATION
- **Execution Target**: High-stakes production environment optimized for ${targetAi}.
- **Target Audience / Stakeholders**: Senior technical architects, enterprise leads, and product teams requiring zero-defect execution.
- **Architectural Tenets**:
  - Modular, decoupled, and highly maintainable structure.
  - High performance, minimal latency, and defensive memory/resource management.
  - Strict type safety, deterministic logic, and clear separation of concerns.

### 4. GRANULAR EXECUTION DIRECTIVES & STEP-BY-STEP METHODOLOGY
Execute this mission through the following systematic stages:
1. **Pre-Implementation Analysis**: Briefly evaluate the problem space from first principles, outlining core assumptions and key architectural trade-offs.
2. **Production-Grade Implementation**: Deliver the complete, fully articulated solution. Provide exhaustive implementations with zero placeholders (\`// todo\`, \`// add more here\` are strictly forbidden).
3. **Defensive Hardening & Edge-Case Coverage**: Explicitly identify and mitigate at least 3 edge cases, race conditions, security vulnerabilities, or error states.
4. **Verification & Quality Assurance Suite**: Provide test assertions, validation schemas, or a concrete QA checklist verifying correctness against edge cases.

### 5. EXHAUSTIVE NEGATIVE CONSTRAINTS & ANTI-PATTERNS (GUARDRAILS)
- **Zero-Fluff Rule**: Strictly eliminate conversational preambles, introductory small talk, and generic conclusions. Begin directly with the core solution.
- **Anti-Hallucination Mandate**: Never fabricate non-existent API parameters or deprecated libraries. Ground all recommendations in verified industry standards.
- **No Incomplete Snippets**: All code, configurations, copy, or diagrams must be syntactically valid and completely copy-pasteable.
- **Strict Formatting**: Enforce consistent Markdown hierarchy, syntax-highlighted code blocks, and structured comparison tables where appropriate.

### 6. TONE & DELIVERY SPECIFICATION
${toneLine}`;
      }

      // Render any custom vars
      for (const [k, v] of Object.entries(this.currentVariables)) {
        enhanced = enhanced.split(`{{${k}}}`).join(v);
      }

      const extracted = this.extractVariables(enhanced);
      const strength = this.evaluateStrength(enhanced);

      return {
        status: 'success',
        enhanced_prompt: enhanced,
        domain,
        framework,
        tone,
        target_ai: targetAi,
        strength,
        variables: extracted
      };
    }

    /* ==========================================================================
       PROMPT STRENGTH EVALUATION
       ========================================================================== */
    evaluateStrength(text) {
      let score = 0;
      const breakdown = {};

      const hasRole = /\b(act as|you are|role|persona|expert|specialist|architect|fellow|engineer|tester|director|strategist)\b/i.test(text);
      const roleScore = hasRole ? 20 : 5;
      score += roleScore;
      breakdown.role = roleScore;

      const words = text.trim().split(/\s+/).length;
      let contextScore = 5;
      if (words > 120) contextScore = 20;
      else if (words > 60) contextScore = 15;
      else if (words > 20) contextScore = 10;
      score += contextScore;
      breakdown.context = contextScore;

      const hasConstraints = /\b(constraints?|guardrails?|do not|never|avoid|must|strictly|zero-fluff|rules?|limitations?|strictest)\b/i.test(text);
      const constraintScore = hasConstraints ? 20 : 6;
      score += constraintScore;
      breakdown.constraints = constraintScore;

      const hasFormat = /\b(formats?|markdown|headings?|bullets?|tables?|json|code blocks?|step-by-step|sections?|schema|output)\b/i.test(text);
      const formatScore = hasFormat ? 20 : 6;
      score += formatScore;
      breakdown.format = formatScore;

      const hasReasoning = /\b(reasoning|chain-of-thought|analy(ze|se)|dissect|first principles|trade-offs?|edge cases?|steps?|methodical)\b/i.test(text);
      const reasoningScore = hasReasoning ? 20 : 8;
      score += reasoningScore;
      breakdown.reasoning = reasoningScore;

      let grade = 'C';
      let title = 'Basic Prompt';
      let desc = 'Add explicit persona, context, constraints, and structured output instructions to maximize quality.';

      if (score >= 90) {
        grade = 'Grade A+';
        title = 'Elite Production Ready';
        desc = 'Explicit role persona, rich context, strict negative guardrails, and output structure verified.';
      } else if (score >= 75) {
        grade = 'Grade A';
        title = 'Strong High Quality';
        desc = 'Well-structured with role persona, clear instructions, and formatting directives.';
      } else if (score >= 55) {
        grade = 'Grade B';
        title = 'Moderate Quality';
        desc = 'Consider adding negative constraints and chain-of-thought reasoning steps.';
      }

      return {
        total_score: score,
        grade,
        title,
        desc,
        breakdown
      };
    }

    extractVariables(text) {
      const matches = text.match(/\{\{([a-zA-Z0-9_]+)\}\}/g) || [];
      const set = new Set();
      matches.forEach(m => set.add(m.replace(/[{}]/g, '')));
      return Array.from(set);
    }

    /* ==========================================================================
       RENDER OUTPUT & DIAGNOSTICS
       ========================================================================== */
    renderResult(result) {
      this.currentPromptText = result.enhanced_prompt;

      // Update Code Block
      const preEl = document.getElementById('enhancedPromptOutput');
      if (preEl) {
        preEl.innerHTML = `<code>${this.escapeHtml(result.enhanced_prompt)}</code>`;
      }

      // Word Counter & Tag
      const wordCount = result.enhanced_prompt.trim().split(/\s+/).length;
      const wordCountEl = document.getElementById('outputWordCount');
      if (wordCountEl) wordCountEl.textContent = `${wordCount} words`;

      // Strength Scorer UI
      const strength = result.strength;
      const scoreVal = document.getElementById('strengthScoreVal');
      const gradeBadge = document.getElementById('strengthGradeBadge');
      const strengthTitle = document.getElementById('strengthTitle');
      const strengthDesc = document.getElementById('strengthDesc');

      if (scoreVal) scoreVal.textContent = strength.total_score;
      if (gradeBadge) gradeBadge.textContent = strength.grade;
      if (strengthTitle) strengthTitle.textContent = strength.title;
      if (strengthDesc) strengthDesc.textContent = strength.desc;

      // Metric Bars
      const bd = strength.breakdown;
      const setBar = (fillId, scoreId, val) => {
        const fill = document.getElementById(fillId);
        const text = document.getElementById(scoreId);
        if (fill) fill.style.width = `${(val / 20) * 100}%`;
        if (text) text.textContent = `${val}/20`;
      };

      setBar('fillRole', 'scoreRole', bd.role_clarity?.score || bd.role || 20);
      setBar('fillContext', 'scoreContext', bd.context_depth?.score || bd.context || 20);
      setBar('fillConstraints', 'scoreConstraints', bd.constraints_guardrails?.score || bd.constraints || 20);
      setBar('fillFormat', 'scoreFormat', bd.output_formatting?.score || bd.format || 20);

      // Render Variables
      this.renderVariables(result.variables || []);
    }

    renderVariables(varsList) {
      const container = document.getElementById('variablesList');
      if (!container) return;

      if (varsList.length === 0) {
        container.innerHTML = `<span style="font-size: 0.75rem; color: var(--text-muted);">No customizable {{tags}} detected in this output.</span>`;
        return;
      }

      container.innerHTML = varsList.map(v => `
        <button type="button" class="var-tag-btn" data-var="${v}">
          <span>{{${v}}}</span>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      `).join('');

      container.querySelectorAll('.var-tag-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const varKey = btn.getAttribute('data-var');
          this.openVarModal(varKey);
        });
      });
    }

    /* ==========================================================================
       MASTER BLUEPRINTS VAULT
       ========================================================================== */
    renderVaultCards(filterDomain = 'all') {
      const grid = document.getElementById('vaultGrid');
      if (!grid) return;

      const filtered = this.vaultTemplates.filter(t => {
        return filterDomain === 'all' || t.domain === filterDomain;
      });

      grid.innerHTML = filtered.map(t => `
        <article class="vault-card" data-id="${t.id}">
          <div>
            <div class="vault-card-header">
              <div class="vault-icon-box">
                <img src="assets/${t.domain}.svg" width="20" height="20" alt="${t.domain}">
              </div>
              <span class="vault-badge">${t.badge}</span>
            </div>
            <h3 class="vault-title">${t.title}</h3>
            <p class="vault-desc">${t.description}</p>
          </div>

          <div class="vault-card-footer">
            <span class="vault-vars-count">${Object.keys(t.variables || {}).length} Variables</span>
            <span class="vault-load-btn">
              <span>Load Blueprint</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </article>
      `).join('');

      grid.querySelectorAll('.vault-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-id');
          const template = this.vaultTemplates.find(t => t.id === id);
          if (template) {
            this.loadTemplateIntoStudio(template);
          }
        });
      });
    }

    loadTemplateIntoStudio(tpl) {
      // Set domain
      const domSelect = document.getElementById('domainSelect');
      if (domSelect) domSelect.value = tpl.domain;
      this.currentDomain = tpl.domain;

      // Set input
      const textarea = document.getElementById('rawPromptInput');
      if (textarea) textarea.value = tpl.template;

      // Set variables
      this.currentVariables = Object.assign({}, tpl.variables || {});

      // Scroll to studio
      document.querySelector('.studio-workspace')?.scrollIntoView({ behavior: 'smooth' });

      // Generate
      this.generateEnhancedPrompt();
      this.showToast(`Loaded "${tpl.title}" blueprint!`, 'success');
    }

    filterVaultByDomain(domain) {
      this.renderVaultCards(domain);
    }

    syncNavFilter(domain) {
      document.querySelectorAll('.nav-cat-pill').forEach(pill => {
        if (pill.getAttribute('data-domain') === domain) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });
      this.filterVaultByDomain(domain);
    }

    triggerInitialEnhance() {
      const textarea = document.getElementById('rawPromptInput');
      if (textarea && !textarea.value) {
        textarea.value = "Build a high-performance React Next.js authentication service with OAuth and TypeScript";
      }
      this.generateEnhancedPrompt();
    }

    /* ==========================================================================
       MODAL CONTROLLER (COFFEE, CONTACT, VARIABLE EDITOR)
       ========================================================================== */
    initModals() {
      const coffeeModal = document.getElementById('coffeeModal');
      const contactModal = document.getElementById('contactModal');
      const varModal = document.getElementById('varModal');

      const coffeeBtn = document.getElementById('coffeeBtn');
      const contactBtn = document.getElementById('contactNavBtn');

      const closeCoffee = document.getElementById('closeCoffeeModal');
      const closeContact = document.getElementById('closeContactModal');
      const closeVar = document.getElementById('closeVarModal');
      const cancelVar = document.getElementById('cancelVarBtn');
      const saveVar = document.getElementById('saveVarBtn');

      const copyUpiBtn = document.getElementById('copyUpiBtn');
      const copyContactEmail = document.getElementById('copyContactEmailBtn');

      coffeeBtn?.addEventListener('click', () => coffeeModal?.classList.add('active'));
      contactBtn?.addEventListener('click', () => contactModal?.classList.add('active'));

      closeCoffee?.addEventListener('click', () => coffeeModal?.classList.remove('active'));
      closeContact?.addEventListener('click', () => contactModal?.classList.remove('active'));
      closeVar?.addEventListener('click', () => varModal?.classList.remove('active'));
      cancelVar?.addEventListener('click', () => varModal?.classList.remove('active'));

      [coffeeModal, contactModal, varModal].forEach(m => {
        m?.addEventListener('click', (e) => {
          if (e.target === m) m.classList.remove('active');
        });
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          coffeeModal?.classList.remove('active');
          contactModal?.classList.remove('active');
          varModal?.classList.remove('active');
        }
      });

      copyUpiBtn?.addEventListener('click', () => {
        this.copyToClipboard('traderabhinav699-2@oksbi', 'Payment UPI ID copied!');
      });

      copyContactEmail?.addEventListener('click', () => {
        this.copyToClipboard('traderabhinav699@gmail.com', 'Developer email copied!');
      });

      saveVar?.addEventListener('click', () => {
        const input = document.getElementById('varModalInput');
        if (this.selectedVarKey && input) {
          const newVal = input.value;
          this.currentVariables[this.selectedVarKey] = newVal;
          varModal?.classList.remove('active');
          this.generateEnhancedPrompt();
          this.showToast(`Updated {{${this.selectedVarKey}}}!`, 'success');
        }
      });
    }

    openVarModal(key) {
      this.selectedVarKey = key;
      const modal = document.getElementById('varModal');
      const keyLabel = document.getElementById('varModalKey');
      const input = document.getElementById('varModalInput');

      if (keyLabel) keyLabel.textContent = `{{${key}}}`;
      if (input) {
        input.value = this.currentVariables[key] || '';
        input.placeholder = `Enter replacement for {{${key}}}...`;
      }
      modal?.classList.add('active');
      input?.focus();
    }

    /* ==========================================================================
       HELPERS & UTILS
       ========================================================================== */
    copyToClipboard(text, msg = 'Copied to clipboard!') {
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(msg, 'success');
      }).catch(() => {
        this.showToast('Copied text!', 'info');
      });
    }

    showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.textContent = message;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 2400);
    }

    escapeHtml(str) {
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return (str || '').replace(/[&<>"']/g, m => map[m]);
    }
  }

  // Initialize App on DOM Ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const app = new PromptApp();
        app.init();
      });
    } else {
      const app = new PromptApp();
      app.init();
    }
  }
})();
