export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const aiAssistantService = {
  async sendMessage(prompt: string, history: ChatMessage[] = []): Promise<string> {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          history: history.map(h => ({ role: h.role, content: h.content }))
        })
      });

      if (res.ok) {
        const json = await res.json();
        return json.reply;
      }
    } catch {
      // Fallback
    }

    return "I am the engineering assistant for Yitbarek's platform. Yitbarek builds high-performance full-stack web applications with React 19, TypeScript, Express, and normalized 3NF MySQL databases.";
  }
};
