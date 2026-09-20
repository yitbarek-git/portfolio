-- ==============================================================================
-- YITBAREK.K Portfolio & Learning Platform — Seed Data
-- ==============================================================================

-- 1. Admin User (Default admin credential: admin / admin123)
INSERT INTO users (id, username, email, password_hash, role)
VALUES ('usr-01', 'admin', 'ykifleyohans@gmail.com', '$2a$10$e5k5g...hash...', 'admin')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- 2. Projects
INSERT INTO projects (id, slug, title, tagline, description, category_id, category_name, status, featured, github_url, live_url, architecture_overview, problem_statement, solution_statement, featured_image_url, featured_image_alt)
VALUES
('proj-1', 'erp-inventory-engine', 'Enterprise Inventory & Supply Chain Hub', 'High-throughput inventory tracking with 3NF relational normalization', 'Full-stack enterprise inventory system handling real-time stock deductions, automated supplier replenishment triggers, and audit logging with strict transactional consistency.', 'cat-fullstack', 'Full-Stack Applications', 'Production Ready', TRUE, 'https://github.com/yitbarek-k/inventory-hub', 'https://demo-inventory.yitbarek.dev', 'Three-tier layered architecture separating controller dispatchers, service business domain logic, and direct SQL repository queries. Enforces atomic ACID transactions for multi-warehouse deductions.', 'Distributed warehouses frequently suffer from stock race conditions and desynchronized stock counts during high-volume checkout surges.', 'Engineered a normalized 3NF MySQL database with row-level locks, transaction rollbacks, and Redis caching for hot product catalogs.', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', 'Warehouse logistics dashboard'),

('proj-2', 'developer-lms-platform', 'Technical Courseware & LMS Engine', 'Interactive software engineering curriculum platform with code challenges', 'A dedicated educational LMS designed for software engineering students, offering structured learning modules, live code editors, progress tracking, and interactive quizzes.', 'cat-fullstack', 'Full-Stack Applications', 'Active Beta', TRUE, 'https://github.com/yitbarek-k/dev-lms', 'https://learn.yitbarek.dev', 'Micro-modular TypeScript architecture with React client-side rendering and Express API proxy. Integrates Monaco code editor with mock test runners.', 'Traditional learning platforms are generic and lack dedicated software engineering curriculum structures and interactive code experimentation.', 'Built an open, accessible technical curriculum engine with instant syntax verification, lesson difficulty tiers, and student progress metrics.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', 'Developer coding environment'),

('proj-3', 'sql-query-visualizer', 'Relational Schema & 3NF Analyzer', 'Visual database normalization and query execution visualizer', 'An engineering utility tool that parses SQL schemas, identifies 1NF/2NF/3NF normalization violations, and renders interactive ERD diagrams.', 'cat-db', 'Database Systems', 'Stable Release', TRUE, 'https://github.com/yitbarek-k/sql-3nf-analyzer', 'https://sql-erd.yitbarek.dev', 'AST SQL parser coupled with SVG visual graph generator. Uses topological sorting to resolve table dependency trees.', 'Students and junior developers struggle to understand functional dependencies and foreign key cascades during database design.', 'Implemented interactive schema canvas with automated dependency analysis and 3NF normalization validation checks.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', 'Database server rack');

-- 3. Project Technologies
INSERT INTO project_technologies (project_id, technology_name) VALUES
('proj-1', 'TypeScript'), ('proj-1', 'Node.js'), ('proj-1', 'Express'), ('proj-1', 'MySQL'), ('proj-1', 'Redis'), ('proj-1', 'Docker'),
('proj-2', 'React 19'), ('proj-2', 'TypeScript'), ('proj-2', 'Tailwind CSS'), ('proj-2', 'Express'), ('proj-2', 'SQLite'),
('proj-3', 'TypeScript'), ('proj-3', 'D3.js'), ('proj-3', 'Tailwind CSS'), ('proj-3', 'SQL Parser');

-- 4. Blog Posts
INSERT INTO blog_posts (id, slug, title, excerpt, content, category, read_time, featured, published, featured_image_url, featured_image_alt) VALUES
('post-1', 'database-normalization-3nf-guide', 'Mastering Database Normalization: From 1NF to 3NF in Practice', 'A deep dive into relational database design principles, avoiding functional dependencies, and preventing update anomalies in production applications.', 'Database normalization is the fundamental process of structuring a relational database in accordance with a series of normal forms to reduce data redundancy and improve data integrity...', 'Database Engineering', '7 min read', TRUE, TRUE, 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80', 'Relational database schema'),
('post-2', 'building-scalable-express-apis', 'Architecting Scalable Express & TypeScript APIs with Clean Architecture', 'How to separate business logic, controller validation, and database operations into maintainable layers with zero circular dependencies.', 'When building backend web applications, codebases often devolve into messy monolithic controller files that directly query the database...', 'Backend Engineering', '9 min read', TRUE, TRUE, 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80', 'Clean code editor');

-- 5. Blog Tags
INSERT INTO blog_tags (post_id, tag_name) VALUES
('post-1', 'Database'), ('post-1', 'MySQL'), ('post-1', '3NF'), ('post-1', 'Architecture'),
('post-2', 'Node.js'), ('post-2', 'Express'), ('post-2', 'TypeScript'), ('post-2', 'Clean Code');

-- 6. Tech Lessons
INSERT INTO tech_lessons (id, slug, title, description, category, difficulty, estimated_time, summary, code_snippet, code_language, featured) VALUES
('lesson-1', 'relational-database-design-3nf', 'Relational Database Normalization (1NF, 2NF, 3NF)', 'Master database normalization rules to eliminate redundancy, avoid update anomalies, and enforce foreign key integrity.', 'Databases', 'Intermediate', '20 mins', 'Understanding First, Second, and Third Normal Form is essential for any production relational database.', 'CREATE TABLE orders (\n    id VARCHAR(36) PRIMARY KEY,\n    user_id VARCHAR(36) NOT NULL,\n    total_amount DECIMAL(10,2) NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    FOREIGN KEY (user_id) REFERENCES users(id)\n);', 'sql', TRUE),
('lesson-2', 'express-typescript-rest-architecture', 'Clean Architecture in Express & TypeScript', 'Build scalable RESTful API services with typed request handlers, input validation, and structured error boundaries.', 'Backend API', 'Intermediate', '25 mins', 'Structuring controllers, services, and repositories cleanly in Express.', 'import express, { Request, Response, NextFunction } from "express";\n\nexport const getProjects = async (req: Request, res: Response, next: NextFunction) => {\n  try {\n    const projects = await projectService.getAll();\n    res.json({ success: true, data: projects });\n  } catch (error) {\n    next(error);\n  }\n};', 'typescript', TRUE);

-- 7. Services
INSERT INTO services (id, title, tagline, description, icon_name, deliverables_json, workflow_steps_json, tech_stack_json) VALUES
('srv-1', 'Full-Stack Web Engineering', 'Modern, high-performance web applications built with TypeScript, React, and Express.', 'End-to-end development of responsive web applications with clean architecture and maintainable codebases.', 'Code2', '["Responsive SPA/SSR Frontend", "RESTful API Backend", "Type-safe Contracts", "Comprehensive Documentation"]', '["Requirements & Architecture Design", "Interactive UI/UX Prototyping", "Full-Stack Development", "Verification & Deployment"]', '["TypeScript", "React", "Node.js", "Express", "Tailwind CSS"]'),
('srv-2', 'Database Design & Relational Modeling', 'Normalized SQL schemas optimized for integrity, high concurrency, and data consistency.', 'Expert relational database design (3NF), query optimization, migration scripts, and index planning.', 'Database', '["Normalized 3NF Schema", "Migration & Seeding Scripts", "Index Strategy", "ERD Diagrams"]', '["Data Requirements Audit", "Entity-Relationship Modeling", "Normalization to 3NF", "Performance & Index Tuning"]', '["MySQL", "PostgreSQL", "SQLite", "Prisma", "Drizzle"]');
