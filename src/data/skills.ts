import { SkillCategory } from '../types';

export const mockSkillCategories: SkillCategory[] = [
  {
    id: 'fullstack-web',
    name: 'Full-Stack Web & E-Commerce',
    description: 'Modern full-stack web applications, e-commerce stores, and high-performance bespoke portfolios.',
    skills: [
      { name: 'React 19 & Next.js', description: 'Functional components, custom hooks, SSR/SSG, state management' },
      { name: 'TypeScript & JavaScript', description: 'Strict typing, generic constraints, modern ESNext features, async/await' },
      { name: 'Node.js & Express.js', description: 'REST APIs, middleware pipelines, JWT auth, rate limiting, secure controllers' },
      { name: 'E-Commerce & Stripe', description: 'Cart state orchestration, Stripe Checkout integration, webhook handling, order management' },
      { name: 'Tailwind CSS & UI', description: 'Responsive design tokens, dark/light themes, accessible WCAG UI components' },
      { name: 'HTML5 & CSS3 Standards', description: 'Semantic DOM architecture, CSS Grid/Flexbox, cross-browser optimization' }
    ]
  },
  {
    id: 'python-automation',
    name: 'Python Automation & Bots',
    description: 'Autonomous Python systems, Telegram bots, conversational AI agents, and business ETL pipelines.',
    skills: [
      { name: 'Python (3.12+)', description: 'Asyncio concurrency, event loops, generator streams, Pydantic v2 schemas' },
      { name: 'Telegram Bots (aiogram)', description: 'aiogram 3.x, webhook deployment, inline menus, VIP membership paywalls' },
      { name: 'AI Chatbots & LangChain', description: 'RAG pipelines, OpenAI/Gemini SDKs, function calling, stateful dialogue' },
      { name: 'Web Scraping & ETL', description: 'Playwright, BeautifulSoup4, automated data scrapers, Google Sheets/CSV sync' },
      { name: 'FastAPI Microservices', description: 'High-throughput async endpoints, OpenAPI auto-documentation, background worker queues' }
    ]
  },
  {
    id: 'databases',
    name: 'Databases & System Architecture',
    description: 'Relational database schema design, 3NF normalization, and query performance.',
    skills: [
      { name: 'PostgreSQL & pgvector', description: 'ACID transactions, relational joins, dense vector embeddings similarity search' },
      { name: 'MySQL / MariaDB', description: 'InnoDB engine, foreign keys, transactions, composite indexes' },
      { name: '3NF Schema Normalization', description: '1NF/2NF/3NF anomaly elimination, entity-relationship modeling, audit trails' },
      { name: 'REST & GraphQL APIs', description: 'Standardized response envelopes, pagination, idempotency, typed schemas' }
    ]
  },
  {
    id: 'tooling-devops',
    name: 'DevOps, Cloud & Tooling',
    description: 'Development environment automation, version control, and containerization.',
    skills: [
      { name: 'Docker & Compose', description: 'Multi-stage container builds, microservice orchestration, port isolation' },
      { name: 'Git & GitHub Actions', description: 'CI/CD automated testing, linting, build verification, semantic releases' },
      { name: 'Linux / Unix CLI', description: 'Production server administration, systemd service daemons, cron jobs' },
      { name: 'Vite & Build Tooling', description: 'ES module bundling, hot reload optimizations, bundle size auditing' }
    ]
  }
];
