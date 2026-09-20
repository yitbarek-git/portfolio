import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Trash2, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Database, 
  Code2, 
  GraduationCap, 
  Cpu, 
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { aiAssistantService, ChatMessage } from '../../services/aiAssistantService';

type AssistantMode = 'general' | 'schema' | 'code' | 'curriculum' | 'architecture';

interface ModeOption {
  id: AssistantMode;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  prompts: string[];
}

const MODES: ModeOption[] = [
  {
    id: 'general',
    label: 'Senior Tech Mentor',
    icon: <Sparkles className="w-3.5 h-3.5" />,
    placeholder: 'Ask any technical or engineering question...',
    prompts: [
      'What is Yitbarek’s full-stack engineering stack?',
      'Walk me through the 20k+ students teaching track record',
      'Explain how BDU software engineering foundations shaped Yitbarek’s work'
    ]
  },
  {
    id: 'schema',
    label: '3NF Schema Generator',
    icon: <Database className="w-3.5 h-3.5" />,
    placeholder: 'Ask for a 3NF relational schema (e.g. e-commerce, LMS, ride-sharing)...',
    prompts: [
      'Generate a 3NF schema for an E-Commerce store with orders and items',
      'Explain 1NF to 3NF normalization rules with practical examples',
      'How to optimize queries using B-Tree compound indexes in PostgreSQL'
    ]
  },
  {
    id: 'code',
    label: 'Code & Systems Explainer',
    icon: <Code2 className="w-3.5 h-3.5" />,
    placeholder: 'Ask for code in TypeScript, Python, C++, SQL, or Docker...',
    prompts: [
      'Show an async FastAPI microservice in Python with Pydantic',
      'Explain C++ RAII and unique_ptr memory management',
      'Show an optimized multi-stage Node.js Dockerfile'
    ]
  },
  {
    id: 'curriculum',
    label: 'Learning Roadmaps',
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    placeholder: 'Ask for beginner-to-advanced learning roadmaps...',
    prompts: [
      'What is the beginner-to-advanced roadmap for AI Engineering & RAG?',
      'Recommended step-by-step path for Full-Stack Web Development',
      'How to transition from Python basics to high-performance microservices'
    ]
  },
  {
    id: 'architecture',
    label: 'Architecture & System Design',
    icon: <Cpu className="w-3.5 h-3.5" />,
    placeholder: 'Ask about high-throughput system design & API patterns...',
    prompts: [
      'How does pessimistic row locking prevent race conditions in inventory?',
      'Explain RAG architecture with pgvector vector embeddings',
      'Compare Express 3-tier architecture with monolithic vs microservices'
    ]
  }
];

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeMode, setActiveMode] = useState<AssistantMode>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm the **Senior AI Technical Assistant & Mentor** on Yitbarek's platform.

I can help you with:
- **3NF Relational Database Design** (generate SQL DDL schemas on demand)
- **Full-Stack Web Architecture** (React 19, TypeScript, Express, FastAPI)
- **C++ Memory & Systems Programming** (RAII, smart pointers, data structures)
- **Applied AI & RAG Systems** (vector search, embeddings, function calling)
- **Tailored Learning Roadmaps** (Beginner to Advanced breakdown)

Choose a specialized mode above or ask any engineering question below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentModeConfig = MODES.find(m => m.id === activeMode) || MODES[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    let contextualPrompt = text;
    if (activeMode === 'schema' && !text.toLowerCase().includes('schema') && !text.toLowerCase().includes('sql')) {
      contextualPrompt = `[Specialized Mode: 3NF Database Schema Generator] ${text}`;
    } else if (activeMode === 'curriculum' && !text.toLowerCase().includes('roadmap') && !text.toLowerCase().includes('learn')) {
      contextualPrompt = `[Specialized Mode: Learning Curriculum & Roadmap] ${text}`;
    } else if (activeMode === 'code') {
      contextualPrompt = `[Specialized Mode: Code Implementation & Explainer] ${text}`;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const reply = await aiAssistantService.sendMessage(contextualPrompt, messages);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an issue processing your query. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        role: 'assistant',
        content: "Conversation history cleared. Ready for your technical questions or schema generation requests.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open AI Engineering Assistant"
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#18181B] text-[#D4A72C] border border-[#D4A72C]/40 shadow-xl hover:border-[#D4A72C] hover:shadow-2xl hover:scale-105 transition-all duration-200"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-5 h-5 animate-pulse text-[#D4A72C]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#18181B]" />
          </div>
          <div className="text-left">
            <span className="text-xs font-mono font-bold tracking-wide text-white group-hover:text-[#D4A72C] transition-colors block">
              AI Senior Assistant
            </span>
            <span className="text-[10px] font-mono text-[var(--color-muted)] block">
              Ask 3NF, Code & Roadmaps
            </span>
          </div>
        </button>
      </div>

      {/* Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full flex flex-col rounded-t-[var(--radius-2xl)] sm:rounded-[var(--radius-2xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden transition-all duration-300 ${
              isMaximized 
                ? 'sm:max-w-4xl h-[94vh]' 
                : 'sm:max-w-2xl h-[85vh] sm:h-[700px]'
            }`}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--color-text)]">
                      AI Engineering Assistant & Mentor
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#D4A72C]/10 text-[#D4A72C] border border-[#D4A72C]/30 font-semibold">
                      Gemini 3.7 Pro
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--color-muted)] font-mono flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>3NF Schemas • Full-Stack • AI • C++ • Python • DevOps</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? "Minimize window" : "Maximize window"}
                  className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-md hover:bg-[var(--color-surface-hover)] transition-colors hidden sm:block"
                >
                  {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleClear}
                  title="Clear chat history"
                  className="p-1.5 text-[var(--color-muted)] hover:text-rose-500 rounded-md hover:bg-[var(--color-surface-hover)] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded-md hover:bg-[var(--color-surface-hover)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Specialized Mode Tabs */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)] overflow-x-auto scrollbar-none">
              {MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-colors border ${
                    activeMode === mode.id
                      ? 'bg-[#D4A72C]/15 border-[#D4A72C] text-[#D4A72C] font-bold shadow-sm'
                      : 'bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-[var(--radius-lg)] p-4 leading-relaxed relative group ${
                      msg.role === 'user'
                        ? 'bg-[#D4A72C] text-[#121214] font-medium'
                        : 'bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)] shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed">
                      {msg.content}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5 dark:border-white/5 text-[10px] font-mono">
                      <span className={msg.role === 'user' ? 'text-[#121214]/70' : 'text-[var(--color-muted)]'}>
                        {msg.timestamp}
                      </span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="flex items-center gap-1 text-[var(--color-muted)] hover:text-[#D4A72C] transition-colors"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-7 h-7 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-xs font-mono text-[var(--color-muted)] ml-2">
                      Synthesizing architecture & code solutions...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Suggestion Chips for current mode */}
            <div className="px-4 py-2.5 bg-[var(--color-bg)]/80 border-t border-[var(--color-border)] overflow-x-auto scrollbar-none flex gap-2">
              {currentModeConfig.prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="whitespace-nowrap text-[11px] font-mono px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[#D4A72C] hover:text-[#D4A72C] transition-colors shrink-0 disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#D4A72C]" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={currentModeConfig.placeholder}
                disabled={isLoading}
                className="flex-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-xs sm:text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[#D4A72C] transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-3 rounded-[var(--radius-md)] bg-[#D4A72C] text-[#121214] font-bold text-xs sm:text-sm hover:bg-[#E5B83B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
