export interface MediaAsset {
  src: string;
  alt: string;
  isTemporary: boolean;
  caption?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'live' | 'demo' | 'docs';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  category: 'Full-Stack' | 'Frontend' | 'Backend' | 'Automation' | 'Systems';
  status: 'Completed' | 'Active Development' | 'Prototype';
  images: MediaAsset[];
  videoUrl?: string;
  links: ProjectLink[];
  createdDate: string;
  featured: boolean;
  architectureOverview?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  country: string;
  avatarUrl: string;
  rating: number;
  type: 'student' | 'client' | 'peer';
  quote: string;
  projectOrCourse: string;
  verified: boolean;
  date: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  workflow: string[];
  status: 'Available' | 'Waitlist' | 'Selective';
  emoji?: string;
  imageUrl?: string;
  imageAlt?: string;
  priceEstimate?: string;
  turnaround?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    description?: string;
    tags?: string[];
  }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage: MediaAsset;
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    role: string;
  };
}

export interface JourneyEntry {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  category: 'Education' | 'Milestone' | 'Technical' | 'Product' | 'Education & Community';
  description: string;
  highlights: string[];
  tags: string[];
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation?: string;
}

export interface LessonResource {
  title: string;
  url: string;
  type: 'documentation' | 'repository' | 'article' | 'tool';
}

export type TechLessonCategory = 
  | 'All'
  | 'AI & LLM Engineering'
  | 'Web Development'
  | 'Python & Data Science'
  | 'C++ & Systems'
  | 'DevOps & Cloud'
  | 'Databases';

export interface TechLesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'AI & LLM Engineering' | 'Web Development' | 'Python & Data Science' | 'C++ & Systems' | 'DevOps & Cloud' | 'Databases';
  subcategory?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  tags: string[];
  thumbnail: MediaAsset;
  videoUrl?: string;
  objectives: string[];
  content: string;
  codeExamples: CodeExample[];
  resources: LessonResource[];
  author: {
    name: string;
    role: string;
  };
  status: 'Published' | 'Draft';
  publishedAt: string;
  updatedAt: string;
}

export interface AILesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  tags: string[];
  thumbnail: MediaAsset;
  videoUrl?: string;
  content: string;
  resources: LessonResource[];
  author?: {
    name: string;
    role: string;
  };
  status: 'Published' | 'Draft';
  publishedAt: string;
  updatedAt: string;
  isPlaceholder?: boolean;
  placeholderNotice?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  deadline: string;
  message: string;
}

export type ContactSubmission = ContactFormData;

export interface ContactFormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
