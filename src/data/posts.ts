import { BlogPost } from '../types';

export const mockPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'designing-robust-express-middleware-pipelines',
    title: 'Designing Robust Express Middleware Pipelines for Production APIs',
    excerpt: 'A structured breakdown of request validation, security headers, authentication guards, and centralized error handling in Node.js applications.',
    content: `Building scalable REST APIs with Express requires more than registering random routes. A reliable server architecture is established by constructing a disciplined, sequential middleware pipeline that shields business logic from malformed payloads and unexpected runtime faults.

### 1. The Architectural Middleware Chain

In a standard production Express service, every incoming HTTP request should traverse explicit layers:

1. **Security & Protocol Layer:** Helmet (setting secure HTTP headers), CORS policy enforcement, and request payload rate limiting.
2. **Parsing & Sanitization Layer:** JSON body parsing with strict size limits to prevent Denial of Service (DoS) memory exhaustion attacks.
3. **Authentication & Identity Context:** Extraction and verification of JWT or session cookies, injecting user identity into the request context.
4. **Input Validation Layer:** Schema validation asserting that parameters, queries, and bodies conform strictly to expected types before reaching the controller.
5. **Controller / Service Routing:** The actual domain logic execution.
6. **Centralized Error Handling:** Catch-all error formatting that guarantees no sensitive stack traces are leaked to clients.

### 2. Centralized Error Middleware Implementation

Never rely on sporadic try/catch blocks sending ad-hoc JSON errors. Standardize on custom application errors:

\`\`\`typescript
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
\`\`\`

With an express global error handler:

\`\`\`typescript
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString()
    }
  });
};
\`\`\`

### Summary

By structuring your Express pipelines around clean boundaries and explicit validation, your codebase remains maintainable, testable, and resilient against unexpected runtime errors.`,
    category: 'Backend Architecture',
    tags: ['Node.js', 'Express', 'TypeScript', 'API Security', 'Clean Code'],
    coverImage: {
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Node.js and Express REST middleware code architecture',
      isTemporary: false
    },
    readTime: '6 min read',
    publishedAt: '2026-02-10',
    author: {
      name: 'Yitbarek K.',
      role: 'Software Engineering Student'
    }
  },
  {
    id: 'post-2',
    slug: 'relational-database-indexing-strategies-for-developers',
    title: 'Relational Database Indexing Strategies: B-Trees, Composite Keys & Query Plans',
    excerpt: 'Why full table scans occur in relational databases and how to design optimal composite indexes for high-frequency queries.',
    content: `When developing applications backed by MySQL or PostgreSQL, database queries that perform well with 50 test records can bring an entire production server to a halt when table sizes reach hundreds of thousands of rows.

### Understanding the B-Tree Index

Relational databases utilize balanced trees (B-Trees) to provide O(log n) lookups on indexed columns. Without an index on a filtered column, the database engine must execute a sequential scan (checking every single row from disk).

### The Composite Index Leftmost Prefix Rule

When indexing multiple columns simultaneously, the order of columns matters critically:

\`\`\`sql
CREATE INDEX idx_orders_user_status_created 
ON orders (user_id, status, created_at);
\`\`\`

This index will optimize queries filtering by:
- \`user_id\`
- \`user_id\` AND \`status\`
- \`user_id\` AND \`status\` AND \`created_at\`

However, a query filtering solely by \`status\` cannot effectively utilize this composite index because the leading column (\`user_id\`) was omitted.

### Always Inspect with EXPLAIN

Before deploying complex queries, inspect the query execution plan:

\`\`\`sql
EXPLAIN SELECT id, total_amount FROM orders 
WHERE user_id = 42 AND status = 'COMPLETED' 
ORDER BY created_at DESC LIMIT 10;
\`\`\`

Verify that the \`type\` is \`ref\` or \`range\`, rather than \`ALL\` (full table scan).`,
    category: 'Databases',
    tags: ['MySQL', 'PostgreSQL', 'SQL Indexing', 'Database Optimization', 'Backend'],
    coverImage: {
      src: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Relational database server queries and B-Tree indexing structure',
      isTemporary: false
    },
    readTime: '8 min read',
    publishedAt: '2026-01-18',
    author: {
      name: 'Yitbarek K.',
      role: 'Software Engineering Student'
    }
  },
  {
    id: 'post-3',
    slug: 'state-management-and-render-cycles-in-modern-react',
    title: 'State Orchestration & Unnecessary Render Prevention in React 19',
    excerpt: 'Techniques for keeping component rendering cycles lean through strategic component splitting, memoization, and primitive state structuring.',
    content: `React renders components when state or props change. While modern virtual DOM diffing is fast, unmanaged re-renders cascading down deep component trees introduce noticeable UI jank and input lag.

### Key Rules for Lean React Applications

1. **State Colocation:** Keep state as close to the consuming component as possible. Avoid hoisting local UI states (like dropdown toggles or hover tooltips) to global contexts.
2. **Primitive State Dependencies:** Avoid passing newly constructed objects or arrays as props in hot render paths.
3. **Custom Hooks as Pure Controllers:** Encapsulate complex state machines and async fetching in modular hooks, keeping JSX view components declarative and readable.

\`\`\`tsx
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}
\`\`\`
`,
    category: 'Frontend Engineering',
    tags: ['React', 'TypeScript', 'Frontend Performance', 'Web Architecture'],
    coverImage: {
      src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
      alt: 'React component render tree and state lifecycle visualization',
      isTemporary: false
    },
    readTime: '5 min read',
    publishedAt: '2025-12-04',
    author: {
      name: 'Yitbarek K.',
      role: 'Software Engineering Student'
    }
  }
];
