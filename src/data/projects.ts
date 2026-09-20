import { Project } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'novacommerce-multivendor-ecommerce',
    title: 'NovaCommerce — Full-Stack E-Commerce Platform',
    tagline: 'High-conversion modular e-commerce engine with real-time inventory, Stripe checkout, order lifecycle management, and admin analytics.',
    description: 'A production-grade full-stack e-commerce web platform engineered for scale. Features dynamic shopping cart management, multi-tier product catalog with variants, secure PCI-compliant Stripe payment processing, real-time inventory locks to prevent race conditions during flash sales, and a comprehensive merchant admin portal.',
    problem: 'Standard monolithic e-commerce platforms struggle with flash-sale inventory race conditions, sluggish page load times (>3s), and poor integration flexibility with regional payment gateways.',
    solution: 'Engineered a full-stack solution with Next-gen React client architecture, 3NF normalized PostgreSQL schema with transactional row-level inventory reservations, Redis caching, and webhook reconciliation for failed payments.',
    features: [
      'Transactional checkout with ACID database guarantees and row-level inventory locking',
      'Integrated Stripe & regional payment webhooks with automatic order status transitions',
      'Advanced product filtering (multi-attribute, price range, brand, instant search)',
      'Merchant admin dashboard: live sales charts, order fulfillment, refund triggers, and customer CRM',
      'Sub-second page rendering and responsive mobile-first shopping UX'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Docker'],
    category: 'Full-Stack',
    status: 'Completed',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80',
        alt: 'NovaCommerce storefront and product catalog interface',
        isTemporary: false,
        caption: 'Storefront UI with dynamic product filtering & cart preview'
      },
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        alt: 'E-commerce merchant sales telemetry and order dashboard',
        isTemporary: false,
        caption: 'Merchant analytics & order fulfillment portal'
      }
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com', type: 'github' },
      { label: 'Live Store Demo', url: '#', type: 'demo' }
    ],
    createdDate: '2026-01-15',
    featured: true,
    architectureOverview: '3-tier architecture with Express REST controllers, Prisma repository layer, PostgreSQL 3NF tables with foreign key integrity, and Redis session stores.'
  },
  {
    id: 'proj-2',
    slug: 'teleflow-telegram-automation-bot',
    title: 'TeleFlow — Async Python Telegram Automation & Paywall Bot',
    tagline: 'High-throughput Telegram bot for paid VIP channels, automated membership management, broadcast scheduling, and CRM syncing.',
    description: 'An enterprise-ready asynchronous Python Telegram bot built with aiogram 3.x. Automates complete customer onboarding, subscription payments with auto-invite/kick links for private channels, scheduled multi-media broadcasting, and custom interactive inline query menus.',
    problem: 'Community leaders and businesses lose dozens of hours weekly manually verifying payment screenshots and manually adding/removing members from paid VIP Telegram channels.',
    solution: 'Developed an autonomous bot that listens to payment webhooks, generates single-use time-limited Telegram invite links, tracks subscription expiration dates in PostgreSQL, and automatically revokes access when renewals lapse.',
    features: [
      'Asyncio high-concurrency event handlers capable of processing 1,000+ commands/sec',
      'Automated VIP channel paywall with dynamic invite generation and auto-ban expiration crons',
      'Interactive inline menu navigation with persistent callback state machines',
      'Broadcast campaign engine with rate-limit compliance, delivery retry queues, and read-tracking',
      'Telegram-to-CRM bi-directional user profile synchronization'
    ],
    technologies: ['Python (3.12+)', 'aiogram 3.x', 'Asyncio', 'PostgreSQL', 'Redis', 'Docker', 'FastAPI'],
    category: 'Automation',
    status: 'Completed',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        alt: 'Telegram bot conversational command interface and menus',
        isTemporary: false,
        caption: 'Interactive inline keyboards & payment verification flow'
      },
      {
        src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        alt: 'Bot async architecture and webhook pipeline diagram',
        isTemporary: false,
        caption: 'Asyncio event loop & webhook dispatcher architecture'
      }
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com', type: 'github' },
      { label: 'Bot Architecture Docs', url: '#', type: 'docs' }
    ],
    createdDate: '2025-11-20',
    featured: true,
    architectureOverview: 'Event-driven Asyncio polling / webhook gateway powered by aiogram 3.x, structured middleware for rate-limiting, and PostgreSQL for state retention.'
  },
  {
    id: 'proj-3',
    slug: 'omnichat-ai-customer-support-bot',
    title: 'OmniChat — AI Support & Knowledge Base Chatbot',
    tagline: 'Context-grounded conversational AI chatbot with automatic FAQ resolution, intent routing, and human-agent escalation.',
    description: 'An intelligent Python/FastAPI conversational chatbot designed for customer support and lead qualification. Connects to business documentation and product databases via vector embeddings to answer inquiries with zero hallucination and route complex issues to human agents.',
    problem: 'Customer support teams are overwhelmed by hundreds of repetitive product inquiries, causing slow response times and lost sales conversion.',
    solution: 'Built an AI-powered conversational agent using FastAPI and LLM semantic retrieval (RAG) that instantly answers 85%+ of standard inquiries while logging leads directly to business databases.',
    features: [
      'Semantic document retrieval (RAG) over company PDFs, FAQs, and product catalogs',
      'Multi-channel deployment (embeddable web widget, WhatsApp, and Telegram interfaces)',
      'Intent detection and automated lead capture with email notifications to sales teams',
      'Seamless human agent fallback escalation with conversation history preservation',
      'Conversation sentiment analysis and analytics dashboard'
    ],
    technologies: ['Python', 'FastAPI', 'LangChain', 'OpenAI / Gemini SDK', 'PostgreSQL (pgvector)', 'React Widget'],
    category: 'Automation',
    status: 'Completed',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
        alt: 'AI Chatbot conversational interface with context grounding',
        isTemporary: false,
        caption: 'Context-grounded customer support chat interface'
      }
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com', type: 'github' },
      { label: 'Interactive Demo', url: '#', type: 'demo' }
    ],
    createdDate: '2025-09-10',
    featured: true,
    architectureOverview: 'FastAPI async server with vector similarity search over pgvector, prompt templating with fallback guards, and WebSocket streaming.'
  },
  {
    id: 'proj-4',
    slug: 'autosync-business-process-automation',
    title: 'AutoSync — Python Business Workflow & ETL Automation',
    tagline: 'Automated data ingestion pipeline, competitor price scraper, and automated PDF invoice generation engine.',
    description: 'An automated background processing engine built with Python, Playwright, and Pandas. Automatically extracts product pricing and market data from supplier websites, synchronizes inventory with Google Sheets and internal databases, generates branded PDF invoices, and dispatches automated summary emails.',
    problem: 'Businesses waste 15+ hours weekly performing manual data entry across disparate supplier sites, accounting sheets, and customer order emails.',
    solution: 'Created an autonomous scheduled Python worker pipeline that runs headless browser scrapers with anti-detection, transforms raw unstructured data, updates Google Sheets via API, and generates PDF receipts.',
    features: [
      'Headless browser scraping with dynamic Javascript rendering (Playwright & BeautifulSoup)',
      'Automated Google Sheets & CRM bi-directional data synchronization via OAuth2 APIs',
      'Programmatic branded PDF invoice and financial summary generation (ReportLab / WeasyPrint)',
      'Automated email and Slack notification dispatching with structured error reporting',
      'Robust retry logic with exponential backoff and proxy rotation for uninterrupted scraping'
    ],
    technologies: ['Python (3.12)', 'Playwright', 'Pandas', 'Google Sheets API', 'FastAPI', 'Docker', 'Cron'],
    category: 'Automation',
    status: 'Completed',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
        alt: 'Business workflow automation execution dashboard and log stream',
        isTemporary: false,
        caption: 'Automated data pipeline telemetry and ETL monitoring'
      }
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com', type: 'github' }
    ],
    createdDate: '2025-07-28',
    featured: true,
    architectureOverview: 'Containerized Python daemon scheduled via cron executing Playwright browser automation with Pandas data normalization and Google Cloud API sync.'
  },
  {
    id: 'proj-5',
    slug: 'apex-portfolio-developer-suite',
    title: 'ApexPortfolio — Ultra-Fast Responsive Portfolio Engine',
    tagline: 'Lightning-fast, accessible web application tailored for technical portfolios, client showcases, and interactive product demos.',
    description: 'A bespoke modern portfolio and web application built with React 19, TypeScript, and Tailwind CSS. Features sub-100ms client-side page transitions, dark/light theme persistence, interactive code playgrounds, and custom contact dispatching.',
    problem: 'Standard portfolio templates are heavy, slow, riddled with generic placeholders, and lack clean technical presentation required for high-value client contracts.',
    solution: 'Engineered a clean, zero-clutter developer web platform with modular components, perfect WCAG AA contrast, and zero layout shift.',
    features: [
      'Zero layout shift, 100/100 Lighthouse performance metrics, and instant responsive layouts',
      'Dynamic project filtering and live interactive architecture inspector',
      'Client-side search modal with Ctrl+K keyboard navigation',
      'Dark and light mode with system preference synchronization',
      'Contact form validation with direct webhook notification triggers'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
    category: 'Full-Stack',
    status: 'Completed',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
        alt: 'ApexPortfolio interface layout and technical showcase view',
        isTemporary: false,
        caption: 'Modular UI system with responsive project explorer'
      }
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com', type: 'github' },
      { label: 'Live Application', url: '#', type: 'live' }
    ],
    createdDate: '2026-02-01',
    featured: false,
    architectureOverview: 'Client-side SPA with typed data stores, atomic component architecture, and responsive token-based styling.'
  }
];

