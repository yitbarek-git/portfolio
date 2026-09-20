import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Image } from '../../components/common/Image';
import { SearchInput } from '../../components/common/SearchInput';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { EmptyState } from '../../components/common/EmptyState';
import { projectsService } from '../../services/projectsService';
import { Project } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import { ArrowRight, ExternalLink, Github, Filter, Code2, Sparkles, Terminal, Bot } from 'lucide-react';

const categories = [
  { label: 'All Projects', value: 'All', emoji: '🌐' },
  { label: 'Full-Stack & E-Commerce', value: 'Full-Stack', emoji: '🛒' },
  { label: 'Python & Automation Bots', value: 'Automation', emoji: '🤖' },
  { label: 'Backend & High-Throughput APIs', value: 'Backend', emoji: '⚡' },
  { label: 'Frontend & UI', value: 'Frontend', emoji: '💻' }
];

const getTechEmoji = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return '⚛️';
  if (t.includes('type')) return '🔷';
  if (t.includes('python')) return '🐍';
  if (t.includes('node') || t.includes('express')) return '🟢';
  if (t.includes('fastapi')) return '🚀';
  if (t.includes('postgres') || t.includes('sql')) return '🐘';
  if (t.includes('redis')) return '⚡';
  if (t.includes('docker')) return '🐳';
  if (t.includes('stripe')) return '💳';
  if (t.includes('tailwind')) return '🎨';
  if (t.includes('aiogram') || t.includes('bot')) return '🤖';
  if (t.includes('gemini') || t.includes('ai') || t.includes('rag') || t.includes('langchain')) return '🧠';
  return '⚙️';
};

const getCategoryEmoji = (category: string) => {
  switch (category) {
    case 'Full-Stack': return '🛒';
    case 'Automation': return '🤖';
    case 'Backend': return '⚡';
    case 'Frontend': return '💻';
    default: return '📁';
  }
};

export const ProjectsPage: React.FC = () => {
  useSEO({
    title: 'Senior Frontend & Full-Stack Projects — Yitbarek K.',
    description: 'Production portfolio of Senior Frontend & Full-Stack web platforms, React 19/TypeScript applications, custom e-commerce stores, and Python automation bots built for international clients.',
    keywords: 'Senior Frontend Projects, React TypeScript Portfolio, E-Commerce Storefronts, Remote Contract Developer, Python Telegram Bots'
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await projectsService.getAll({
        category: selectedCategory,
        search: searchQuery
      });
      setProjects(data);
    } catch (err) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-16 space-y-10">
      <Container size="xl">
        <SectionHeading
          badgeText="Portfolio"
          title="Web Projects & Automation Bots"
          subtitle="Real projects built for clients and production: fast React web apps, custom online stores, automated Telegram bots, and backend systems."
        />

        {/* Interactive Lab Callout Banner */}
        <div className="p-4 sm:p-5 rounded-[var(--radius-lg)] border border-[#D4A72C]/30 bg-[#D4A72C]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4A72C]/15 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text)]">
                Want to test these bots and automation scripts live?
              </h3>
              <p className="text-xs text-[var(--color-muted)]">
                Try out real Telegram bot menus, automated Python scripts, and database operations right inside your browser.
              </p>
            </div>
          </div>
          <Link to="/#interactive-lab" className="shrink-0">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Open Live Demo
            </Button>
          </Link>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
          {/* Category Tabs */}
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

          {/* Search Input */}
          <div className="w-full md:w-72">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search projects or tech..."
            />
          </div>
        </div>

        {/* Project Grid / State Views */}
        {isLoading ? (
          <div className="py-16">
            <LoadingState message="Fetching project architectures..." />
          </div>
        ) : hasError ? (
          <div className="py-16">
            <ErrorState onRetry={fetchProjects} />
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16">
            <EmptyState
              title="No Projects Match Query"
              description={`No projects found matching category "${selectedCategory}" and search "${searchQuery}".`}
              actionText="Reset Filters"
              onAction={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {projects.map((project) => (
              <Card key={project.id} hoverEffect padding="none" className="flex flex-col overflow-hidden">
                <div className="relative">
                  <Image
                    asset={project.images[0]}
                    aspectRatio="video"
                    showTemporaryBadge
                    className="h-56 w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge variant="gold">
                      <span className="mr-1">{getCategoryEmoji(project.category)}</span>
                      {project.category}
                    </Badge>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/70 text-white border border-white/20">
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <h3 className="text-xl font-bold text-[var(--color-text)] hover:text-[#D4A72C] transition-colors flex items-center gap-2">
                      <span>{getCategoryEmoji(project.category)}</span>
                      <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Architecture highlight */}
                  {project.architectureOverview && (
                    <div className="p-3 rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)]">
                      <span className="text-[#D4A72C] font-semibold block mb-0.5">⚙️ Architecture:</span>
                      {project.architectureOverview}
                    </div>
                  )}

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)] flex items-center gap-1.5"
                      >
                        <span>{getTechEmoji(t)}</span>
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-xs font-bold text-[#D4A72C] hover:text-[#B88A18] flex items-center gap-1.5 group"
                    >
                      Technical Overview <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] transition-colors"
                          title={link.label}
                          aria-label={link.label}
                        >
                          {link.type === 'github' ? (
                            <Github className="w-3.5 h-3.5" />
                          ) : (
                            <ExternalLink className="w-3.5 h-3.5" />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
