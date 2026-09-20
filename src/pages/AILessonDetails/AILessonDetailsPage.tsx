import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CodeBlock } from '../../components/common/CodeBlock';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { aiLessonsService } from '../../services/aiLessonsService';
import { AILesson } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Sparkles,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Share2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AILessonDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [lesson, setLesson] = useState<AILesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useSEO({
    title: lesson ? `${lesson.title} — AI Architecture Lesson` : 'AI Lesson',
    description: lesson ? lesson.summary : 'Applied AI systems engineering lesson by Ethiopian software engineer Yitbarek K.',
    keywords: lesson ? `${lesson.title}, AI Engineering, LLM Systems Architecture, TypeScript AI` : undefined,
  });

  const fetchLesson = async () => {
    if (!slug) return;
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await aiLessonsService.getBySlug(slug);
      setLesson(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLesson();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Lesson link copied to clipboard', 'success');
      }
    } catch {
      showToast('Failed to copy link', 'error');
    }
  };

  const renderContentBlocks = (rawContent: string) => {
    const parts = rawContent.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const firstLineEnd = part.indexOf('\n');
        const lang = firstLineEnd !== -1 ? part.substring(0, firstLineEnd).trim() : 'typescript';
        const code = firstLineEnd !== -1 ? part.substring(firstLineEnd + 1) : part;
        return <CodeBlock key={index} code={code} language={lang || 'typescript'} />;
      }

      const lines = part.split('\n\n');
      return (
        <div key={index} className="space-y-4">
          {lines.map((block, bIdx) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={bIdx} className="text-lg sm:text-xl font-bold text-[var(--color-text)] mt-8 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={bIdx} className="text-xl sm:text-2xl font-black text-[var(--color-text)] mt-10 mb-4 pb-2 border-b border-[var(--color-border)]">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              const items = trimmed.split('\n').map(l => l.replace(/^[-*]\s+/, ''));
              return (
                <ul key={bIdx} className="space-y-2 my-4">
                  {items.map((it, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C] mt-2 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={bIdx} className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <Container size="md" className="py-24">
        <LoadingState message="Loading AI lesson specification..." />
      </Container>
    );
  }

  if (hasError || !lesson) {
    return (
      <Container size="md" className="py-24">
        <ErrorState
          title="AI Lesson Not Found"
          message={`The requested AI lesson "${slug}" could not be located.`}
          onRetry={() => navigate('/ai-lessons')}
        />
      </Container>
    );
  }

  return (
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="md">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
          <Link
            to="/ai-lessons"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] hover:text-[#D4A72C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to AI Lessons
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors cursor-pointer"
            title="Share Lesson"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Header */}
        <header className="mt-8 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gold">{lesson.category}</Badge>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)]">
              Architecture Module
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-text)] tracking-tight leading-tight">
            {lesson.title}
          </h1>

          <p className="text-base text-[var(--color-muted)] leading-relaxed">
            {lesson.description}
          </p>

          <div className="flex items-center gap-3 py-3 border-y border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-full bg-[#0B0B0C] border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C] font-mono text-xs font-bold">
              YK
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--color-text)] block">
                {lesson.author?.name || 'Yitbarek K.'}
              </span>
              <span className="text-[11px] font-mono text-[var(--color-muted)]">
                {lesson.author?.role || 'Full-Stack Developer'}
              </span>
            </div>
          </div>
        </header>

        {/* Lesson Body Content */}
        <div className="space-y-6 pt-6">
          <div className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs space-y-6">
            {renderContentBlocks(lesson.content)}
          </div>
        </div>

        {/* Verified Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <div className="space-y-4 pt-6">
            <h3 className="text-base font-bold text-[var(--color-text)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D4A72C]" />
              Engineering References & Docs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.resources.map((res, rIdx) => (
                <a
                  key={rIdx}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[#D4A72C]/40 transition-colors flex items-center justify-between gap-3 text-xs group"
                >
                  <span className="font-medium text-[var(--color-text)] group-hover:text-[#D4A72C] transition-colors">
                    {res.title}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--color-muted)] group-hover:text-[#D4A72C] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Topics Covered Tags */}
        <div className="pt-6 border-t border-[var(--color-border)] space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] block">
            Topics Covered:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {lesson.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
