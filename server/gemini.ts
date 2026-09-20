import { GoogleGenAI } from '@google/genai';
import { db } from './db';

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `
You are the interactive Senior AI Assistant & Technical Consultant for YITBAREK.K's Engineering Platform.
You represent Yitbarek K. — Full-Stack Web Developer & Python Automation Specialist (academic software engineering background from Bahir Dar University - BDU).

Core Engineering Specialties:
1. Full-Stack Web Development:
   - E-Commerce Web Platforms: Custom shopping carts, Stripe/payment gateway integrations, 3NF PostgreSQL schemas, row-level inventory reservations, order lifecycle webhooks.
   - Web Applications (SaaS): React 19, TypeScript, Tailwind CSS, Node.js/Express REST APIs, role-based JWT authentication, high performance.
   - Bespoke Portfolios & Client Showcases: Sub-100ms load times, responsive modern UI, WCAG AA compliance, zero layout shift.
2. Python Automation & Bot Engineering:
   - Telegram Bots: Built with aiogram 3.x and Asyncio. VIP channel paywalls, automated single-use invite generation, auto-expiration kick crons, inline keyboards, callback state machines.
   - Conversational AI Chatbots: Grounded semantic retrieval (RAG) using LangChain, pgvector embeddings, function calling, FAQ automation, lead capture, human escalation.
   - Business Process Automation & ETL: Headless browser scraping (Playwright, Selenium, BeautifulSoup), Google Sheets API bi-directional sync, automated PDF invoice generation, scheduled workers.

Capabilities You Provide to Users:
1. **Full-Stack & E-Commerce Consulting**: Explain architecture, database schema, payment webhooks, or shopping cart state.
2. **Telegram Bot & Python Automation Design**: Detail bot handlers, aiogram 3.x dispatchers, Asyncio concurrency, webhook setups.
3. **Database & 3NF Schema Generation**: Write clean PostgreSQL DDL in 3NF with foreign keys, checks, and indexes.
4. **Code Generation & Review**: Write clean TypeScript, React, Python, or SQL code examples on demand.
5. **Client Inquiries & Hiring**: Guide users on hiring Yitbarek for full-stack contracts, bot development, or custom automations.

Tone: Professional, technically precise, authoritative, and helpful. Always format code using appropriate Markdown syntax highlighting (\`\`\`typescript, \`\`\`sql, \`\`\`python).
`;

export async function generateEngineeringAssistantResponse(
  userPrompt: string, 
  history: Array<{ role: string; content: string }> = []
): Promise<string> {
  const client = getGeminiClient();

  if (!client) {
    return getOfflineKnowledgeResponse(userPrompt);
  }

  try {
    const formattedHistory = history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n');
    const fullPrompt = `${formattedHistory ? `Previous Conversation:\n${formattedHistory}\n\n` : ''}User Query: ${userPrompt}`;

    const response = await client.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    return response.text || 'I analyzed your technical query but could not generate a response. Please refine your question.';
  } catch (error: any) {
    console.error('Gemini API execution error, falling back to senior knowledge engine:', error?.message);
    return getOfflineKnowledgeResponse(userPrompt);
  }
}

