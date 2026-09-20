import { Testimonial } from '../types';

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    role: 'Co-Founder & CTO',
    organization: 'Vortex Cloud Solutions',
    country: 'United States',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    type: 'client',
    quote: 'Hired Yitbarek for our SaaS frontend overhaul and Stripe multi-currency checkout. He brought our Google Lighthouse score from 62 to 99, delivered 3 days ahead of milestone schedule, and provided crisp daily async updates. Exceptional senior developer.',
    projectOrCourse: 'SaaS Platform & Stripe Checkout Overhaul',
    verified: true,
    date: '2026-01-18'
  },
  {
    id: 'test-2',
    name: 'Sarah Chen',
    role: 'VP of Product',
    organization: 'OmniStream Media',
    country: 'Canada',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    type: 'client',
    quote: 'Finding a frontend contractor who actually delivers pixel-perfect Figma fidelity, fluid micro-interactions, and accessible code is rare. Yitbarek communicated seamlessly across our North American timezone and handed over a pristine codebase.',
    projectOrCourse: 'Design System & Client Portal',
    verified: true,
    date: '2025-11-29'
  },
  {
    id: 'test-3',
    name: 'Julian Becker',
    role: 'Managing Director',
    organization: 'FinTech Alpha Labs',
    country: 'Germany',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    type: 'client',
    quote: 'Yitbarek engineered our automated Telegram VIP community bot with Stripe billing webhooks and automated invite gates. Over 15,000 active subscribers handled with zero latency and 100% uptime over 6 months.',
    projectOrCourse: 'High-Concurrency Telegram VIP Bot',
    verified: true,
    date: '2026-02-10'
  },
  {
    id: 'test-4',
    name: 'Elena Rostova',
    role: 'Frontend Engineering Student',
    organization: 'Technical University Berlin',
    country: 'Germany',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    type: 'student',
    quote: 'Yitbarek’s 2026 Full-Stack Roadmap and TypeScript guide cut through the noise. His breakdown of component state machines, render cycles, and 3NF database normalization is clearer and far more practical than standard university lectures.',
    projectOrCourse: '2026 Full-Stack Web Roadmap',
    verified: true,
    date: '2026-02-05'
  },
  {
    id: 'test-5',
    name: 'David Kimani',
    role: 'Junior Full-Stack Developer',
    organization: 'Nairobi Tech Hub',
    country: 'Kenya',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    type: 'student',
    quote: 'I was one of thousands who learned Python concurrency and React architecture through Yitbarek’s materials. His focus on real production code, error handling, and clean repository structures helped me land my first remote developer role.',
    projectOrCourse: 'Python Concurrency & Asyncio Handbook',
    verified: true,
    date: '2025-12-14'
  },
  {
    id: 'test-6',
    name: 'Chloe Dubois',
    role: 'Software Engineering Learner',
    organization: 'Paris Open Source Lab',
    country: 'France',
    avatarUrl: 'https://images.unsplash.com/photo-1534751516642-a171edd2521d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    type: 'student',
    quote: 'The Python microservices handbook and 3NF cheatsheet are indispensable. He doesn’t teach abstract theory—he shows real connection pools, atomic transactions, and scalable UI patterns.',
    projectOrCourse: 'Applied Python Microservices & SQL Guide',
    verified: true,
    date: '2026-02-22'
  }
];
