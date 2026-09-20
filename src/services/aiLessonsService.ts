import { mockAILessons } from '../data/aiLessons';
import { AILesson } from '../types';

export const aiLessonsService = {
  async getAll(params?: { category?: string; search?: string }): Promise<AILesson[]> {
    try {
      const url = new URL('/api/ai-lessons', window.location.origin);
      if (params?.category) url.searchParams.set('category', params.category);
      if (params?.search) url.searchParams.set('search', params.search);

      const res = await fetch(url.toString());
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }

    let results = [...mockAILessons];
    if (params?.category && params.category !== 'All') {
      results = results.filter(l => l.category.toLowerCase() === params.category?.toLowerCase());
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

  async getBySlug(slug: string): Promise<AILesson | null> {
    try {
      const res = await fetch(`/api/ai-lessons/${slug}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }
    return mockAILessons.find(l => l.slug === slug || l.id === slug) || null;
  },

  async getCategories(): Promise<string[]> {
    const all = await this.getAll();
    return Array.from(new Set(all.map(l => l.category)));
  },

  async create(lesson: Partial<AILesson>): Promise<AILesson> {
    const res = await fetch('/api/ai-lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson),
    });
    if (!res.ok) throw new Error('Failed to create AI lesson');
    const json = await res.json();
    return json.data;
  },

  async update(id: string, lesson: Partial<AILesson>): Promise<AILesson> {
    const res = await fetch(`/api/ai-lessons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson),
    });
    if (!res.ok) throw new Error('Failed to update AI lesson');
    const json = await res.json();
    return json.data;
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`/api/ai-lessons/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete AI lesson');
  }
};
