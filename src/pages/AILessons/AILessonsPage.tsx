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
import { aiLessonsService } from '../../services/aiLessonsService';
import { AILesson } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import {
  Sparkles,
  ArrowRight,
  Brain,
  Terminal,
  Clock,
  BookOpen,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  Search
} from 'lucide-react';

export const AILessonsPage: React.FC = () => {
  useSEO({
    title: 'AI Engineering & LLM Systems Curriculum — Yitbarek K.',
    description: 'Learn applied AI system engineering: RAG architectures, structured outputs, and autonomous agent loops with TypeScript by software engineer and global educator Yitbarek K.',
    keywords: 'AI Lessons, LLM Architecture Tutorials, RAG Systems, AI Engineering, TypeScript AI, Gemini API, Function Calling'
  });

  const [lessons, setLessons] = useState<AILesson[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchLessons = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const [data, cats] = await Promise.all([
        aiLessonsService.getAll({
          category: selectedCategory,
          search: searchQuery
        }),
        aiLessonsService.getCategories()
      ]);
      setLessons(data);
      setCategories(['All', ...cats]);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-10 sm:py-16 space-y-10 sm:space-y-12">
      <Container size="xl">
        <SectionHeading
          badgeText="Applied AI & LLM Systems"
          title="AI Engineering & LLM Architecture Lessons"
          subtitle="A dedicated curriculum exploring LLM integration architectures, schema-enforced structured outputs, retrieval-augmented generation (RAG), and autonomous agent loops with strict TypeScript type safety."
        />

        {/* AI Engineering Architecture Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
            <div className="flex items-center gap-2 text-[#D4A72C] text-xs font-mono font-bold uppercase tracking-wider">
              <Brain className="w-4 h-4" />
              <span>Deterministic Output</span>
            </div>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              Schema-enforced structured JSON generation and parameter bounds preventing runtime hallucination in production backends.
            </p>
          </div>

          <div className="p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>RAG & Vector Grounding</span>
            </div>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              Semantic document chunking, dense vector similarity in PostgreSQL (pgvector), and context grounding verification.
            </p>
          </div>

          <div className="p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>Tool-Calling Agents</span>
            </div>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              State-machine cycle breakout guards, database tool execution, and self-healing LLM error recovery loops.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D4A72C] text-[#0B0B0C] font-semibold shadow-2xs'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search AI curriculum..."
            />
          </div>
        </div>

        {/* Lessons Grid */}
        {isLoading ? (
          <div className="py-16">
            <LoadingState message="Fetching AI curriculum..." />
          </div>
        ) : hasError ? (
          <div className="py-16">
            <ErrorState onRetry={fetchLessons} />
          </div>
        ) : lessons.length === 0 ? (
          <div className="py-16">
            <EmptyState
              title="No AI Lessons Found"
              description={`No lessons found matching category "${selectedCategory}" and query "${searchQuery}".`}
              actionText="Reset Filters"
              onAction={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {lessons.map((lesson) => (
              <Card key={lesson.id} hoverEffect padding="none" className="flex flex-col justify-between overflow-hidden group">
                <div>
                  {/* Lesson Thumbnail */}
                  <div className="relative">
                    <Image
                      asset={lesson.thumbnail}
                      aspectRatio="video"
                      showTemporaryBadge={lesson.thumbnail?.isTemporary}
                      className="h-44 w-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <Badge variant="gold" size="sm">{lesson.category}</Badge>
                    </div>
                    {lesson.difficulty && (
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                        {lesson.difficulty}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)]">
                      <span>{lesson.author?.name || 'Yitbarek K.'}</span>
                      {lesson.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#D4A72C]" />
                          {lesson.duration}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-[#D4A72C] transition-colors leading-snug">
                      <Link to={`/ai-lessons/${lesson.slug}`}>{lesson.title}</Link>
                    </h3>

                    <p className="text-xs text-[var(--color-muted)] leading-relaxed line-clamp-2">
                      {lesson.description}
                    </p>

                    {/* Notice / Subcategory pill */}
                    {lesson.placeholderNotice && (
                      <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--color-bg)] border border-[var(--color-border)] text-[11px] font-mono text-[var(--color-muted)] flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-[#D4A72C] shrink-0" />
                        <span className="truncate">{lesson.placeholderNotice}</span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {lesson.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--color-bg)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-5 py-3.5 border-t border-[var(--color-border)] bg-[var(--color-surface)]/50 flex items-center justify-between">
                  <Link
                    to={`/ai-lessons/${lesson.slug}`}
                    className="text-xs font-semibold text-[#D4A72C] hover:text-[#B88A18] flex items-center gap-1"
                  >
                    Start AI Lesson <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[10px] font-mono text-[var(--color-muted)]">
                    {lesson.status || 'Published'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