function getOfflineKnowledgeResponse(prompt: string): string {
  const lower = prompt.toLowerCase();

  // 1. 3NF and Relational Database normalization
  if (lower.includes('3nf') || lower.includes('normalization') || lower.includes('database') || lower.includes('schema') || lower.includes('sql') || lower.includes('acid')) {
    return `### Relational Database Engineering & 3NF Normalization

Yitbarek designs relational systems strictly adhering to **Third Normal Form (3NF)**:

1. **1NF (Atomic Attributes)**: Every table cell contains a single scalar value. No comma-separated lists or repeating groups. Unique primary key for every entity.
2. **2NF (No Partial Key Dependencies)**: Every non-key column depends on the *entire* candidate key (critical for composite keys).
3. **3NF (No Transitive Dependencies)**: Non-key columns depend *only* on the primary key ($X \\rightarrow Y$, where $X$ is a superkey).

#### 3NF E-Commerce Schema Example (PostgreSQL):
\`\`\`sql
-- Users Entity
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(120) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Entity (Atomic Header)
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status VARCHAR(32) NOT NULL DEFAULT 'PENDING',
  total_cents INT NOT NULL CHECK (total_cents >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items (3NF Line Items with Foreign Keys)
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price_cents INT NOT NULL CHECK (unit_price_cents >= 0)
);

CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);
\`\`\`

Ask me to generate a 3NF schema for your specific project or explain ACID concurrency!`;
  }

  // 2. AI Engineering, RAG & Agents
  if (lower.includes('ai') || lower.includes('rag') || lower.includes('llm') || lower.includes('prompt') || lower.includes('vector') || lower.includes('agent')) {
    return `### Applied AI Engineering & LLM Systems

Yitbarek's AI engineering curriculum covers 3 critical tiers from foundation to production:

1. **Deterministic Prompting & Tokenization (Beginner)**:
   - Understanding BPE token counters and context window preservation.
   - Constraining temperature (0.0 to 0.2) for strict structured JSON outputs.

2. **RAG with pgvector & Vector Search (Intermediate)**:
   - Chunking markdown documents with 15% sliding window overlap.
   - Computing dense 768-dimensional embeddings and indexing with **HNSW** in PostgreSQL.

3. **Autonomous Agentic Loops (Advanced)**:
   - Declaring type-safe function schemas with parameter validation.
   - Building capped state machines with cycle guards and automatic error recovery.

\`\`\`typescript
// Type-Safe Tool Calling with Gemini & Google GenAI SDK
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getStockTool = {
  name: 'queryStock',
  description: 'Retrieves current available inventory quantity for a SKU.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      sku: { type: Type.STRING, description: 'Unique product SKU' }
    },
    required: ['sku']
  }
};
\`\`\`

Would you like to explore our RAG pipeline tutorial or see a full function-calling loop?`;
  }

  // 3. C++ & Systems Programming
  if (lower.includes('c++') || lower.includes('pointer') || lower.includes('memory') || lower.includes('raii') || lower.includes('stl')) {
    return `### C++ & Low-Level Systems Programming

Our curriculum covers core systems discipline from pointer mechanics to modern C++20:

- **Beginner**: Stack vs Heap memory allocation, pointer dereferencing (\`*\`), address referencing (\`&\`), and manual \`new\` / \`delete\` lifecycle.
- **Intermediate**: STL Containers (\`std::vector\` amortized $O(1)$, \`std::map\` $O(\\log N)$ Red-Black trees, \`std::unordered_map\` hash tables) and Big-O trade-offs.
- **Advanced**: Modern C++ RAII, exclusive ownership with \`std::unique_ptr\`, reference counting with \`std::shared_ptr\`, and move semantics (\`std::move\`).

\`\`\`cpp
// RAII Smart Pointer Factory in Modern C++20
#include <iostream>
#include <memory>

class ResourcePool {
public:
    explicit ResourcePool(const std::string& name) : tag(name) {
        std::cout << "[Allocated] " << tag << std::endl;
    }
    ~ResourcePool() {
        std::cout << "[Freed Automatically] " << tag << std::endl;
    }
private:
    std::string tag;
};

std::unique_ptr<ResourcePool> makePool(const std::string& name) {
    return std::make_unique<ResourcePool>(name);
}
\`\`\`

Ask me any question on C++ memory management, pointer arithmetic, or algorithmic complexity!`;
  }

  // 4. Python Automation, Telegram Bots & Data Engineering
  if (lower.includes('python') || lower.includes('telegram') || lower.includes('bot') || lower.includes('automation') || lower.includes('fastapi') || lower.includes('scraper')) {
    return `### Python Automation, Telegram Bots & Pipelines

Yitbarek builds high-throughput Python automation systems and Telegram bots:

- **Async Telegram Bots (aiogram 3.x)**: High-concurrency bots capable of processing 1,000+ commands/sec, VIP paid subscription paywalls with auto-invite and auto-kick logic, inline keyboards, and persistent callback state machines.
- **Conversational AI Chatbots**: RAG pipelines with FastAPI, pgvector similarity search, and automated customer support lead qualification.
- **Business Process Automation & ETL**: Headless browser scraping (Playwright / Selenium), bi-directional Google Sheets API syncing, and automated PDF invoice generation.

\`\`\`python
# Telegram Bot Async Command Handler with aiogram 3.x
import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton

dp = Dispatcher()

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🚀 Join VIP Channel", callback_data="join_vip")],
        [InlineKeyboardButton(text="💬 AI Support", callback_data="ai_help")]
    ])
    await message.answer(
        f"Hello {message.from_user.first_name}! Welcome to the automation hub.",
        reply_markup=keyboard
    )
\`\`\`

Ask me how to implement paywall verification, set up aiogram webhooks, or build automated web scrapers!`;
  }

  // 5. DevOps & Cloud
  if (lower.includes('docker') || lower.includes('devops') || lower.includes('nginx') || lower.includes('ci/cd') || lower.includes('actions')) {
    return `### DevOps & Cloud Infrastructure

Our systems and lessons cover production cloud architectures:

- **Multi-Stage Dockerfiles**: Lean production images (under 120MB) with non-root security users.
- **GitHub Actions CI/CD**: Automated matrix testing, TypeScript type verification, Docker image bundling, and zero-downtime deployment.
- **Nginx Reverse Proxies**: SSL/TLS termination with Let's Encrypt, gzip compression, and weighted round-robin load balancing.

\`\`\`dockerfile
# Multi-Stage Node.js Production Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
USER node
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.cjs"]
\`\`\``;
  }

  // 6. General Profile / Services / Background
  return `### Full-Stack Developer & Python Automation Overview

**Yitbarek K.** is a Full-Stack Web Developer & Python Automation Specialist with academic software engineering training from **Bahir Dar University (BDU)**.

#### Core Engineering Specialties:
- **Full-Stack Web Development**: Custom E-Commerce stores (carts, Stripe checkout, row-level inventory locks, order webhooks), high-performance SaaS web applications (React 19, TypeScript, Node.js/Express, 3NF PostgreSQL), and bespoke developer portfolios.
- **Python Automation & Bot Systems**: High-throughput Telegram bots (aiogram 3.x, VIP paywalls, auto-invite links), conversational AI customer support chatbots (RAG, FastAPI, pgvector), and business ETL pipelines (Playwright, Google Sheets sync, automated PDF invoices).
- **Relational Databases & Architecture**: Strict 3NF database normalization, transactional integrity, and scalable containerized deployments with Docker.

#### Try asking me:
- *"How do you design a Telegram bot with a paid membership paywall?"*
- *"Generate a 3NF PostgreSQL schema for an e-commerce platform"*
- *"How does RAG retrieval work with FastAPI and pgvector?"*
- *"Show me an async Playwright web scraper in Python"*
- *"What is Yitbarek's approach to Stripe webhook reconciliation?"*`;
}
