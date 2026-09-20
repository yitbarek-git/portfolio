import { mockTechLessons } from '../data/techLessons';
import { TechLesson } from '../types';

export const techLessonsService = {
  async getAll(params?: { category?: string; difficulty?: string; search?: string }): Promise<TechLesson[]> {
    try {
      const url = new URL('/api/tech-lessons', window.location.origin);
      if (params?.category) url.searchParams.set('category', params.category);
      if (params?.search) url.searchParams.set('search', params.search);

      const res = await fetch(url.toString());
      if (res.ok) {
        const json = await res.json();
        let items: TechLesson[] = json.data;
        if (params?.difficulty && params.difficulty !== 'All') {
          items = items.filter(l => l.difficulty.toLowerCase() === params.difficulty?.toLowerCase());
        }
        return items;
      }
    } catch {
      // fallback
    }

    let results = [...mockTechLessons];
    if (params?.category && params.category !== 'All') {
      results = results.filter(l => l.category.toLowerCase() === params.category?.toLowerCase());
    }
    if (params?.difficulty && params.difficulty !== 'All') {
      results = results.filter(l => l.difficulty.toLowerCase() === params.difficulty?.toLowerCase());
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      results = results.filter(
        l =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          (l.tags && l.tags.some(t => t.toLowerCase().includes(q)))
      );
    }
    return results;
  },

  async getCategories(): Promise<string[]> {
    const all = await this.getAll();
    return Array.from(new Set(all.map(l => l.category)));
  },

  async getBySlug(slug: string): Promise<TechLesson | null> {
    try {
      const res = await fetch(`/api/tech-lessons/${slug}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }
    return mockTechLessons.find(l => l.slug === slug || l.id === slug) || null;
  },

  async getRelated(currentSlug: string, category: string): Promise<TechLesson[]> {
    const all = await this.getAll();
    return all.filter(l => l.slug !== currentSlug).slice(0, 2);
  },

  async create(lesson: Partial<TechLesson>): Promise<TechLesson> {
    const res = await fetch('/api/tech-lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson),
    });
    if (!res.ok) throw new Error('Failed to create lesson');
    const json = await res.json();
    return json.data;
  },

  async update(id: string, lesson: Partial<TechLesson>): Promise<TechLesson> {
    const res = await fetch(`/api/tech-lessons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson),
    });
    if (!res.ok) throw new Error('Failed to update lesson');
    const json = await res.json();
    return json.data;
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`/api/tech-lessons/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete lesson');
  }
};
