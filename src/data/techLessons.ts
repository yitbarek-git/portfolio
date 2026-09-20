import { TechLesson } from '../types';

export const mockTechLessons: TechLesson[] = [
  // ==========================================
  // 1. AI & LLM ENGINEERING
  // ==========================================
  {
    id: 'lesson-ai-1',
    slug: 'prompt-engineering-and-llm-tokenization-foundations',
    title: 'Prompt Engineering, Tokenization & Context Window Management',
    description: 'Master the fundamental mechanics of Large Language Models: BPE tokenization, temperature controls, context window boundaries, and deterministic system instructions.',
    category: 'AI & LLM Engineering',
    subcategory: 'Foundation Models',
    difficulty: 'Beginner',
    duration: '45 mins',
    tags: ['AI', 'LLM', 'Tokenization', 'Prompt Engineering', 'Gemini'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
      alt: 'Neural network architecture and tokenization pipeline visualization',
      isTemporary: false
    },
    objectives: [
      'Understand how Byte-Pair Encoding (BPE) turns raw characters into token vectors',
      'Tune Temperature (0.0–1.0) and Top-P to balance precision against creativity',
      'Design role-bounded system prompts that resist prompt injection',
      'Calculate context token consumption and cost optimization strategies'
    ],
    content: `### 1. The Tokenization Engine

LLMs do not process words or characters directly; they consume numerical integers called **tokens**. 

In models like Gemini 3.7 or GPT-4o, 1 token is roughly equivalent to 4 characters or 0.75 English words. When building production AI applications, understanding tokenization allows you to prevent unexpected context overflows and optimize token billing.

### 2. Controlling Model Sampling

- **Temperature (0.0 - 0.2):** For deterministic tasks (code generation, JSON extraction, math calculations).
- **Temperature (0.7 - 1.0):** For creative writing, brainstorming, and conversational variety.
- **Top-P (Nucleus Sampling):** Dynamically cuts off the cumulative probability tail of potential next tokens.

### 3. Role-Bounded System Instructions
Always define strict boundary rules in the system prompt:
\`\`\`typescript
const systemPrompt = \`You are an expert SQL Query Analyzer.
Rules:
1. ONLY output valid SQL DDL or DML statements.
2. Never execute destructive DROP or TRUNCATE commands.
3. Include brief inline comments explaining index selections.\`;
\`\`\``,
    codeExamples: [
      {
        title: 'Basic LLM Client Invocation with Types',
        language: 'typescript',
        code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzePrompt(input: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: input,
    config: {
      temperature: 0.1,
      systemInstruction: 'You are a code reviewer. Output concise bullet points with suggested fixes.'
    }
  });

  console.log(response.text);
}`,
        explanation: 'Low-temperature execution pattern guaranteeing deterministic review output.'
      }
    ],
    resources: [
      { title: 'Google Gen AI SDK Quickstart', url: 'https://ai.google.dev/gemini-api/docs', type: 'documentation' },
      { title: 'Tiktokenizer Visualizer Tool', url: 'https://tiktokenizer.vercel.app/', type: 'tool' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-01-15',
    updatedAt: '2026-02-10'
  },
  {
    id: 'lesson-ai-2',
    slug: 'retrieval-augmented-generation-rag-pgvector',
    title: 'Building Production RAG Systems with PostgreSQL & pgvector',
    description: 'Learn how to ingest private documents, compute semantic text embeddings, store high-dimensional vectors, and perform cosine similarity search.',
    category: 'AI & LLM Engineering',
    subcategory: 'Vector Search & Embeddings',
    difficulty: 'Intermediate',
    duration: '1 hr 15 mins',
    tags: ['RAG', 'Vector Search', 'PostgreSQL', 'pgvector', 'TypeScript'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      alt: 'High-dimensional vector embeddings and geometric clustering visualization',
      isTemporary: false
    },
    objectives: [
      'Implement markdown-aware document chunking with 15% sliding window overlap',
      'Generate dense vector embeddings using modern embedding models',
      'Configure PostgreSQL with the pgvector extension and IVFFlat / HNSW indexes',
      'Synthesize grounded responses with source citations to eliminate hallucinations'
    ],
    content: `### Why Retrieval-Augmented Generation (RAG)?
Foundation models have static knowledge cutoff dates and zero awareness of private company documentation. RAG bridges this by querying relevant context chunks at runtime.

### The 4-Step Pipeline:
1. **Chunking:** Chunk text into 300-500 token segments.
2. **Embedding:** Convert text segments into 768-dimensional float arrays.
3. **Similarity Search:** Query \`SELECT * FROM chunks ORDER BY embedding <=> query_vector LIMIT 5;\`.
4. **Prompt Augmentation:** Inject the top 5 chunks into the LLM system prompt context.`,
    codeExamples: [
      {
        title: 'Cosine Similarity Query with pgvector',
        language: 'sql',
        code: `-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Table schema for document embeddings
CREATE TABLE document_embeddings (
  id BIGSERIAL PRIMARY KEY,
  document_title VARCHAR(255) NOT NULL,
  chunk_content TEXT NOT NULL,
  embedding vector(768) NOT NULL
);

-- Cosine similarity index for lightning fast lookups
CREATE INDEX ON document_embeddings USING hnsw (embedding vector_cosine_ops);

-- Query the 3 most semantically similar chunks
SELECT document_title, chunk_content, 1 - (embedding <=> $1) AS similarity
FROM document_embeddings
ORDER BY embedding <=> $1
LIMIT 3;`,
        explanation: 'HNSW-indexed vector table enabling sub-10ms semantic similarity queries across millions of text chunks.'
      }
    ],
    resources: [
      { title: 'pgvector Official Repository', url: 'https://github.com/pgvector/pgvector', type: 'repository' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-02-01',
    updatedAt: '2026-02-12'
  },
  {
    id: 'lesson-ai-3',
    slug: 'autonomous-agents-and-function-calling-loops',
    title: 'Autonomous Multi-Step Agents with Schema-Validated Tool Calling',
    description: 'Architect self-correcting agentic execution loops that query databases, invoke APIs, and handle failure states with deterministic state machines.',
    category: 'AI & LLM Engineering',
    subcategory: 'Agentic Systems',
    difficulty: 'Advanced',
    duration: '1 hr 45 mins',
    tags: ['Agents', 'Function Calling', 'TypeScript', 'State Machines', 'System Architecture'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      alt: 'Autonomous agent decision tree and execution loop diagram',
      isTemporary: false
    },
    objectives: [
      'Declare JSON schema tool signatures for arbitrary backend operations',
      'Build a capped iterative execution loop with maximum recursion protection',
      'Validate tool arguments with Zod before running database transactions',
      'Inject tool call execution results back into the conversation context'
    ],
    content: `### Agentic Loops vs Simple Prompting
An autonomous agent operates as a state machine:
1. Model evaluates the user prompt and selects a declared tool.
2. Application executes the requested tool (e.g., query database, check inventory).
3. Result is passed back to model to continue reasoning or produce final response.`,
    codeExamples: [
      {
        title: 'Type-Safe Tool Declaration & Loop Handler',
        language: 'typescript',
        code: `import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getStockTool = {
  name: 'checkProductStock',
  description: 'Retrieves live warehouse stock quantity for a given SKU.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      sku: { type: Type.STRING, description: 'Product SKU identifier' }
    },
    required: ['sku']
  }
};

async function executeAgentLoop(query: string) {
  let turns = 0;
  const maxTurns = 5;

  while (turns < maxTurns) {
    turns++;
    // Execute model turn with bound function declarations
    // ...
  }
}`,
        explanation: 'Loop guard pattern preventing infinite recursive LLM invocations.'
      }
    ],
    resources: [
      { title: 'Gemini Function Calling Guide', url: 'https://ai.google.dev/gemini-api/docs/function-calling', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-02-20',
    updatedAt: '2026-02-20'
  },

  // ==========================================
  // 2. WEB DEVELOPMENT (FULL-STACK)
  // ==========================================
  {
    id: 'lesson-web-1',
    slug: 'modern-react-state-and-component-architecture',
    title: 'Modern React Component Architecture & Custom Hooks',
    description: 'Learn modern React patterns: clean separation of concerns, container vs presentational design, memoization, and building custom reusable hooks.',
    category: 'Web Development',
    subcategory: 'Frontend Architecture',
    difficulty: 'Beginner',
    duration: '50 mins',
    tags: ['React', 'TypeScript', 'Custom Hooks', 'Frontend'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern React component tree and state visualization',
      isTemporary: false
    },
    objectives: [
      'Structure React projects with scalable feature-based folder organization',
      'Abstract complex asynchronous data fetching into clean custom hooks',
      'Optimize component rendering with memoization primitives (useMemo, useCallback)',
      'Manage global UI state safely without prop drilling'
    ],
    content: `### Scalable React Component Patterns
Building scalable web applications requires decoupling business logic from UI presentation. 

By encapsulating stateful effects inside custom hooks, components remain purely declarative and effortless to unit test.`,
    codeExamples: [
      {
        title: 'Custom Generic Fetch Hook with AbortController',
        language: 'typescript',
        code: `import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState(prev => ({ ...prev, loading: true }));

    fetch(url, { credentials: 'omit', signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
        return res.json();
      })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err });
        }
      });

    return () => controller.abort();
  }, [url]);

  return state;
}`,
        explanation: 'Prevents race conditions and memory leaks via native AbortController teardown.'
      }
    ],
    resources: [
      { title: 'React Official Documentation', url: 'https://react.dev', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-01-20',
    updatedAt: '2026-01-22'
  },
  {
    id: 'lesson-web-2',
    slug: 'mastering-typescript-generics-and-utility-types',
    title: 'Mastering TypeScript Generics, Constraints & Advanced Utility Types',
    description: 'A deep-dive tutorial explaining how to write reusable, type-safe functions, generic interfaces, and conditional mapped types without resorting to `any`.',
    category: 'Web Development',
    subcategory: 'TypeScript',
    difficulty: 'Intermediate',
    duration: '1 hr 10 mins',
    tags: ['TypeScript', 'Generics', 'Type Safety', 'Web Development'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1516116211227-bbc141e6c382?auto=format&fit=crop&w=1200&q=80',
      alt: 'TypeScript code editor interface with generic type annotations',
      isTemporary: false
    },
    objectives: [
      'Understand generic type parameters as placeholders for dynamic data shapes',
      'Apply type constraints using the `extends` keyword to ensure minimum structural guarantees',
      'Construct custom utility types using `keyof`, `typeof`, and conditional `infer` clauses',
      'Refactor loosely-typed JavaScript utilities into strictly compiled TypeScript code'
    ],
    content: `Generics allow developers to build flexible, reusable components that work over a variety of types rather than a single one. This enables users of these components to retain compile-time type safety without duplicating logic across multiple definitions.`,
    codeExamples: [
      {
        title: 'Generic Observable Store Pattern',
        language: 'typescript',
        code: `export class ObservableStore<T> {
  private state: T;
  private listeners: Set<(state: T) => void> = new Set();

  constructor(initialState: T) {
    this.state = initialState;
  }

  public getState(): T {
    return this.state;
  }

  public setState(updater: Partial<T> | ((prev: T) => T)): void {
    if (typeof updater === 'function') {
      this.state = (updater as (prev: T) => T)(this.state);
    } else {
      this.state = { ...this.state, ...updater };
    }
    this.notify();
  }

  public subscribe(listener: (state: T) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(fn => fn(this.state));
  }
}`,
        explanation: 'A type-safe generic observer pattern ensuring full autocomplete on store states.'
      }
    ],
    resources: [
      { title: 'TypeScript Official Handbook on Generics', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-01-25',
    updatedAt: '2026-02-01'
  },
  {
    id: 'lesson-web-3',
    slug: 'building-secure-rest-apis-with-express-and-jwt',
    title: 'Production Express Clean Architecture, JWT & HttpOnly Cookies',
    description: 'Complete guide on implementing 3-tier Controller-Service-Repository architecture with stateless JWT authentication, CSRF defense, and rate limiting.',
    category: 'Web Development',
    subcategory: 'Backend Architecture',
    difficulty: 'Advanced',
    duration: '1 hr 30 mins',
    tags: ['Node.js', 'Express', 'JWT', 'Security', 'Clean Architecture'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Express server authentication middleware implementation',
      isTemporary: false
    },
    objectives: [
      'Separate Express applications into Controllers, Services, and Repositories',
      'Store JWTs in httpOnly, SameSite=Strict cookies to eliminate XSS attack vectors',
      'Implement token rotation and automated refresh handlers',
      'Apply rate-limiting and helmet security headers in production'
    ],
    content: `### 3-Tier Clean Architecture
1. **Controllers:** Parse request parameters, validate headers, and return standard HTTP JSON responses.
2. **Services:** House pure business logic, orchestration, and domain calculations.
3. **Repositories:** Manage direct SQL queries, transactions, and database connections.`,
    codeExamples: [
      {
        title: 'Authentication Middleware Handler',
        language: 'typescript',
        code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const token = req.cookies?.auth_token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Authentication required' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}`,
        explanation: 'Strict middleware checking for valid JWT signatures before proceeding.'
      }
    ],
    resources: [
      { title: 'OWASP REST Security Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2025-11-20',
    updatedAt: '2025-11-22'
  },

  // ==========================================
  // 3. PYTHON & DATA SCIENCE
  // ==========================================
  {
    id: 'lesson-py-1',
    slug: 'python-automation-scripting-and-file-io',
    title: 'Python Scripting for Automation, File I/O & API Integration',
    description: 'Learn practical Python for software developers: parsing CSV/JSON files, interacting with REST endpoints, regex data extraction, and automating repetitive tasks.',
    category: 'Python & Data Science',
    subcategory: 'Scripting & Automation',
    difficulty: 'Beginner',
    duration: '40 mins',
    tags: ['Python', 'Automation', 'JSON', 'File I/O', 'APIs'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      alt: 'Python code script and terminal automation output',
      isTemporary: false
    },
    objectives: [
      'Write robust file processing scripts with context managers (`with open`)',
      'Consume remote APIs using the requests and httpx libraries',
      'Parse unstructured logs with regular expressions',
      'Automate local filesystem directory reorganization and batch renaming'
    ],
    content: `### Practical Python for Engineers
Python excels at glue code and automated workflow scripts. With standard libraries like \`pathlib\`, \`json\`, and \`urllib\`, you can automate complex data transformations in under 50 lines of code.`,
    codeExamples: [
      {
        title: 'Batch API Fetcher and JSON Aggregator',
        language: 'python',
        code: `import json
import urllib.request
from pathlib import Path

def fetch_and_archive(endpoint_url: str, output_path: str) -> int:
    req = urllib.request.Request(endpoint_url, headers={'User-Agent': 'PythonAuditBot/1.0'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        
    out_file = Path(output_path)
    out_file.parent.mkdir(parents=True, exist_ok=True)
    
    with out_file.open('w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
        
    return len(data) if isinstance(data, list) else 1`,
        explanation: 'Safe file handling with pathlib and automatic directory creation.'
      }
    ],
    resources: [
      { title: 'Python Official Documentation', url: 'https://docs.python.org/3/', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-01-05',
    updatedAt: '2026-01-08'
  },
  {
    id: 'lesson-py-2',
    slug: 'fastapi-async-microservices-with-pydantic',
    title: 'High-Performance Async Microservices with FastAPI & Pydantic',
    description: 'Build production-ready, asynchronous REST APIs with Python 3.12, automated OpenAPI swagger docs, and strict Pydantic v2 data validation schemas.',
    category: 'Python & Data Science',
    subcategory: 'Backend Engineering',
    difficulty: 'Intermediate',
    duration: '1 hr',
    tags: ['Python', 'FastAPI', 'Pydantic', 'AsyncIO', 'Microservices'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
      alt: 'Python code editor and fast API endpoint swagger documentation',
      isTemporary: false
    },
    objectives: [
      'Harness Python async / await concurrency for high-throughput I/O',
      'Enforce input data sanitization using Pydantic BaseModel schemas',
      'Implement dependency injection for database sessions and auth tokens',
      'Generate live interactive OpenAPI / Swagger API documentation automatically'
    ],
    content: `### Why FastAPI?
FastAPI leverages modern Python type hints to deliver performance on par with NodeJS and Go, while generating complete interactive OpenAPI schemas with zero boilerplate.`,
    codeExamples: [
      {
        title: 'FastAPI Router with Pydantic Validation',
        language: 'python',
        code: `from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from typing import List

app = FastAPI(title="Inventory Microservice", version="1.0.0")

class ItemCreate(BaseModel):
    sku: str = Field(..., min_length=3, max_length=32)
    name: str = Field(..., min_length=1)
    unit_price: float = Field(..., gt=0.0)
    stock: int = Field(default=0, ge=0)

@app.post("/items", status_code=status.HTTP_201_CREATED)
async def create_item(payload: ItemCreate):
    # Asynchronous DB insert simulated
    return {"status": "created", "item": payload.model_dump()}`,
        explanation: 'Type-safe request handling with compile-time and runtime data validation.'
      }
    ],
    resources: [
      { title: 'FastAPI Official Documentation', url: 'https://fastapi.tiangolo.com/', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-01-28',
    updatedAt: '2026-02-04'
  },
  {
    id: 'lesson-py-3',
    slug: 'pandas-numpy-data-pipelines-and-vectorization',
    title: 'Vectorized Data Processing & ETL Pipelines with Pandas & NumPy',
    description: 'Optimize data transformation pipelines by eliminating Python for-loops using vectorized operations, memory profiling, and parquet serialization.',
    category: 'Python & Data Science',
    subcategory: 'Data Engineering',
    difficulty: 'Advanced',
    duration: '1 hr 30 mins',
    tags: ['Python', 'Pandas', 'NumPy', 'ETL', 'Data Science'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      alt: 'Data science visual dashboards and analytical charts',
      isTemporary: false
    },
    objectives: [
      'Replace iterative row loops with C-optimized NumPy vector operations',
      'Optimize DataFrame memory consumption with categorical dtypes and downcasting',
      'Perform multi-table group-bys, joins, and window aggregations efficiently',
      'Export high-throughput analytical datasets into compressed Apache Parquet formats'
    ],
    content: `### Vectorization vs Iteration
Iterating over DataFrame rows with \`.iterrows()\` is 100x to 1000x slower than vectorized columnar operations. Vectorization operates directly on continuous memory blocks in C.`,
    codeExamples: [
      {
        title: 'Vectorized ETL Metric Aggregator',
        language: 'python',
        code: `import numpy as np
import pandas as pd

def process_transaction_stream(df: pd.DataFrame) -> pd.DataFrame:
    # 1. Downcast numeric columns to reduce memory by 60%
    df['user_id'] = pd.to_numeric(df['user_id'], downcast='unsigned')
    df['amount_cents'] = pd.to_numeric(df['amount_cents'], downcast='unsigned')
    
    # 2. Vectorized conditional category assignment
    conditions = [
        df['amount_cents'] > 50000,
        df['amount_cents'] > 10000,
    ]
    choices = ['ENTERPRISE', 'STANDARD']
    df['tier'] = np.select(conditions, choices, default='STARTER')
    
    # 3. Fast Groupby Aggregation
    summary = df.groupby(['tier', 'status'], as_index=False).agg(
        total_volume=('amount_cents', 'sum'),
        avg_ticket=('amount_cents', 'mean'),
        transaction_count=('id', 'count')
    )
    return summary`,
        explanation: 'Memory-optimized vectorized pipeline running in sub-second time on millions of rows.'
      }
    ],
    resources: [
      { title: 'Pandas Vectorization Guide', url: 'https://pandas.pydata.org/docs/user_guide/enhancingperf.html', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-02-14',
    updatedAt: '2026-02-14'
  },

  // ==========================================
  // 4. C++ & SYSTEMS / ALGORITHMS
  // ==========================================
  {
    id: 'lesson-cpp-1',
    slug: 'cpp-fundamentals-pointers-and-memory-management',
    title: 'C++ Pointers, Stack vs Heap & Manual Memory Management',
    description: 'Demystify low-level memory mechanics: pointer arithmetic, memory addressing, stack frame allocation, heap allocation with new/delete, and memory leak prevention.',
    category: 'C++ & Systems',
    subcategory: 'Core Systems',
    difficulty: 'Beginner',
    duration: '55 mins',
    tags: ['C++', 'Pointers', 'Memory Management', 'Systems', 'Computer Science'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
      alt: 'Low level C++ source code with pointer dereferencing and memory address logs',
      isTemporary: false
    },
    objectives: [
      'Understand hexadecimal memory addresses and variable referencing (&) / dereferencing (*)',
      'Differentiate between automatic Stack allocation and dynamic Heap allocation',
      'Prevent common pitfalls: dangling pointers, double-free bugs, and memory leaks',
      'Trace pointer arithmetic across contiguous array memory blocks'
    ],
    content: `### Memory in C++: Stack vs Heap
- **Stack:** Ultra-fast, managed automatically by CPU stack frames, ideal for local primitives.
- **Heap:** Dynamic runtime memory allocated via \`new\` and released via \`delete\`. Fails to free results in memory leaks.`,
    codeExamples: [
      {
        title: 'Dynamic Array Allocation and Safe Deallocation',
        language: 'cpp',
        code: `#include <iostream>

void demonstrateMemory() {
    int stackVal = 42;
    int* ptr = &stackVal; // Pointer holds address of stackVal
    
    std::cout << "Value: " << *ptr << " at Address: " << ptr << std::endl;
    
    // Dynamic Heap Allocation
    int size = 5;
    int* heapArray = new int[size]{ 10, 20, 30, 40, 50 };
    
    for (int i = 0; i < size; ++i) {
        std::cout << "Element " << i << " at " << (heapArray + i) << ": " << *(heapArray + i) << std::endl;
    }
    
    // Always clean up dynamic memory!
    delete[] heapArray;
    heapArray = nullptr; // Nullify to prevent dangling pointer
}`,
        explanation: 'Clear illustration of pointer arithmetic, dynamic heap cleanup, and nullification.'
      }
    ],
    resources: [
      { title: 'learncpp.com — Pointers and Memory', url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-pointers/', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2025-10-15',
    updatedAt: '2025-10-18'
  },
  {
    id: 'lesson-cpp-2',
    slug: 'cpp-stl-data-structures-and-time-complexity',
    title: 'Standard Template Library (STL): Vectors, Maps & O(log N) Structures',
    description: 'Master C++ STL container internals: std::vector dynamic resizing amortization, std::map Red-Black Trees vs std::unordered_map Hash Tables, and iterator mechanics.',
    category: 'C++ & Systems',
    subcategory: 'Data Structures',
    difficulty: 'Intermediate',
    duration: '1 hr 15 mins',
    tags: ['C++', 'STL', 'Data Structures', 'Algorithms', 'Big-O'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
      alt: 'Mathematical algorithmic complexity charts and binary search trees',
      isTemporary: false
    },
    objectives: [
      'Compare algorithmic trade-offs: O(1) average lookup vs O(log N) ordered trees',
      'Understand std::vector exponential capacity reallocation and amortized O(1) push_back',
      'Leverage STL algorithms (std::sort, std::binary_search, std::transform)',
      'Choose optimal container types for memory-constrained embedded systems'
    ],
    content: `### STL Containers Comparison
- **std::vector:** Contiguous memory, O(1) random access, cache-friendly.
- **std::map:** Self-balancing Red-Black Tree, keys sorted, O(log N) lookup/insert.
- **std::unordered_map:** Hash table, O(1) average lookup, unsorted keys.`,
    codeExamples: [
      {
        title: 'High-Performance Word Frequency Counter',
        language: 'cpp',
        code: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>

struct WordCount {
    std::string word;
    int count;
};

std::vector<WordCount> getTopFrequencies(const std::vector<std::string>& tokens) {
    std::unordered_map<std::string, int> freqMap;
    for (const auto& token : tokens) {
        freqMap[token]++;
    }
    
    std::vector<WordCount> results;
    results.reserve(freqMap.size()); // Pre-allocate memory
    
    for (const auto& [word, count] : freqMap) {
        results.push_back({word, count});
    }
    
    // Sort descending by count O(N log N)
    std::sort(results.begin(), results.end(), [](const WordCount& a, const WordCount& b) {
        return a.count > b.count;
    });
    
    return results;
}`,
        explanation: 'Combines O(1) hash lookups with memory pre-allocation and custom lambda sorting.'
      }
    ],
    resources: [
      { title: 'cppreference.com STL Containers', url: 'https://en.cppreference.com/w/cpp/container', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2025-11-10',
    updatedAt: '2025-11-15'
  },
  {
    id: 'lesson-cpp-3',
    slug: 'cpp-modern-raii-and-smart-pointers',
    title: 'Modern C++20: RAII, Smart Pointers (unique_ptr, shared_ptr) & Move Semantics',
    description: 'Eliminate memory bugs permanently using modern C++ RAII: std::unique_ptr for exclusive ownership, std::shared_ptr for reference counting, and std::move for zero-copy transfers.',
    category: 'C++ & Systems',
    subcategory: 'Modern C++',
    difficulty: 'Advanced',
    duration: '1 hr 40 mins',
    tags: ['C++', 'RAII', 'Smart Pointers', 'Move Semantics', 'Systems'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
      alt: 'Binary code stream and low level processor assembly visualization',
      isTemporary: false
    },
    objectives: [
      'Enforce Resource Acquisition Is Initialization (RAII) lifetime boundaries',
      'Replace raw pointer management with std::unique_ptr and std::make_unique',
      'Analyze shared ownership cycles and break memory leaks with std::weak_ptr',
      'Implement move constructors and rvalue reference (&&) overloads for zero-copy performance'
    ],
    content: `### RAII: The Gold Standard of Systems Programming
RAII ties resource lifetimes (memory, sockets, mutexes) to object lifetimes. When an object leaves scope, its destructor is guaranteed to execute, even in the presence of exceptions.`,
    codeExamples: [
      {
        title: 'Custom RAII Socket Wrapper & Smart Pointer Factory',
        language: 'cpp',
        code: `#include <iostream>
#include <memory>
#include <string>

class DatabaseConnection {
public:
    explicit DatabaseConnection(std::string connStr) : connectionString(std::move(connStr)) {
        std::cout << "[RAII] Connected to: " << connectionString << std::endl;
    }
    
    ~DatabaseConnection() {
        std::cout << "[RAII] Disconnected from: " << connectionString << " (Cleaned up)" << std::endl;
    }
    
    void executeQuery(const std::string& sql) const {
        std::cout << "Executing SQL: " << sql << std::endl;
    }

private:
    std::string connectionString;
};

// Factory producing an exclusively-owned connection
std::unique_ptr<DatabaseConnection> createConnection(const std::string& target) {
    return std::make_unique<DatabaseConnection>(target);
}`,
        explanation: 'Guarantees socket closure immediately upon scope exit with zero manual memory cleanup.'
      }
    ],
    resources: [
      { title: 'C++ Core Guidelines on Smart Pointers', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#rsmart-smart-pointers', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-01-30',
    updatedAt: '2026-02-05'
  },

  // ==========================================
  // 5. DEVOPS & CLOUD ARCHITECTURE
  // ==========================================
  {
    id: 'lesson-devops-1',
    slug: 'docker-fundamentals-and-containerization',
    title: 'Docker Fundamentals, Dockerfile Optimization & Multi-Stage Builds',
    description: 'Understand container isolation, Docker layers, caching mechanics, and how to shrink production node/python container images by over 80% with multi-stage builds.',
    category: 'DevOps & Cloud',
    subcategory: 'Containerization',
    difficulty: 'Beginner',
    duration: '45 mins',
    tags: ['Docker', 'Containers', 'DevOps', 'Cloud', 'Optimization'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80',
      alt: 'Docker containers and cloud deployment architecture diagram',
      isTemporary: false
    },
    objectives: [
      'Distinguish between virtual machines and lightweight Linux cgroup/namespace containers',
      'Optimize layer caching order to accelerate continuous integration build times',
      'Write secure, non-root multi-stage Dockerfiles that eliminate development tooling from production',
      'Manage environment variables and port mapping with docker run and .env files'
    ],
    content: `### Container Isolation vs Virtual Machines
Containers run as native processes on the host OS kernel, isolated via Linux namespaces (process IDs, network, mounts) and cgroups (CPU, memory constraints).`,
    codeExamples: [
      {
        title: 'Optimized Multi-Stage Dockerfile for Node.js',
        language: 'dockerfile',
        code: `# Stage 1: Build & TypeScript compilation
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Minimal Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER appuser
EXPOSE 3000
CMD ["node", "dist/server.cjs"]`,
        explanation: 'Multi-stage Dockerfile dropping build devDependencies, resulting in a lean 120MB production image.'
      }
    ],
    resources: [
      { title: 'Docker Official Documentation', url: 'https://docs.docker.com/', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-01-12',
    updatedAt: '2026-01-14'
  },
  {
    id: 'lesson-devops-2',
    slug: 'github-actions-cicd-pipeline-automation',
    title: 'Automated CI/CD Pipelines with GitHub Actions & Automated Testing',
    description: 'Configure automated pull request validation pipelines: TypeScript compilation, lint checks, unit tests, Docker image building, and automated deployment triggers.',
    category: 'DevOps & Cloud',
    subcategory: 'CI/CD Pipelines',
    difficulty: 'Intermediate',
    duration: '1 hr 10 mins',
    tags: ['GitHub Actions', 'CI/CD', 'Automated Testing', 'DevOps'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      alt: 'CI/CD pipeline status checkmarks and GitHub Actions workflow visualization',
      isTemporary: false
    },
    objectives: [
      'Create GitHub Action workflow YAML triggers on pull requests and branch merges',
      'Cache node_modules and build outputs to cut pipeline duration from 5 mins to 45 secs',
      'Run matrix testing across multiple Node and Python runtime versions',
      'Store secrets securely using GitHub Repository Secrets'
    ],
    content: `### Continuous Integration Principles
Every commit triggers an isolated ephemeral runner that checks code formatting, types, and test suites before allowing PR merges to main.`,
    codeExamples: [
      {
        title: 'Production CI Workflow (.github/workflows/ci.yml)',
        language: 'yaml',
        code: `name: Production CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Typecheck TypeScript
        run: npm run lint

      - name: Execute Test Suite
        run: npm test -- --coverage`,
        explanation: 'Fast, cached pipeline validating code integrity before deployment.'
      }
    ],
    resources: [
      { title: 'GitHub Actions Documentation', url: 'https://docs.github.com/en/actions', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-02-03',
    updatedAt: '2026-02-08'
  },
  {
    id: 'lesson-devops-3',
    slug: 'nginx-reverse-proxy-ssl-and-load-balancing',
    title: 'Nginx Reverse Proxying, SSL Termination & High-Availability Load Balancing',
    description: 'Configure high-performance Nginx reverse proxies: SSL/TLS termination with Certbot, gzip compression, rate limiting, and upstream round-robin load balancing.',
    category: 'DevOps & Cloud',
    subcategory: 'Infrastructure & Networking',
    difficulty: 'Advanced',
    duration: '1 hr 35 mins',
    tags: ['Nginx', 'Reverse Proxy', 'SSL/TLS', 'Load Balancing', 'Security'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Cloud network server racks and high availability routing switches',
      isTemporary: false
    },
    objectives: [
      'Deploy Nginx as a reverse proxy shield in front of backend Express/FastAPI instances',
      'Configure automated Let’s Encrypt SSL certificates with HTTP-01 challenges',
      'Implement client IP rate limiting to mitigate denial of service attacks',
      'Distribute traffic across multiple application servers using weighted round-robin'
    ],
    content: `### Why Put Nginx in Front of Node/Python?
Nginx handles static file caching, SSL handshake computation, and slow client buffering in C, freeing application processes to focus exclusively on executing business logic.`,
    codeExamples: [
      {
        title: 'Nginx High-Performance Config with Upstream Pooling',
        language: 'nginx',
        code: `upstream app_cluster {
    server 127.0.0.1:3001 weight=3;
    server 127.0.0.1:3002 weight=3;
    keepalive 32;
}

server {
    listen 80;
    server_name api.yitbarek.dev;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yitbarek.dev;

    ssl_certificate /etc/letsencrypt/live/api.yitbarek.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yitbarek.dev/privkey.pem;

    location / {
        proxy_pass http://app_cluster;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
        explanation: 'Enables HTTP/2, SSL termination, and keepalive connection pooling to backend microservices.'
      }
    ],
    resources: [
      { title: 'Nginx Official Documentation', url: 'https://nginx.org/en/docs/', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-02-18',
    updatedAt: '2026-02-18'
  },

  // ==========================================
  // 6. DATABASES & SCHEMA NORMALIZATION (3NF)
  // ==========================================
  {
    id: 'lesson-db-1',
    slug: 'relational-database-schema-design-and-normalization',
    title: 'Relational Database Schema Design: 1NF to 3NF & Integrity Rules',
    description: 'Learn step-by-step how to convert messy real-world data requirements into clean, normalized 3NF database tables with foreign keys and check constraints.',
    category: 'Databases',
    subcategory: 'MySQL & PostgreSQL',
    difficulty: 'Beginner',
    duration: '50 mins',
    tags: ['Databases', 'MySQL', 'Normalization', 'SQL', 'Schema Design', '3NF'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Relational database schema ERD diagram and 3NF tables',
      isTemporary: false
    },
    objectives: [
      'Identify update, deletion, and insertion anomalies in unnormalized spreadsheets',
      'Apply First Normal Form (1NF): Atomic columns and primary key identification',
      'Apply Second Normal Form (2NF): Elimination of partial functional dependencies',
      'Apply Third Normal Form (3NF): Elimination of transitive non-key dependencies'
    ],
    content: `### Database Normalization Step-by-Step
Database normalization is a systematic technique of organizing data in a relational database to eliminate Insertion, Update, and Deletion Anomalies.

1. **1NF (Atomic Attributes):** Every cell contains a single value; no repeating comma-separated lists; each row has a unique primary key.
2. **2NF (No Partial Dependencies):** Every non-key column must depend on the *entire* primary key (vital for composite keys).
3. **3NF (No Transitive Dependencies):** Non-key columns must depend *only* on the primary key, never on another non-key column ($X \\rightarrow Y$, where $X$ is a candidate key).`,
    codeExamples: [
      {
        title: 'Normalized E-Commerce Schema (MySQL InnoDB 3NF)',
        language: 'sql',
        code: `CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status ENUM('PENDING', 'PAID', 'SHIPPED', 'CANCELLED') DEFAULT 'PENDING',
  total_cents INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT UNSIGNED NOT NULL CHECK (quantity > 0),
  unit_price_cents INT UNSIGNED NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;`,
        explanation: '3NF schema with foreign key cascading and atomic line item records.'
      }
    ],
    resources: [
      { title: 'Database Systems: The Complete Book', url: 'https://en.wikipedia.org/wiki/Database_normalization', type: 'article' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-01-10',
    updatedAt: '2026-01-12'
  },
  {
    id: 'lesson-db-2',
    slug: 'sql-indexing-b-trees-and-query-optimization',
    title: 'SQL Indexing Deep Dive: B-Trees, Compound Keys & EXPLAIN Query Analysis',
    description: 'Speed up slow relational queries by 100x: understand B-Tree index structures, leftmost prefix rules for compound indexes, and interpreting EXPLAIN execution plans.',
    category: 'Databases',
    subcategory: 'Performance Tuning',
    difficulty: 'Intermediate',
    duration: '1 hr 20 mins',
    tags: ['SQL', 'Indexing', 'B-Tree', 'Query Optimization', 'Performance'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      alt: 'Database query execution plan tree and index scan visualization',
      isTemporary: false
    },
    objectives: [
      'Differentiate between Sequential Full Table Scans vs Index Range Scans',
      'Design compound indexes respecting the Leftmost Prefix Rule',
      'Read and interpret EXPLAIN ANALYZE execution cost trees',
      'Avoid common query anti-patterns that bypass indexes (e.g., wildcards at start of LIKE)'
    ],
    content: `### How B-Tree Indexes Work
A B-Tree index organizes table keys into balanced search trees of logarithmic depth ($O(\\log N)$), turning scans over 10 million rows from seconds into milliseconds.`,
    codeExamples: [
      {
        title: 'Optimizing Composite Lookup with EXPLAIN Plan',
        language: 'sql',
        code: `-- Anti-pattern: Missing compound index leads to Full Table Scan
EXPLAIN ANALYZE
SELECT id, user_id, total_cents 
FROM orders 
WHERE user_id = 42 AND status = 'PAID' 
ORDER BY created_at DESC;

-- Solution: Compound index matching WHERE and ORDER BY
CREATE INDEX idx_orders_user_status_date 
ON orders (user_id, status, created_at DESC);

-- Re-running EXPLAIN ANALYZE now shows an Index Scan with 0.2ms execution time`,
        explanation: 'Demonstrates creating a covering compound index that satisfies both filtering and sorting simultaneously.'
      }
    ],
    resources: [
      { title: 'Use The Index, Luke! SQL Indexing Guide', url: 'https://use-the-index-luke.com/', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-01-22',
    updatedAt: '2026-01-26'
  },
  {
    id: 'lesson-db-3',
    slug: 'acid-transactions-row-locks-and-isolation-levels',
    title: 'ACID Transactions, Row-Level Locks & Distributed Concurrency Control',
    description: 'Prevent double-spending and race conditions in financial/inventory systems: understand Isolation Levels (Read Committed, Repeatable Read, Serializable) and SELECT FOR UPDATE.',
    category: 'Databases',
    subcategory: 'Concurrency & Transactions',
    difficulty: 'Advanced',
    duration: '1 hr 45 mins',
    tags: ['ACID', 'Transactions', 'Row Locks', 'Concurrency', 'PostgreSQL'],
    thumbnail: {
      src: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Database transaction lock graph and ACID consistency diagram',
      isTemporary: false
    },
    objectives: [
      'Master the 4 ACID tenets (Atomicity, Consistency, Isolation, Durability)',
      'Analyze transaction anomalies: Dirty Reads, Non-Repeatable Reads, and Phantom Reads',
      'Implement pessimistic row locking (\`SELECT ... FOR UPDATE\`) for inventory deductions',
      'Handle distributed deadlock detection and automatic retry loops in backend services'
    ],
    content: `### ACID Concurrency in High-Throughput Systems
When two concurrent requests attempt to purchase the last available stock item simultaneously, standard \`SELECT\` then \`UPDATE\` queries will cause a race condition. 

Pessimistic row locking acquires exclusive locks on target records until the transaction commits or rolls back.`,
    codeExamples: [
      {
        title: 'Atomic Inventory Deduction Transaction (PostgreSQL)',
        language: 'sql',
        code: `BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Lock the target product row exclusively
SELECT stock_quantity 
FROM products 
WHERE id = 104 
FOR UPDATE;

-- Validate sufficient stock in application code
-- Deduct inventory atomically
UPDATE products 
SET stock_quantity = stock_quantity - 1 
WHERE id = 104;

-- Insert audit transaction log
INSERT INTO stock_ledger (product_id, change_amount, reason) 
VALUES (104, -1, 'Order #8942 fulfillment');

COMMIT;`,
        explanation: 'Guarantees that no concurrent order can deduct the same inventory row simultaneously.'
      }
    ],
    resources: [
      { title: 'PostgreSQL Concurrency Control Manual', url: 'https://www.postgresql.org/docs/current/mvcc.html', type: 'documentation' }
    ],
    author: { name: 'Yitbarek K.', role: 'Software Engineer & Educator' },
    status: 'Published',
    publishedAt: '2026-02-16',
    updatedAt: '2026-02-16'
  }
];
