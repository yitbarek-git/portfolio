-- ==============================================================================
-- YITBAREK.K Portfolio & Learning Platform — Relational Database Schema (3NF)
-- Target RDBMS: MySQL 8.0+ / PostgreSQL 14+ compatible
-- Normalized to Third Normal Form (3NF)
-- ==============================================================================

-- 1. System Administration & Users
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Project Categories
CREATE TABLE IF NOT EXISTS project_categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Projects (Core Portfolio Entities)
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    category_name VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Production Ready',
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    architecture_overview TEXT,
    problem_statement TEXT,
    solution_statement TEXT,
    featured_image_url VARCHAR(255),
    featured_image_alt VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_project_featured (featured),
    INDEX idx_project_category (category_name),
    INDEX idx_project_slug (slug)
);

-- 4. Project Technologies (Normalized Many-to-Many Bridge)
CREATE TABLE IF NOT EXISTS technologies (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(30) NOT NULL DEFAULT 'Core',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_technologies (
    project_id VARCHAR(36) NOT NULL,
    technology_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (project_id, technology_name),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 5. Project Feature Points
CREATE TABLE IF NOT EXISTS project_features (
    id VARCHAR(36) PRIMARY KEY,
    project_id VARCHAR(36) NOT NULL,
    feature_text VARCHAR(255) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 6. Blog Posts & Technical Articles
CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    excerpt TEXT NOT NULL,
    content MEDIUMTEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    read_time VARCHAR(20) NOT NULL DEFAULT '5 min read',
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    featured_image_url VARCHAR(255),
    featured_image_alt VARCHAR(255),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_blog_slug (slug),
    INDEX idx_blog_featured (featured)
);

-- 7. Blog Tags (Many-to-Many)
CREATE TABLE IF NOT EXISTS blog_tags (
    post_id VARCHAR(36) NOT NULL,
    tag_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (post_id, tag_name),
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
);

-- 8. Tech Lessons (Curriculum & Code Tutorials)
CREATE TABLE IF NOT EXISTS tech_lessons (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'Intermediate',
    estimated_time VARCHAR(20) NOT NULL DEFAULT '15 mins',
    summary TEXT,
    code_snippet TEXT,
    code_language VARCHAR(30) DEFAULT 'typescript',
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tech_lesson_slug (slug)
);

CREATE TABLE IF NOT EXISTS tech_lesson_objectives (
    id VARCHAR(36) PRIMARY KEY,
    lesson_id VARCHAR(36) NOT NULL,
    objective_text VARCHAR(255) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (lesson_id) REFERENCES tech_lessons(id) ON DELETE CASCADE
);

-- 9. AI Lessons (Curriculum & AI Concepts)
CREATE TABLE IF NOT EXISTS ai_lessons (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'Intermediate',
    estimated_time VARCHAR(20) NOT NULL DEFAULT '20 mins',
    summary TEXT,
    code_snippet TEXT,
    code_language VARCHAR(30) DEFAULT 'typescript',
    is_placeholder BOOLEAN NOT NULL DEFAULT FALSE,
    placeholder_notice VARCHAR(255),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_ai_lesson_slug (slug)
);

CREATE TABLE IF NOT EXISTS ai_lesson_objectives (
    id VARCHAR(36) PRIMARY KEY,
    lesson_id VARCHAR(36) NOT NULL,
    objective_text VARCHAR(255) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (lesson_id) REFERENCES ai_lessons(id) ON DELETE CASCADE
);

-- 10. Services & Engineering Offerings
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(50) NOT NULL DEFAULT 'Code2',
    deliverables_json JSON,
    workflow_steps_json JSON,
    tech_stack_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 11. Engineering Journey Milestones
CREATE TABLE IF NOT EXISTS journey_milestones (
    id VARCHAR(36) PRIMARY KEY,
    year VARCHAR(20) NOT NULL,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    achievements_json JSON,
    icon_name VARCHAR(50) NOT NULL DEFAULT 'CheckCircle2',
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. Contact Inquiries & Client Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    project_type VARCHAR(60) NOT NULL,
    budget VARCHAR(60) NOT NULL,
    deadline VARCHAR(60),
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'unread', -- unread, reviewed, replied, archived
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    INDEX idx_contact_status (status)
);

-- 13. AI Knowledge Base & Context Store
CREATE TABLE IF NOT EXISTS ai_knowledge_base (
    id VARCHAR(36) PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    content MEDIUMTEXT NOT NULL,
    keywords VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
