import { JourneyEntry } from '../types';

export const mockJourneyEntries: JourneyEntry[] = [
  {
    id: 'journey-teaching',
    period: '2024 — Present',
    title: 'Teaching Tech: 20k+ Online & Thousands In-Person',
    subtitle: 'Technical Educator & Community Mentor in Ethiopia',
    category: 'Education & Community',
    description: 'Empowered over 20,000+ students online and trained thousands physically across university labs, bootcamps, and coding workshops in Ethiopia with rigorous, practical computer science curricula.',
    highlights: [
      'Delivered comprehensive video series and interactive lessons on TypeScript, React, and Full-Stack Engineering reaching 20,000+ online learners',
      'Conducted intensive physical bootcamps covering 1NF-3NF relational database normalization, SQL indexing, and backend architectures',
      'Mentored hundreds of aspiring Ethiopian engineers in writing clean code, building production portfolios, and landing developer roles'
    ],
    tags: ['Tech Education', '20k+ Students', 'In-Person Bootcamps', 'TypeScript', 'Database 3NF', 'Mentorship']
  },
  {
    id: 'journey-1',
    period: '2023 — Present',
    title: 'Software Engineering Academic Studies at BDU',
    subtitle: 'Bahir Dar University (BiT) — Software Engineering Faculty, Ethiopia',
    category: 'Education',
    description: 'Pursuing comprehensive academic software engineering coursework at Bahir Dar University (BDU), mastering theoretical computer science foundations, algorithm analysis, relational database systems, and low-level computer architecture.',
    highlights: [
      'Core focus on algorithmic analysis, time complexity, and data structure implementations in C++ & Java',
      'Relational database architecture, 3NF normalization theorems, and ACID transaction semantics',
      'Software engineering methodologies, modular design patterns, UML modeling, and operating system principles'
    ],
    tags: ['Bahir Dar University (BDU)', 'Algorithms', 'Data Structures', 'C++', 'Databases', 'Operating Systems']
  },
  {
    id: 'journey-2',
    period: '2025 — Present',
    title: 'Full-Stack Web Systems & Architecture Specialization',
    subtitle: 'Practical Production Engineering',
    category: 'Technical',
    description: 'Transitioning theoretical computer science knowledge into production-grade web systems. Architecting full-stack applications with React, TypeScript, Express, and MySQL/PostgreSQL databases.',
    highlights: [
      'Engineered multi-tenant database designs with strict audit ledgers and transactional safety',
      'Implemented robust Express REST middleware with authentication, validation, and rate limiting',
      'Constructed accessible, design-token-driven responsive React client interfaces'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MySQL', 'System Design']
  },
  {
    id: 'journey-3',
    period: '2025',
    title: 'Automation & Asynchronous Workflow Systems',
    subtitle: 'Task Queues & Background Workers',
    category: 'Product',
    description: 'Designed distributed asynchronous task queue architectures using Redis and Node.js worker pools to manage background processing and automated monitoring probes.',
    highlights: [
      'Implemented exponential backoff retry algorithms with jitter for fault recovery',
      'Built automated CI/CD synthetic probe sentinels for endpoint uptime assertion',
      'Applied Docker containerization for reproducible local development and deployment pipelines'
    ],
    tags: ['Automation', 'Docker', 'Redis', 'CI/CD', 'Worker Pools']
  },
  {
    id: 'journey-4',
    period: '2024',
    title: 'Core Programming & Computational Foundations',
    subtitle: 'Algorithmic Problem Solving & Object-Oriented Modeling',
    category: 'Milestone',
    description: 'Built deep foundational skills across Python, C++, and modern JavaScript, solving algorithmic challenges and understanding system memory models.',
    highlights: [
      'Mastered pointers, memory allocation, and object lifetimes in C++',
      'Developed modular command-line tools and scripting automations in Python and Bash',
      'Explored event loop internals and asynchronous non-blocking I/O in JavaScript'
    ],
    tags: ['Python', 'C++', 'JavaScript', 'OOP', 'Memory Management']
  }
];
