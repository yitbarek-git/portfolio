import { mockProjects } from '../data/projects';
import { Project } from '../types';

export const projectsService = {
  async getAll(params?: { category?: string; search?: string }): Promise<Project[]> {
    try {
      const url = new URL('/api/projects', window.location.origin);
      if (params?.category) url.searchParams.set('category', params.category);
      if (params?.search) url.searchParams.set('search', params.search);

      const res = await fetch(url.toString());
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback to mock data
    }

    let results = [...mockProjects];
    if (params?.category && params.category !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === params.category?.toLowerCase());
    }
    if (params?.search) {
      const query = params.search.toLowerCase();
      results = results.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.technologies.some(t => t.toLowerCase().includes(query))
      );
    }
    return results;
  },

  async getFeatured(): Promise<Project[]> {
    try {
      const res = await fetch('/api/projects?featured=true');
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }
    return mockProjects.filter(p => p.featured);
  },

  async getBySlug(slug: string): Promise<Project | null> {
    try {
      const res = await fetch(`/api/projects/${slug}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }
    return mockProjects.find(p => p.slug === slug || p.id === slug) || null;
  },

  async getRelated(currentSlug: string, category: string): Promise<Project[]> {
    const all = await this.getAll();
    return all
      .filter(p => p.slug !== currentSlug && (p.category === category || p.featured))
      .slice(0, 2);
  },

  async create(project: Partial<Project>): Promise<Project> {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error('Failed to create project');
    const json = await res.json();
    return json.data;
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error('Failed to update project');
    const json = await res.json();
    return json.data;
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete project');
  }
};
