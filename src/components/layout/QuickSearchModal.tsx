import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FolderKanban, BookOpen, Sparkles, Layers, Compass, ArrowRight, X } from 'lucide-react';
import { mockProjects } from '../../data/projects';
import { mockPosts } from '../../data/posts';
import { mockTechLessons } from '../../data/techLessons';
import { mockAILessons } from '../../data/aiLessons';
import { mockServices } from '../../data/services';
import { developerResources } from '../../data/resources';

export interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered from parent or event
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matchedProjects = mockProjects
      .filter(p => p.title.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q)))
      .map(p => ({
        id: p.id,
        title: p.title,
        subtitle: p.category,
        url: `/projects/${p.slug}`,
        icon: <FolderKanban className="w-4 h-4 text-[#D4A72C]" />,
        section: 'Projects'
      }));

    const matchedLessons = mockTechLessons
      .filter(l => l.title.toLowerCase().includes(q) || l.tags.some(t => t.toLowerCase().includes(q)))
      .map(l => ({
        id: l.id,
        title: l.title,
        subtitle: `${l.category} • ${l.difficulty}`,
        url: `/tech-lessons/${l.slug}`,
        icon: <BookOpen className="w-4 h-4 text-blue-500" />,
        section: 'Tech Lessons'
      }));

    const matchedPosts = mockPosts
      .filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)))
      .map(p => ({
        id: p.id,
        title: p.title,
        subtitle: `${p.category} • ${p.readTime}`,
        url: `/blog/${p.slug}`,
        icon: <Layers className="w-4 h-4 text-emerald-500" />,
        section: 'Blog'
      }));

    const matchedAILessons = mockAILessons
      .filter(a => a.title.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)))
      .map(a => ({
        id: a.id,
        title: a.title,
        subtitle: a.category,
        url: `/ai-lessons/${a.slug}`,
        icon: <Sparkles className="w-4 h-4 text-amber-500" />,
        section: 'AI Lessons'
      }));

    const matchedServices = mockServices
      .filter(s => s.title.toLowerCase().includes(q))
      .map(s => ({
        id: s.id,
        title: s.title,
        subtitle: 'Engineering Service',
        url: `/services`,
        icon: <Compass className="w-4 h-4 text-purple-500" />,
        section: 'Services'
      }));

    const matchedResources = developerResources
      .filter(r => r.title.toLowerCase().includes(q) || r.technology.toLowerCase().includes(q) || r.category.toLowerCase().includes(q))
      .map(r => ({
        id: r.id,
        title: r.title,
        subtitle: `${r.category} • ${r.technology}`,
        url: `/resources`,
        icon: <BookOpen className="w-4 h-4 text-[#D4A72C]" />,
        section: 'Resources'
      }));

    return [...matchedResources, ...matchedProjects, ...matchedLessons, ...matchedAILessons, ...matchedPosts, ...matchedServices].slice(0, 8);
  }, [query]);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} aria-hidden="true" />

      <div
        className="relative w-full max-w-xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-[var(--shadow-elevated)] overflow-hidden z-10"
        role="dialog"
        aria-modal="true"
        aria-label="Quick Search"
      >
        <div className="flex items-center px-4 border-b border-[var(--color-border)]">
          <Search className="w-4 h-4 text-[var(--color-muted)] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tech lessons, blog posts..."
            autoFocus
            className="w-full py-4 text-sm bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] p-1 mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-muted)] bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs text-[var(--color-muted)] font-mono">
              Type to quickly search across projects, technical lessons, blog posts, and services...
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-sm text-[var(--color-muted)]">
              No matching records found for "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((item) => (
                <button
                  key={`${item.section}-${item.id}`}
                  onClick={() => handleSelect(item.url)}
                  className="w-full flex items-center justify-between p-3 rounded-[var(--radius-md)] text-left hover:bg-[var(--color-surface-hover)] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-[var(--color-bg)] border border-[var(--color-border)]">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[var(--color-text)] group-hover:text-[#D4A72C] transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[var(--color-muted)] font-mono">
                        {item.section} • {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-muted)] group-hover:text-[#D4A72C] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-[var(--color-surface-hover)]/50 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)]">
          <span>Navigate with click or keyboard</span>
          <span>YITBAREK.K Index</span>
        </div>
      </div>
    </div>
  );
};
