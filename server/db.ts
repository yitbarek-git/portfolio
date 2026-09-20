import { mockProjects } from '../src/data/projects';
import { mockPosts } from '../src/data/posts';
import { mockTechLessons } from '../src/data/techLessons';
import { mockAILessons } from '../src/data/aiLessons';
import { mockServices } from '../src/data/services';
import { mockJourneyEntries } from '../src/data/journey';
import { mockSkillCategories } from '../src/data/skills';
import { mockTestimonials } from '../src/data/testimonials';
import { profileData } from '../src/data/profile';
import { Project, BlogPost, TechLesson, AILesson, Service, JourneyEntry, Testimonial, ContactFormData } from '../src/types';

export interface ContactMessageRecord extends ContactFormData {
  id: string;
  status: 'unread' | 'reviewed' | 'replied' | 'archived';
  submittedAt: string;
}

// In-Memory Database Store with initial seed
class MemoryDatabase {
  public projects: Project[] = JSON.parse(JSON.stringify(mockProjects));
  public blogPosts: BlogPost[] = JSON.parse(JSON.stringify(mockPosts));
  public techLessons: TechLesson[] = JSON.parse(JSON.stringify(mockTechLessons));
  public aiLessons: AILesson[] = JSON.parse(JSON.stringify(mockAILessons));
  public services: Service[] = JSON.parse(JSON.stringify(mockServices));
  public journey: JourneyEntry[] = JSON.parse(JSON.stringify(mockJourneyEntries));
  public skills = JSON.parse(JSON.stringify(mockSkillCategories));
  public testimonials: Testimonial[] = JSON.parse(JSON.stringify(mockTestimonials));
  public profile = JSON.parse(JSON.stringify(profileData));

  public contactMessages: ContactMessageRecord[] = [
    {
      id: 'msg-seed-1',
      name: 'Elena Rostova',
      email: 'elena.tech@nexusinnovations.com',
      projectType: 'Full-Stack Web App',
      budget: 'Fixed Scope Engineering',
      deadline: 'Q4 2026',
      message: 'Looking for a robust full-stack web application with relational 3NF backend and clean TypeScript React frontend. Loved your ERP portfolio project!',
      status: 'unread',
      submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'msg-seed-2',
      name: 'Marcus Vance',
      email: 'm.vance@soliddb.io',
      projectType: 'REST API & Backend',
      budget: 'Direct Consultation',
      deadline: 'Immediate',
      message: 'Need consulting on database indexing, relational normalization, and Express API query optimization.',
      status: 'reviewed',
      submittedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    }
  ];

  public resetToDefaults() {
    this.projects = JSON.parse(JSON.stringify(mockProjects));
    this.blogPosts = JSON.parse(JSON.stringify(mockPosts));
    this.techLessons = JSON.parse(JSON.stringify(mockTechLessons));
    this.aiLessons = JSON.parse(JSON.stringify(mockAILessons));
    this.services = JSON.parse(JSON.stringify(mockServices));
    this.journey = JSON.parse(JSON.stringify(mockJourneyEntries));
    this.skills = JSON.parse(JSON.stringify(mockSkillCategories));
    this.testimonials = JSON.parse(JSON.stringify(mockTestimonials));
  }
}

export const db = new MemoryDatabase();
