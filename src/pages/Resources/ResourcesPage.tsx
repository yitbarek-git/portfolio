import React, { useState } from 'react';
import { Container } from '../../components/common/Container';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { developerResources, DeveloperResource } from '../../data/resources';
import { useSEO } from '../../hooks/useSEO';
import { useToast } from '../../context/ToastContext';
import {
  BookOpen,
  FileText,
  Map,
  Code2,
  Download,
  Copy,
  Check,
  Sparkles,
  Database,
  Terminal,
  Layers,
  ArrowRight,
  Printer,
  ChevronDown,
  ChevronUp,
  Cpu,
  Globe,
  ExternalLink
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  useSEO({
    title: 'Developer Resources, Handbooks & Roadmaps — Yitbarek K.',
    description: 'Engineering roadmaps, Python engineering PDF handbook, 3NF database normalization cheat sheets, and production API starter kits by Yitbarek K.',
    keywords: 'Python PDF Handbook, Full-Stack Web Development Roadmap, 3NF Database Cheat Sheet, Backend Engineering, Developer Resources'
  });

  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeResourceId, setActiveResourceId] = useState<string>(developerResources[0].id);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    '0': true,
    '1': true
  });

  const categories = [
    { label: 'All Resources', value: 'All', emoji: '📚' },
    { label: 'Engineering Roadmaps', value: 'Roadmap', emoji: '🗺️' },
    { label: 'PDF Handbooks', value: 'PDF Handbook', emoji: '📖' },
    { label: 'Cheat Sheets', value: 'Cheat Sheet', emoji: '⚡' },
    { label: 'Starter Kits', value: 'Starter Kit', emoji: '📦' }
  ];

  const getResourceEmoji = (category: string) => {
    switch (category) {
      case 'Roadmap': return '🗺️';
      case 'PDF Handbook': return '📖';
      case 'Cheat Sheet': return '⚡';
      case 'Starter Kit': return '📦';
      default: return '📄';
    }
  };

  const filteredResources = developerResources.filter((res) => {
    const matchesCat = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.technology.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeResource = developerResources.find((r) => r.id === activeResourceId) || developerResources[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(id);
    showToast('Code snippet copied to clipboard!', 'success');
    setTimeout(() => {
      setCopiedSnippetIndex(null);
    }, 2000);
  };

  const handlePrintDownload = () => {
    window.print();
    showToast(`Prepared "${activeResource.title}" for download/print.`, 'info');
  };

  const toggleSection = (idx: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="xl">
        <SectionHeading
          badgeText="Engineering Resources & Architecture"
          title="Developer Handbooks, Roadmaps & Cheat Sheets"
          subtitle="Production-grade references crafted for developers: Python microservices handbook, full-stack web engineering roadmaps, and 3NF SQL database normalization guides."
        />

        {/* Top Feature Banners with Visual Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            onClick={() => setActiveResourceId('res-webdev-roadmap')}
            className={`overflow-hidden rounded-[var(--radius-lg)] border transition-all cursor-pointer group flex flex-col justify-between ${
              activeResourceId === 'res-webdev-roadmap'
                ? 'bg-[var(--color-surface)] border-[#D4A72C] shadow-md ring-1 ring-[#D4A72C]/50'
                : 'bg-[var(--color-surface)]/60 border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
            }`}
          >
            <div className="h-28 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
                alt="Full-Stack Web Dev Roadmap"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/40 to-transparent" />
              <div className="absolute top-2.5 right-2.5">
                <Badge variant="gold" size="sm">2026 Master Guide</Badge>
              </div>
              <div className="absolute bottom-2 left-3 flex items-center gap-2">
                <span className="text-xl">🗺️</span>
                <span className="text-xs font-mono font-bold text-[#D4A72C] bg-[var(--color-surface)]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                  Full-Stack
                </span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-[var(--color-text)] group-hover:text-[#D4A72C] transition-colors">
                Full-Stack Web Dev Roadmap
              </h3>
              <p className="text-xs text-[var(--color-muted)] line-clamp-2">
                HTML5, CSS3, ESNext, TypeScript, React 19, Express, 3NF DBs & DevOps.
              </p>
            </div>
          </div>

          <div
            onClick={() => setActiveResourceId('res-python-handbook')}
            className={`overflow-hidden rounded-[var(--radius-lg)] border transition-all cursor-pointer group flex flex-col justify-between ${
              activeResourceId === 'res-python-handbook'
                ? 'bg-[var(--color-surface)] border-[#D4A72C] shadow-md ring-1 ring-[#D4A72C]/50'
                : 'bg-[var(--color-surface)]/60 border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
            }`}
          >
            <div className="h-28 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
                alt="Python Engineering Handbook"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/40 to-transparent" />
              <div className="absolute top-2.5 right-2.5">
                <Badge variant="outline" size="sm">48-Page PDF</Badge>
              </div>
              <div className="absolute bottom-2 left-3 flex items-center gap-2">
                <span className="text-xl">📖</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-[var(--color-surface)]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                  Python 3.12+
                </span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-[var(--color-text)] group-hover:text-[#D4A72C] transition-colors">
                Python Engineering Handbook
              </h3>
              <p className="text-xs text-[var(--color-muted)] line-clamp-2">
                Asyncio, FastAPI microservices, Pydantic v2, protocols & SQL integration.
              </p>
            </div>
          </div>

          <div
            onClick={() => setActiveResourceId('res-3nf-cheatsheet')}
            className={`overflow-hidden rounded-[var(--radius-lg)] border transition-all cursor-pointer group flex flex-col justify-between ${
              activeResourceId === 'res-3nf-cheatsheet'
                ? 'bg-[var(--color-surface)] border-[#D4A72C] shadow-md ring-1 ring-[#D4A72C]/50'
                : 'bg-[var(--color-surface)]/60 border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
            }`}
          >
            <div className="h-28 w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80"
                alt="3NF Database Normalization"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/40 to-transparent" />
              <div className="absolute top-2.5 right-2.5">
                <Badge variant="outline" size="sm">SQL Reference</Badge>
              </div>
              <div className="absolute bottom-2 left-3 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <span className="text-xs font-mono font-bold text-sky-400 bg-[var(--color-surface)]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                  PostgreSQL
                </span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-[var(--color-text)] group-hover:text-[#D4A72C] transition-colors">
                3NF Database Normalization
              </h3>
              <p className="text-xs text-[var(--color-muted)] line-clamp-2">
                1NF, 2NF, 3NF rules, schema patterns, and ACID query optimization.
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#D4A72C] text-[#0B0B0C] font-semibold shadow-2xs'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search resources, topics, SQL..."
            />
          </div>
        </div>

        {/* Main Content Layout: Left Sidebar selector + Right Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Resource List */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)] px-1">
              Available Guides ({filteredResources.length})
            </h3>

            <div className="space-y-2">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  onClick={() => setActiveResourceId(resource.id)}
                  className={`p-4 rounded-[var(--radius-md)] border text-left transition-all cursor-pointer ${
                    activeResourceId === resource.id
                      ? 'bg-[var(--color-surface)] border-[#D4A72C] shadow-sm'
                      : 'bg-[var(--color-surface)]/50 border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono text-[#D4A72C] flex items-center gap-1">
                      <span>{getResourceEmoji(resource.category)}</span>
                      <span>{resource.category}</span>
                    </span>
                    {resource.fileSize && (
                      <span className="text-[10px] font-mono text-[var(--color-muted)] bg-[var(--color-bg)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">
                        {resource.fileSize}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[var(--color-text)] leading-snug">
                    {resource.title}
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] mt-1 line-clamp-2">
                    {resource.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Resource Interactive Viewer */}
          <div className="lg:col-span-8">
            <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 space-y-8 shadow-[var(--shadow-card)]">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="gold">{activeResource.category}</Badge>
                    <span className="text-xs font-mono text-[var(--color-muted)]">
                      {activeResource.technology}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
                    {activeResource.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                    {activeResource.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={handlePrintDownload}
                    variant="primary"
                    size="sm"
                    leftIcon={<Printer className="w-4 h-4" />}
                  >
                    Save / Print PDF
                  </Button>
                </div>
              </div>

              {/* Sections Breakdown */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[var(--color-text)] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#D4A72C]" />
                    <span>Curriculum & Architecture Modules</span>
                  </h3>
                  <span className="text-xs font-mono text-[var(--color-muted)]">
                    {activeResource.sections.length} Modules Detailed
                  </span>
                </div>

                <div className="space-y-4">
                  {activeResource.sections.map((sec, idx) => {
                    const isExpanded = expandedSections[String(idx)] !== false;
                    return (
                      <div
                        key={idx}
                        className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden transition-all"
                      >
                        {/* Section Header Accordion */}
                        <div
                          onClick={() => toggleSection(String(idx))}
                          className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-[var(--color-surface-hover)] transition-colors select-none"
                        >
                          <div className="space-y-1 pr-4">
                            <h4 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-[#D4A72C]/10 text-[#D4A72C] text-xs font-mono flex items-center justify-center font-bold">
                                {idx + 1}
                              </span>
                              {sec.title}
                            </h4>
                            <p className="text-xs text-[var(--color-muted)] pl-8">
                              {sec.description}
                            </p>
                          </div>

                          <button className="text-[var(--color-muted)] hover:text-[var(--color-text)]">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Section Content */}
                        {isExpanded && (
                          <div className="p-4 sm:p-5 pt-0 border-t border-[var(--color-border)]/60 space-y-4 mt-2">
                            {/* Key Topics List */}
                            <div className="space-y-2 pt-2">
                              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-text-secondary)] block">
                                Core Competencies & Architecture Patterns:
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {sec.topics.map((t, tIdx) => (
                                  <div
                                    key={tIdx}
                                    className="flex items-start gap-2 p-2 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]"
                                  >
                                    <span className="text-[#D4A72C] font-bold">›</span>
                                    <span>{t}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Code Snippet if present */}
                            {sec.codeSnippet && (
                              <div className="space-y-2 pt-2">
                                <div className="flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
                                  <span className="flex items-center gap-1.5 text-[#D4A72C]">
                                    <Code2 className="w-3.5 h-3.5" /> Reference Implementation
                                  </span>
                                  <button
                                    onClick={() => handleCopy(sec.codeSnippet!, `code-${idx}`)}
                                    className="flex items-center gap-1 hover:text-[var(--color-text)] transition-colors cursor-pointer bg-[var(--color-surface)] px-2 py-1 rounded border border-[var(--color-border)]"
                                  >
                                    {copiedSnippetIndex === `code-${idx}` ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-400" />
                                        <span className="text-emerald-400 text-[10px]">Copied</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span className="text-[10px]">Copy Code</span>
                                      </>
                                    )}
                                  </button>
                                </div>

                                <pre className="p-4 rounded-[var(--radius-md)] bg-[#0B0B0C] border border-[#D4A72C]/20 text-[#E5E7EB] font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                                  <code>{sec.codeSnippet}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg)] border border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#D4A72C]/10 flex items-center justify-center text-[#D4A72C] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[var(--color-text)]">
                      Want Custom Architectural Consultation or Backend Scaffolding?
                    </h5>
                    <p className="text-[11px] text-[var(--color-muted)]">
                      Available for technical reviews, database normalization, and full-stack software development.
                    </p>
                  </div>
                </div>

                <a href="/contact">
                  <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Inquire Contract
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
