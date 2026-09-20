import { Service } from '../types';

export const mockServices: Service[] = [
  {
    id: 'srv-frontend',
    slug: 'frontend-engineering-ui-systems',
    emoji: '⚛️',
    title: 'Frontend Web Development & UI Design',
    description: 'Custom, fast, and responsive websites built with React, TypeScript, and modern CSS. Designed to look great on all screens, load in under a second, and be easy for customers to use.',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Frontend website development with React and TypeScript',
    priceEstimate: 'From $450',
    turnaround: '5 – 14 Days',
    deliverables: [
      'Clean, reliable frontend code written with React and TypeScript',
      'Pixel-perfect match to your Figma or wireframe designs across phones, tablets, and laptops',
      'Fast page loading speeds (under 1 second) and SEO-friendly structure',
      'Accessible UI components with smooth, subtle animations',
      'Live staging link so you can test the website before it goes live'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'Clean Code'],
    workflow: [
      'Review Your Design & Goals',
      'Set Up Colors, Fonts & Reusable Components',
      'Build Interactive Pages & Connect APIs',
      'Test Performance & Screen Responsiveness',
      'Deploy to Live Staging for Final Approval'
    ],
    status: 'Available'
  },
  {
    id: 'srv-1',
    slug: 'fullstack-web-ecommerce-apps',
    emoji: '🛒',
    title: 'Full-Stack Web Apps & E-Commerce Stores',
    description: 'Complete online stores and web applications built from scratch. Includes shopping carts, secure checkout with Stripe, user accounts, and an easy-to-use admin dashboard.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Online store checkout and responsive web app dashboard',
    priceEstimate: 'From $650',
    turnaround: '1 – 3 Weeks',
    deliverables: [
      'Complete online store with shopping cart and secure Stripe payments',
      'Fast and modern storefront that converts visitors into customers',
      'Secure backend API with user login and organized database tables',
      'Admin dashboard to manage products, view incoming orders, and track customers',
      'Full deployment with HTTPS security and custom domain setup'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'Docker'],
    workflow: [
      'Project Scope & Database Plan',
      'Payment Gateway & User Authentication Setup',
      'Build Backend APIs & Connect Database',
      'Build Frontend Storefront & Shopping Cart',
      'Testing, Security Check & Launch Handover'
    ],
    status: 'Available'
  },
  {
    id: 'srv-2',
    slug: 'python-telegram-bots-chatbots',
    emoji: '🤖',
    title: 'Python Telegram Bots & AI Chatbots',
    description: 'Custom Telegram bots and AI assistants that work 24/7. Automatically welcome new members, handle paid channel subscriptions, process orders, and answer customer questions.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Telegram bot chat and automated responses',
    priceEstimate: 'From $300',
    turnaround: '3 – 7 Days',
    deliverables: [
      'Custom Telegram bot with interactive buttons, menus, and fast commands',
      'Automatic payment checking for VIP channels and private member groups',
      'Smart AI chatbot trained on your company FAQs and documents',
      'Reliable database storage for user profiles and purchase history',
      '24/7 cloud server hosting with automatic restart if anything goes wrong'
    ],
    technologies: ['Python', 'aiogram', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
    workflow: [
      'Plan Bot Messages & Menu Commands',
      'Configure Telegram Bot Token & Webhooks',
      'Program Bot Logic & Database Storage',
      'Connect Payments (Stripe or Crypto)',
      'Deploy to Cloud Server & 24/7 Test'
    ],
    status: 'Available'
  },
  {
    id: 'srv-3',
    slug: 'python-business-process-automation',
    emoji: '⚡',
    title: 'Business Automation & Data Scripts',
    description: 'Python scripts that handle repetitive computer work automatically. Save hours by pulling data from websites, updating Google Sheets, or sending automated email alerts.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Automated data script and spreadsheet sync',
    priceEstimate: 'From $250',
    turnaround: '4 – 10 Days',
    deliverables: [
      'Automated web scrapers to gather data from websites quickly and safely',
      'Automatic two-way syncing between Google Sheets, databases, and business tools',
      'Automatic PDF invoice and report generator sent to email or Slack',
      'Scheduled background scripts that run on a timer with zero manual work',
      'Clear documentation and easy setup guide for your team'
    ],
    technologies: ['Python', 'Playwright', 'FastAPI', 'Pandas', 'PostgreSQL', 'Docker'],
    workflow: [
      'Review Your Manual Process & Bottlenecks',
      'Write the Python Automation Script',
      'Add Error Handling & Automatic Retries',
      'Test with Real Data in a Safe Sandbox',
      'Set Up Automated Schedule & Handover'
    ],
    status: 'Available'
  }
];
