export interface DeveloperResource {
  id: string;
  slug: string;
  title: string;
  category: 'Roadmap' | 'PDF Handbook' | 'Cheat Sheet' | 'Starter Kit';
  technology: string;
  description: string;
  tagline: string;
  fileSize?: string;
  pages?: number;
  downloadUrl?: string;
  isPopular?: boolean;
  sections: {
    title: string;
    description: string;
    topics: string[];
    codeSnippet?: string;
  }[];
}

export const developerResources: DeveloperResource[] = [
  {
    id: 'res-python-handbook',
    slug: 'python-engineering-handbook-pdf',
    title: 'Python Engineering & Microservices Handbook',
    category: 'PDF Handbook',
    technology: 'Python 3.12+',
    tagline: 'Production-ready guide covering Asyncio, FastAPI, Type Hinting, Design Patterns & 3NF SQL Integration.',
    description: 'A comprehensive 48-page technical handbook designed for intermediate to advanced software engineers building robust backend microservices, ETL pipelines, and AI systems with Python.',
    fileSize: '4.8 MB PDF',
    pages: 48,
    isPopular: true,
    sections: [
      {
        title: '1. Modern Type Hinting & Pydantic V2',
        description: 'Enforcing strict runtime type validation and deterministic data serialization.',
        topics: [
          'Generic Types (TypeVar, ParamSpec)',
          'Pydantic BaseModel & Field validation',
          'Protocol & Structural Subtyping',
          'Strict MyPy configuration for CI/CD'
        ],
        codeSnippet: `from typing import TypeVar, Generic, Protocol
from pydantic import BaseModel, Field, EmailStr

class Entity(Protocol):
    id: str

class UserSchema(BaseModel):
    id: str = Field(..., description="UUID v4 identifier")
    email: EmailStr
    is_active: bool = True
    tier: str = Field(default="standard", pattern="^(standard|pro|enterprise)$")

T = TypeVar("T", bound=Entity)

class Repository(Generic[T]):
    def __init__(self, model_cls: type[T]) -> None:
        self.model_cls = model_cls

    async def get_by_id(self, entity_id: str) -> T | None:
        # 3NF Database query execution
        return None`
      },
      {
        title: '2. Asynchronous Architecture & Concurrency',
        description: 'Mastering asyncio event loops, worker task queues, and non-blocking I/O.',
        topics: [
          'asyncio.TaskGroup & structured concurrency',
          'Connection pooling with asyncpg and SQLAlchemy 2.0',
          'Rate limiting and backpressure handlers',
          'Celery vs. ARQ async worker comparison'
        ],
        codeSnippet: `import asyncio
import httpx

async def fetch_telemetry(client: httpx.AsyncClient, node_id: int) -> dict:
    res = await client.get(f"https://api.cluster.internal/node/{node_id}/metrics")
    return res.json()

async def collect_cluster_metrics(node_ids: list[int]):
    async with httpx.AsyncClient(timeout=5.0) as client:
        async with asyncio.TaskGroup() as tg:
            tasks = [tg.create_task(fetch_telemetry(client, nid)) for nid in node_ids]
    
    return [task.result() for task in tasks]`
      },
      {
        title: '3. FastAPI Production Microservice Scaffold',
        description: 'Dependency injection, global error handlers, middleware telemetry, and OpenAPI 3.1 docs.',
        topics: [
          'Lifespan context managers for DB pool warmup',
          'Bearer token OAuth2 authentication dependencies',
          'Structured JSON logging with correlation IDs',
          'Prometheus metrics export and health check endpoints'
        ]
      }
    ]
  },
  {
    id: 'res-webdev-roadmap',
    slug: 'full-stack-web-development-roadmap',
    title: 'Full-Stack Web Development Complete Roadmap (2026)',
    category: 'Roadmap',
    technology: 'Full-Stack Web Dev',
    tagline: 'End-to-end curriculum from HTML5/CSS3 foundations to TypeScript, React 19, Node.js, 3NF DBs & DevOps.',
    description: 'A modular, step-by-step master engineering roadmap guiding developers through the 6 essential phases of modern production software development.',
    fileSize: 'Interactive + Printable PDF',
    pages: 12,
    isPopular: true,
    sections: [
      {
        title: 'Phase 1: Semantic Web & Styling Architecture',
        description: 'Mastering semantic markup, accessibility (a11y), responsive design, and CSS variables.',
        topics: [
          'HTML5 semantic landmarks (<header>, <nav>, <main>, <article>, <section>)',
          'CSS Grid, Flexbox, Container Queries, and Aspect Ratio math',
          'Tailwind CSS v4 engine, CSS custom properties, and design tokens',
          'WCAG 2.1 AA accessibility contrast, focus rings, and ARIA roles'
        ]
      },
      {
        title: 'Phase 2: Modern JavaScript (ESNext) & Core Mechanics',
        description: 'Deep understanding of JS runtime engines, the event loop, closures, and asynchronous execution.',
        topics: [
          'V8 execution context, call stack, microtask vs. macrotask queue',
          'Promises, async/await, AbortController, and streaming APIs',
          'Functional programming patterns (immutability, pure functions, currying)',
          'Modern DOM manipulation, Custom Events, and Web Workers'
        ]
      },
      {
        title: 'Phase 3: Production TypeScript & Type Systems',
        description: 'Eliminating runtime bugs with advanced TypeScript patterns and strict compiler flags.',
        topics: [
          'Generics, conditional types, mapped types, and template literal types',
          'Type narrowing, discriminated unions, and custom type guards',
          'Zod / Typebox runtime validation to static type inference',
          'TSConfig strict mode (strictNullChecks, noUncheckedIndexedAccess)'
        ],
        codeSnippet: `// Discriminated Union with Type-Safe Exhaustive Check
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: Error };

export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

export function handleState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'idle': return 'Ready to initiate';
    case 'loading': return 'Fetching payload...';
    case 'success': return \`Received: \${JSON.stringify(state.data)}\`;
    case 'error': return \`Failed: \${state.error.message}\`;
    default: return assertNever(state);
  }
}`
      },
      {
        title: 'Phase 4: Component Architecture & State Management',
        description: 'Building resilient client-side SPAs and SSR apps with React 19 and modern hooks.',
        topics: [
          'React 19 Server Components, Actions, and useOptimistic',
          'Custom hooks abstraction and memoization strategies',
          'Client-side state architecture (Zustand, React Context, TanStack Query)',
          'Core Web Vitals optimization (LCP, CLS, INP)'
        ]
      },
      {
        title: 'Phase 5: Backend, Typed APIs & 3NF SQL Databases',
        description: 'Creating robust server-side APIs, ACID transactions, and database normalization.',
        topics: [
          'Node.js / Express and Fastify server architecture',
          '1NF, 2NF, and 3NF database normalization standards',
          'PostgreSQL indexing (B-Tree, GIN, BRIN) and query planning (EXPLAIN ANALYZE)',
          'JWT authentication, Refresh Token rotation, and RBAC authorization'
        ]
      },
      {
        title: 'Phase 6: Cloud Deployment, Docker & LLMOps',
        description: 'Shipping to production with automated CI/CD and containerized environments.',
        topics: [
          'Multi-stage Docker builds and minimal Alpine/Distroless images',
          'Cloud Run / Kubernetes container orchestration',
          'GitHub Actions CI/CD pipelines (Lint, Test, Build, Deploy)',
          'Applied AI integration with Google Gen AI SDK & Vector embeddings'
        ]
      }
    ]
  },
  {
    id: 'res-3nf-cheatsheet',
    slug: 'database-normalization-3nf-cheatsheet',
    title: '3NF Relational Database Normalization Cheat Sheet',
    category: 'Cheat Sheet',
    technology: 'SQL & PostgreSQL',
    tagline: 'Definitive engineering reference for 1NF, 2NF, 3NF, BCNF rules, foreign key constraints & indexing.',
    description: 'A rapid-reference guide for eliminating data redundancy, preventing insertion/update/deletion anomalies, and structuring ACID relational databases.',
    fileSize: '2.1 MB PDF',
    pages: 8,
    isPopular: false,
    sections: [
      {
        title: 'First Normal Form (1NF)',
        description: 'Each table cell must contain a single, atomic value, and each record must be unique.',
        topics: [
          'Eliminate repeating groups in individual tables',
          'Create a separate table for each set of related data',
          'Identify each set of related data with a primary key'
        ],
        codeSnippet: `-- Violating 1NF (Non-atomic array in column):
-- Table: users (id, name, phone_numbers) -> [ "123-456", "789-012" ] ❌

-- 1NF Compliant Structure:
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_phones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phone_number VARCHAR(30) NOT NULL,
  phone_type VARCHAR(20) DEFAULT 'mobile'
);`
      },
      {
        title: 'Second Normal Form (2NF)',
        description: 'Must meet 1NF and have NO partial functional dependencies on composite primary keys.',
        topics: [
          'All non-key attributes must depend on the ENTIRE composite primary key',
          'Extract partial dependencies into separate entity tables'
        ]
      },
      {
        title: 'Third Normal Form (3NF)',
        description: 'Must meet 2NF and have NO transitive functional dependencies.',
        topics: [
          'No non-key attribute can depend on another non-key attribute (A -> B -> C)',
          'Ensure every non-key column depends on the key, the whole key, and nothing but the key'
        ],
        codeSnippet: `-- 3NF Compliant Orders & Addresses Schema:
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(150) NOT NULL,
  tax_id VARCHAR(50) UNIQUE
);

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  street_line1 VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country_code CHAR(2) NOT NULL
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  shipping_address_id UUID NOT NULL REFERENCES addresses(id),
  order_status VARCHAR(30) NOT NULL CHECK (order_status IN ('pending', 'paid', 'shipped')),
  total_amount NUMERIC(12, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`
      }
    ]
  },
  {
    id: 'res-api-starter-kit',
    slug: 'production-api-architecture-starter-kit',
    title: 'Production REST & GraphQL API Architecture Starter Kit',
    category: 'Starter Kit',
    technology: 'Node.js & TypeScript',
    tagline: 'Standardized boilerplate for typed REST endpoints, input sanitization, rate limiting & error contracts.',
    description: 'An enterprise-grade starter kit demonstrating standardized API response envelopes, idempotency keys, JWT auth guards, and automated Swagger/OpenAPI documentation.',
    fileSize: 'Zip Archive / GitHub Repo',
    isPopular: false,
    sections: [
      {
        title: 'Standard API Response Envelope',
        description: 'Predictable JSON structure across 100% of HTTP responses.',
        topics: [
          'Success envelope with payload data, pagination meta, and timestamp',
          'Error envelope with machine-readable error codes and field validation maps',
          'HTTP status code semantics (200, 201, 400, 401, 403, 404, 409, 422, 500)'
        ],
        codeSnippet: `export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  timestamp: string;
}`
      }
    ]
  }
];
