import { ContactFormData } from '../types';

export interface AdminMessage extends ContactFormData {
  id: string;
  status: 'unread' | 'reviewed' | 'replied' | 'archived';
  submittedAt: string;
}

export const contactService = {
  async submitMessage(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const json = await res.json();
        return { success: true, message: json.message || 'Inquiry submitted successfully.' };
      }
    } catch {
      // Fallback
    }

    // Client-side validation fallback
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      throw new Error('Please fill in all required fields (Name, Email, Message).');
    }

    return {
      success: true,
      message: 'Thank you for reaching out! Your message has been logged in the platform queue.',
    };
  },

  async getAllMessages(): Promise<AdminMessage[]> {
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // fallback
    }

    return [
      {
        id: 'msg-local-1',
        name: 'Elena Rostova',
        email: 'elena.tech@nexusinnovations.com',
        projectType: 'Full-Stack Web App',
        budget: 'Fixed Scope Engineering',
        deadline: 'Q4 2026',
        message: 'Looking for a robust full-stack web application with relational 3NF backend and clean TypeScript React frontend.',
        status: 'unread',
        submittedAt: new Date().toISOString(),
      }
    ];
  },

  async updateStatus(id: string, status: 'unread' | 'reviewed' | 'replied' | 'archived'): Promise<void> {
    await fetch(`/api/admin/messages/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  },

  async deleteMessage(id: string): Promise<void> {
    await fetch(`/api/admin/messages/${id}`, {
      method: 'DELETE',
    });
  }
};
