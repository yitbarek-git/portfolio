import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Brain,
  Layers,
  Terminal,
  Database,
  Cpu,
  FileText,
  Map,
  ArrowRight,
  Sparkles,
  Download,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const CurriculumTabsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roadmaps' | 'ai' | 'languages'>('roadmaps');

  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4A72C] uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>📚 Developer Curriculum & Handbooks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
            Curated Roadmaps, AI Lessons & Handbooks
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 max-w-xl">
            Practical engineering knowledge for learners and professional developers. Zero fluff, fully verified code implementations.
          </p>
        </div>

        {/* Tab Selector Controls */}
        <div className="flex items-center p-1 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] self-start md:self-auto">
          <button
            onClick={() => setActiveTab('roadmaps')}
            className={`px-3 sm:px-4 py-2 rounded-[var(--radius-md)] text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'roadmaps'
                ? 'bg-[#D4A72C] text-[#0B0B0C] shadow-xs'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <span>🗺️</span>
            <span>Roadmaps & PDF</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 sm:px-4 py-2 rounded-[var(--radius-md)] text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'bg-[#D4A72C] text-[#0B0B0C] shadow-xs'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <span>🤖</span>
            <span>AI Systems</span>
          </button>
          <button
            onClick={() => setActiveTab('languages')}
            className={`px-3 sm:px-4 py-2 rounded-[var(--radius-md)] text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'languages'
                ? 'bg-[#D4A72C] text-[#0B0B0C] shadow-xs'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <span>⚡</span>
            <span>Languages & DBs</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ROADMAPS & HANDBOOKS */}
      {activeTab === 'roadmaps' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          <Link to="/resources" className="block group">
            <Card hoverEffect padding="none" className="h-full overflow-hidden flex flex-col justify-between border-[var(--color-border)] group-hover:border-[#D4A72C]/50 transition-colors">
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
                  alt="Full-Stack Web Dev Roadmap visual preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl">🗺️</span>
                  <Badge variant="gold" size="sm">2026 Master</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-[#D4A72C] transition-colors">
                    Full-Stack Web Dev Roadmap
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Comprehensive 6-phase master curriculum: HTML5 semantics, modern CSS/Tailwind, JavaScript ESNext, TypeScript strict types, React 19, and cloud deployment.
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-[#D4A72C] flex items-center gap-1 border-t border-[var(--color-border)]/50">
                  Explore Full Roadmap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/resources" className="block group">
            <Card hoverEffect padding="none" className="h-full overflow-hidden flex flex-col justify-between border-[var(--color-border)] group-hover:border-emerald-500/50 transition-colors">
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
                  alt="Python Engineering Handbook PDF cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl">📄</span>
                  <Badge variant="outline" size="sm">48-Page PDF</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-emerald-400 transition-colors">
                    Python Engineering Handbook
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Master Asyncio event loops, FastAPI microservices scaffolds, Pydantic v2 validation, and 3NF SQL integration. Ready to read and print.
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1 border-t border-[var(--color-border)]/50">
                  Read & Download Handbook <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/resources" className="block group">
            <Card hoverEffect padding="none" className="h-full overflow-hidden flex flex-col justify-between border-[var(--color-border)] group-hover:border-purple-500/50 transition-colors">
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80"
                  alt="3NF Database Normalization schema preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl">💾</span>
                  <Badge variant="outline" size="sm">SQL Cheat Sheet</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-purple-400 transition-colors">
                    3NF Database Normalization
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Eliminate anomalies, enforce composite key dependencies, design BCNF/3NF tables, and optimize PostgreSQL queries with EXPLAIN.
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-purple-400 flex items-center gap-1 border-t border-[var(--color-border)]/50">
                  Read SQL Schema Reference <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}

      {/* TAB 2: AI ENGINEERING LESSONS */}
      {activeTab === 'ai' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          <Link to="/ai-lessons/multimodal-vision-and-audio-pipelines" className="block group">
            <Card hoverEffect padding="none" className="h-full overflow-hidden flex flex-col justify-between border-[var(--color-border)] group-hover:border-amber-400/50 transition-colors">
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                  alt="Multimodal Vision & Audio Pipelines preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl">👁️</span>
                  <Badge variant="gold" size="sm">Applied AI</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-amber-400 transition-colors">
                    Multimodal Vision & Audio Pipelines
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Processing continuous real-time audio streams, vision frame extraction, and structured output formatting for everyday tools.
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-[#D4A72C] flex items-center gap-1 border-t border-[var(--color-border)]/50">
                  Explore Lesson <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/ai-lessons/retrieval-augmented-generation-pipeline-design" className="block group">
            <Card hoverEffect padding="none" className="h-full overflow-hidden flex flex-col justify-between border-[var(--color-border)] group-hover:border-sky-400/50 transition-colors">
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80"
                  alt="RAG & Dense Vector Systems preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl">🧠</span>
                  <Badge variant="outline" size="sm">pgvector RAG</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-sky-400 transition-colors">
                    RAG & Dense Vector Systems
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Chunking strategy, cosine similarity, pgvector indexing, and grounding hallucination prevention architectures.
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-sky-400 flex items-center gap-1 border-t border-[var(--color-border)]/50">
                  Explore Lesson <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/ai-lessons/tool-calling-and-agentic-execution-loops" className="block group">
            <Card hoverEffect padding="none" className="h-full overflow-hidden flex flex-col justify-between border-[var(--color-border)] group-hover:border-emerald-400/50 transition-colors">
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
                  alt="Autonomous Tool Agents preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl">🤖</span>
                  <Badge variant="outline" size="sm">Autonomous Agents</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-emerald-400 transition-colors">
                    Autonomous Tool Agents
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Function calling schema binding, execution loops, state machine fallbacks, and deterministic error mitigation.
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1 border-t border-[var(--color-border)]/50">
                  Explore Lesson <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}

      {/* TAB 3: CORE LANGUAGES & DATABASES */}
      {activeTab === 'languages' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          <Link to="/tech-lessons/python-concurrency-asyncio-pipelines" className="block group">
            <Card hoverEffect padding="none" className="h-full overflow-hidden flex flex-col justify-between border-[var(--color-border)] group-hover:border-emerald-400/50 transition-colors">
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
                  alt="Python Concurrency & Asyncio preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl">🐍</span>
                  <Badge variant="outline" size="sm">Python 3.12</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-emerald-400 transition-colors">
                    Python Concurrency & Asyncio
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Non-blocking I/O event loops, FastAPI worker pools, thread pool execution, and resilient queue processing.
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1 border-t border-[var(--color-border)]/50">
                  View Python Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/tech-lessons/cpp-memory-management-pointers-stl" className="block group">
            <Card hoverEffect padding="none" className="h-full overflow-hidden flex flex-col justify-between border-[var(--color-border)] group-hover:border-sky-400/50 transition-colors">
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
                  alt="C++ Systems & Memory Safety preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl">⚙️</span>
                  <Badge variant="outline" size="sm">Low-Level Systems</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-sky-400 transition-colors">
                    C++ Systems & Memory Safety
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Heap vs. stack allocation, pointer arithmetic, RAII lifetime guards, and custom memory arena allocators.
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-sky-400 flex items-center gap-1 border-t border-[var(--color-border)]/50">
                  View C++ Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/tech-lessons/3nf-relational-database-normalization" className="block group">
            <Card hoverEffect padding="none" className="h-full overflow-hidden flex flex-col justify-between border-[var(--color-border)] group-hover:border-purple-400/50 transition-colors">
              <div className="relative h-36 w-full overflow-hidden bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80"
                  alt="3NF Relational Normalization preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xl">🐘</span>
                  <Badge variant="outline" size="sm">PostgreSQL</Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-purple-400 transition-colors">
                    3NF Relational Normalization
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    First, Second, and Third Normal Forms. Eliminating insert/update anomalies and optimizing foreign key indexes.
                  </p>
                </div>
                <div className="pt-2 text-xs font-semibold text-purple-400 flex items-center gap-1 border-t border-[var(--color-border)]/50">
                  View Database Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}
    </section>
  );
};
