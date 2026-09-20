import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Image } from '../../components/common/Image';
import { CodeBlock } from '../../components/common/CodeBlock';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { techLessonsService } from '../../services/techLessonsService';
import { TechLesson } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  Share2,
  Code2
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const TechLessonDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [lesson, setLesson] = useState<TechLesson | null>(null);
  const [relatedLessons, setRelatedLessons] = useState<TechLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useSEO({
    title: lesson ? `${lesson.title} — Tech Lesson by Yitbarek K.` : 'Tech Lesson',
    description: lesson ? lesson.summary : 'In-depth computer science tutorial and lesson by Ethiopian tech educator Yitbarek K.',
    keywords: lesson ? `${lesson.title}, ${lesson.category}, Computer Science Tutorial Ethiopia, Tech Education` : undefined,
    ogImage: lesson?.imageUrl
  });

  const fetchLesson = async () => {
    if (!slug) return;
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await techLessonsService.getBySlug(slug);
      if (!data) {
        setLesson(null);
      } else {
        setLesson(data);
        const related = await techLessonsService.getRelated(data.slug, data.category);
        setRelatedLessons(related);
      }
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

  if (isLoading) {
    return (
      <Container size="md" className="py-24">
        <LoadingState message="Loading technical lesson curriculum..." />
      </Container>
    );
  }

  if (hasError || !lesson) {
    return (
      <Container size="md" className="py-24">
        <ErrorState
          title="Lesson Not Found"
          message={`The requested technical lesson "${slug}" could not be located.`}
          onRetry={() => navigate('/tech-lessons')}
        />
      </Container>
    );
  }

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
          {lines.map((line, lIdx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={lIdx} className="text-xl font-bold text-[var(--color-text)] mt-8 mb-3">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={lIdx} className="text-2xl font-bold text-[var(--color-text)] mt-10 mb-4">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }
            if (trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
              const listItems = trimmed.split('\n');
              return (
                <ul key={lIdx} className="space-y-2 pl-5 list-disc text-sm sm:text-base text-[var(--color-text-secondary)]">
                  {listItems.map((item, iIdx) => (
                    <li key={iIdx}>{item.replace(/^[-*]|\d+\.\s*/, '').trim()}</li>
                  ))}
                </ul>
              );
            }

            return (
              <p key={lIdx} className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="md">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
          <Link
            to="/tech-lessons"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] hover:text-[#D4A72C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tech Lessons
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors"
            title="Share Lesson"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Lesson Header */}
        <header className="mt-8 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gold">{lesson.category}</Badge>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)]">
              Difficulty: {lesson.difficulty}
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
                {lesson.author.name}
              </span>
              <span className="text-[11px] font-mono text-[var(--color-muted)]">
                {lesson.author.role}
              </span>
            </div>
          </div>
        </header>

        {/* Learning Objectives Box */}
        <div className="p-6 rounded-[var(--radius-lg)] border border-[#D4A72C]/30 bg-[#D4A72C]/5 space-y-4">
          <div className="flex items-center gap-2 text-[#D4A72C] font-mono font-bold text-xs uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Curriculum Learning Objectives</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-[var(--color-text-secondary)]">
            {lesson.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                <span className="leading-snug">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lesson Thumbnail Media */}
        <div className="my-8">
          <Image asset={lesson.thumbnail} aspectRatio="wide" showTemporaryBadge className="w-full" />
        </div>

        {/* Lesson Content Body */}
        <article className="prose max-w-none space-y-6">
          {renderContentBlocks(lesson.content)}
        </article>

        {/* Interactive Code Examples Section */}
        {lesson.codeExamples.length > 0 && (
          <div className="pt-10 border-t border-[var(--color-border)] space-y-6">
            <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#D4A72C]" />
              Interactive Code Snippets
            </h2>
            <div className="space-y-6">
              {lesson.codeExamples.map((ex, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-sm font-bold text-[var(--color-text)]">{ex.title}</h4>
                  {ex.description && (
                    <p className="text-xs text-[var(--color-muted)]">{ex.description}</p>
                  )}
                  <CodeBlock code={ex.code} language={ex.language} title={ex.title} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources & References */}
        {lesson.resources.length > 0 && (
          <div className="pt-8 border-t border-[var(--color-border)] space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)]">
              Engineering References & Documentation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[#D4A72C]/40 transition-colors flex items-center justify-between group"
                >
                  <span className="text-xs font-medium text-[var(--color-text)] group-hover:text-[#D4A72C]">
                    {res.title}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--color-muted)] group-hover:text-[#D4A72C]" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Related Lessons */}
        {relatedLessons.length > 0 && (
          <div className="pt-12 mt-12 border-t border-[var(--color-border)] space-y-6">
            <h3 className="text-xl font-bold text-[var(--color-text)]">
              Related Technical Lessons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedLessons.map((rel) => (
                <Card key={rel.id} hoverEffect className="space-y-3">
                  <Badge variant="gold" size="sm">{rel.category}</Badge>
                  <h4 className="text-base font-bold text-[var(--color-text)]">
                    <Link to={`/tech-lessons/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2">
                    {rel.description}
                  </p>
                  <Link
                    to={`/tech-lessons/${rel.slug}`}
                    className="text-xs font-semibold text-[#D4A72C] flex items-center gap-1 pt-2"
                  >
                    Start Lesson <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
