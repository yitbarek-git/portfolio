import { AILesson } from '../types';

export const mockAILessons: AILesson[] = [
  {
    id: 'ai-lesson-1',
    slug: 'ai-engineering-fundamentals-overview',
    title: 'AI Engineering & LLM Architecture Foundations',
    description: 'A deep-dive curriculum on LLM tokenization, context window management, structured JSON schema outputs, and deterministic prompt pipeline design.',
    category: 'AI Architecture',
    subcategory: 'Foundation Systems',
    difficulty: 'Beginner',
    duration: '45 mins',
    tags: ['AI Engineering', 'LLM', 'System Architecture', 'TypeScript', 'Gemini 3.7'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
      alt: 'Neural network architecture and tokenization pipeline visualization',
      isTemporary: false
    },
    author: {
      name: 'Yitbarek K.',
      role: 'Global Software Engineer & AI Educator'
    },
    placeholderNotice: 'Production Architecture Spec & Typed TypeScript 5.8 Implementation',
    content: `### 1. The Modern AI Engineering Paradigm

AI engineering bridges foundation models with production software engineering. Rather than treating Large Language Models (LLMs) as opaque black boxes, modern full-stack systems treat them as probabilistic reasoning engines that require rigorous input validation, structured output schemas, and deterministic pipeline guards.

### 2. Core Execution Parameters & Context Windows

When integrating models like Gemini 3.7 or GPT-4o into application backends:
- **Temperature (0.0 – 1.0):** Lower values (0.0 to 0.2) ensure deterministic, repeatable reasoning for classification, extraction, and code generation. Higher values (0.7+) encourage creative exploration.
- **Top-P & Top-K Sampling:** Constrains token probability distributions to reduce hallucination risk in production endpoints.
- **Context Window Utilization:** Large context windows (1M+ tokens) allow ingestion of extensive repositories and codebases, but latency and needle-in-a-haystack attention degradation require strategic context pruning.

### 3. Structured Outputs with Type Safety

Never rely on unstructured text parsing. Enforce strict JSON schemas using schema declarations:

\`\`\`typescript
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function extractProjectMetrics(projectDescription: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: projectDescription,
    config: {
      systemInstruction: 'You are a software architecture evaluator. Extract technical attributes strictly adhering to the JSON schema.',
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          complexityScore: { type: Type.INTEGER },
          identifiedTechnologies: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          architecturePattern: { type: Type.STRING },
          scalabilityRisks: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['complexityScore', 'identifiedTechnologies', 'architecturePattern'],
      },
    },
  });

  return JSON.parse(response.text || '{}');
}
\`\`\`

### 4. Key Takeaways
- Always enforce schemas for programmatic downstream consumption.
- Keep system instructions concise, goal-oriented, and role-bounded.
- Implement automated regression testing for prompts to detect model drift.`,
    resources: [
      {
        title: 'Google Gen AI SDK Official Documentation',
        url: 'https://ai.google.dev/gemini-api/docs',
        type: 'documentation'
      },
      {
        title: 'Anthropic Prompt Engineering Interactive Guide',
        url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
        type: 'documentation'
      }
    ],
    status: 'Published',
    publishedAt: '2026-02-15',
    updatedAt: '2026-02-15',
    isPlaceholder: false
  },
  {
    id: 'ai-lesson-2',
    slug: 'retrieval-augmented-generation-pipeline-design',
    title: 'Retrieval-Augmented Generation (RAG) System Design',
    description: 'Architecting high-accuracy RAG systems with document chunking strategies, vector embeddings, cosine similarity search, and grounding validation.',
    category: 'Applied AI',
    subcategory: 'Knowledge Retrieval',
    difficulty: 'Intermediate',
    duration: '60 mins',
    tags: ['RAG', 'Vector Search', 'Embeddings', 'PostgreSQL', 'pgvector'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      alt: 'High-dimensional vector embeddings and geometric clustering visualization',
      isTemporary: false
    },
    author: {
      name: 'Yitbarek K.',
      role: 'Global Software Engineer & AI Educator'
    },
    placeholderNotice: 'Production Vector DB Pipeline & Grounding Guardrails',
    content: `### 1. Why Pure LLMs Fail on Proprietary Data

Foundation models have fixed knowledge cutoffs and lack access to private organizational databases. Retrieval-Augmented Generation (RAG) solves this by retrieving relevant context snippets from an external vector store and injecting them into the model's prompt before generation.

### 2. The 4-Stage RAG Pipeline

1. **Document Ingestion & Chunking:** Breaking long documentation and source files into semantic chunks (300–600 tokens) with 10–20% sliding window overlap to maintain contextual continuity.
2. **Embedding Generation:** Transforming text chunks into high-dimensional dense vectors (e.g. 768 or 1536 dimensions) using dedicated embedding models.
3. **Vector Similarity Querying:** Storing embeddings in vector databases (such as PostgreSQL with \`pgvector\`) and executing cosine similarity lookups against user queries.
4. **Context Synthesis & Grounding:** Injecting retrieved chunks into the prompt context with strict instructions to answer only based on provided facts.

\`\`\`typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function answerWithGrounding(query: string, retrievedChunks: string[]) {
  const context = retrievedChunks.map((c, i) => \`[Source \${i + 1}]: \${c}\`).join('\\n\\n');

  const prompt = \`Context Information:
\${context}

User Query: \${query}

Instructions: Answer the user query using only the provided context. If the context does not contain the answer, state that information is unavailable.\`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0.1,
    }
  });

  return response.text;
}
\`\`\`

### 3. Mitigating Common RAG Failure Modes
- **Chunk Boundary Truncation:** Use Markdown-aware chunking headers rather than arbitrary character splits.
- **Irrelevant Context Injection:** Use a reciprocal-rank fusion or cross-encoder re-ranking step before passing top-K results to the model.
- **Hallucinated Citations:** Require the model to cite the exact source index bracket for every assertion.`,
    resources: [
      {
        title: 'PostgreSQL pgvector Extension Manual',
        url: 'https://github.com/pgvector/pgvector',
        type: 'documentation'
      },
      {
        title: 'Pinecone Vector Search Architecture Whitepaper',
        url: 'https://www.pinecone.io/learn/vector-database/',
        type: 'article'
      }
    ],
    status: 'Published',
    publishedAt: '2026-02-01',
    updatedAt: '2026-02-01',
    isPlaceholder: false
  },
  {
    id: 'ai-lesson-3',
    slug: 'tool-calling-and-agentic-execution-loops',
    title: 'Tool Calling & Deterministic Agentic Execution Loops',
    description: 'Building multi-step autonomous workflows with function declarations, schema binding, and state-machine loop guards.',
    category: 'Agentic Workflows',
    subcategory: 'Autonomous Execution',
    difficulty: 'Advanced',
    duration: '75 mins',
    tags: ['Function Calling', 'Agents', 'TypeScript', 'System Architecture'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      alt: 'Autonomous agent decision tree and execution loop diagram',
      isTemporary: false
    },
    author: {
      name: 'Yitbarek K.',
      role: 'Global Software Engineer & AI Educator'
    },
    placeholderNotice: 'Autonomous Multi-Turn Agent Loop with Cycle Breakout Guards',
    content: `### 1. Function Calling Mechanics

Function calling allows language models to interface with real-world software systems by producing structured JSON function call arguments instead of conversational text. The hosting server executes the designated function and passes the result back to the model.

### 2. State-Machine Loop Pattern

When implementing autonomous tools:
1. Define clear function declarations with comprehensive parameter descriptions.
2. Maintain a loop iteration cap (e.g. maximum 5 turns) to prevent infinite loops.
3. Validate all arguments before running critical database mutations.

\`\`\`typescript
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const queryDatabaseTool = {
  name: 'querySystemMetrics',
  description: 'Fetches real-time server health and database queue depth.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      metricType: {
        type: Type.STRING,
        description: 'The target metric category (e.g., "queue_depth", "cpu_load", "error_rate")'
      }
    },
    required: ['metricType']
  }
};
\`\`\`

### 3. Production Best Practices
- **Idempotency:** Tool actions that mutate database records must include idempotency keys.
- **Fail-Safe Recovery:** Return structured error objects when a tool fails rather than throwing unhandled exceptions so the LLM can self-correct.`,
    resources: [
      {
        title: 'Gemini Function Calling Developer Guide',
        url: 'https://ai.google.dev/gemini-api/docs/function-calling',
        type: 'documentation'
      }
    ],
    status: 'Published',
    publishedAt: '2026-02-20',
    updatedAt: '2026-02-20',
    isPlaceholder: false
  },
  {
    id: 'ai-lesson-4',
    slug: 'multimodal-vision-and-audio-pipelines',
    title: 'Multimodal Vision & Real-Time Audio Processing',
    description: 'Processing blueprints, schematics, and audio streams in real time with Gemini Flash and Web Audio APIs.',
    category: 'Multimodal AI',
    subcategory: 'Vision & Sound',
    difficulty: 'Intermediate',
    duration: '50 mins',
    tags: ['Multimodal', 'Vision AI', 'Audio Pipelines', 'Gemini Flash'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80',
      alt: 'Multimodal vision and signal processing waveform graphics',
      isTemporary: false
    },
    author: {
      name: 'Yitbarek K.',
      role: 'Global Software Engineer & AI Educator'
    },
    placeholderNotice: 'Real-Time Buffer Streaming & Image Spatial Reasoning',
    content: `### 1. Multimodal Architecture Principles

Multimodal foundation models process heterogeneous input modalities (text, high-resolution imagery, video sequences, and audio waveforms) within a single unified latent space.

### 2. High-Performance Image Ingestion

When passing visual artifacts into Gemini:
- Resize images to optimal dimensions (e.g. max 1568px on the longest edge) to optimize latency while preserving optical OCR legibility.
- Pass base64 data buffers or Cloud Storage URLs directly with proper MIME type declarations.

\`\`\`typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function auditArchitecturalDiagram(base64Image: string, mimeType: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          { inlineData: { data: base64Image, mimeType } },
          { text: 'Analyze this software architecture diagram for single points of failure, unauthenticated endpoints, and unnormalized relational tables.' }
        ]
      }
    ]
  });

  return response.text;
}
\`\`\`

### 3. Key Takeaways
- Multimodal spatial analysis eliminates manual OCR step dependencies.
- Ensure strict MIME type validation on all incoming uploads.`,
    resources: [
      {
        title: 'Gemini Vision & Multimodal API Handbook',
        url: 'https://ai.google.dev/gemini-api/docs/multimodal',
        type: 'documentation'
      }
    ],
    status: 'Published',
    publishedAt: '2026-02-22',
    updatedAt: '2026-02-22',
    isPlaceholder: false
  },
  {
    id: 'ai-lesson-5',
    slug: 'evals-guardrails-and-production-llmops',
    title: 'Evals, Guardrails & Production LLMOps Pipelines',
    description: 'Implementing automated unit tests for prompts, semantic drift detection, rate limiting, and cost telemetry in enterprise applications.',
    category: 'LLMOps & Reliability',
    subcategory: 'Production Operations',
    difficulty: 'Advanced',
    duration: '65 mins',
    tags: ['LLMOps', 'Evals', 'Guardrails', 'Reliability', 'Observability'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      alt: 'Telemetry dashboard displaying model latency, drift, and token consumption',
      isTemporary: false
    },
    author: {
      name: 'Yitbarek K.',
      role: 'Global Software Engineer & AI Educator'
    },
    placeholderNotice: 'Automated CI/CD Evaluation Suites & Prompt Regression Checks',
    content: `### 1. The Necessity of Automated Evals

Software engineering requires deterministic regression tests; AI engineering requires synthetic evals. Without continuous automated evaluation, model updates or prompt tweaks introduce subtle semantic drift and behavioral regressions.

### 2. 3-Layer Guardrail Architecture

1. **Input Guardrails:** Regex injection sanitization, token budget capping, and intent classification.
2. **Execution Telemetry:** Logging latency (TTFT — Time To First Token), token counts (input/output/cached), and finish reasons.
3. **Output Guardrails:** Schema validation, hallucination detection via self-consistency verification, and PII masking.

\`\`\`typescript
export interface LLMEvalMetric {
  promptVersion: string;
  testCaseId: string;
  passRate: boolean;
  latencyMs: number;
  tokenCost: number;
}

export function evaluateResponseSchema(rawOutput: string, schemaValidator: (data: any) => boolean): boolean {
  try {
    const parsed = JSON.parse(rawOutput);
    return schemaValidator(parsed);
  } catch {
    return false;
  }
}
\`\`\`

### 3. Production Monitoring Recommendations
- Track cost per user session with real-time alerting.
- Cache high-frequency deterministic prompts to reduce latency by up to 80%.`,
    resources: [
      {
        title: 'OpenAI Evals Framework Repository',
        url: 'https://github.com/openai/evals',
        type: 'repository'
      }
    ],
    status: 'Published',
    publishedAt: '2026-02-25',
    updatedAt: '2026-02-25',
    isPlaceholder: false
  }
];
