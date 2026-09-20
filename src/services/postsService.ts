import { mockPosts } from '../data/posts';
import { BlogPost } from '../types';

export const postsService = {
  async getAll(params?: { category?: string; tag?: string; search?: string }): Promise<BlogPost[]> {
    try {
      const url = new URL('/api/blog', window.location.origin);
      if (params?.category) url.searchParams.set('category', params.category);
      if (params?.tag) url.searchParams.set('tag', params.tag);
      if (params?.search) url.searchParams.set('search', params.search);

      const res = await fetch(url.toString());
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }

    let results = [...mockPosts];
    if (params?.category && params.category !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === params.category?.toLowerCase());
    }
    if (params?.tag) {
      results = results.filter(p => p.tags.includes(params.tag!));
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      results = results.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return results;
  },

  async getLatest(limit = 3): Promise<BlogPost[]> {
    const all = await this.getAll();
    return all.slice(0, limit);
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }
    return mockPosts.find(p => p.slug === slug || p.id === slug) || null;
  },

  async getRelated(currentSlug: string, category: string): Promise<BlogPost[]> {
    const all = await this.getAll();
    return all.filter(p => p.slug !== currentSlug).slice(0, 2);
  },

  async create(post: Partial<BlogPost>): Promise<BlogPost> {
    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Failed to create blog post');
    const json = await res.json();
    return json.data;
  },

  async update(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const res = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error('Failed to update blog post');
    const json = await res.json();
    return json.data;
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete blog post');
  }
};
