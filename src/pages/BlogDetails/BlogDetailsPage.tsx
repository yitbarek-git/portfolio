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
import { postsService } from '../../services/postsService';
import { BlogPost } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, Tag } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useSEO({
    title: post ? `${post.title} — Tech Article by Yitbarek K.` : 'Article Details',
    description: post ? post.summary : 'Technical engineering article by Ethiopian software engineer and content creator Yitbarek K.',
    keywords: post ? `${post.title}, ${post.tags.map(t => t.name).join(', ')}, Software Engineering Articles` : undefined,
    ogImage: post?.imageUrl
  });

  const fetchPost = async () => {
    if (!slug) return;
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await postsService.getBySlug(slug);
      if (!data) {
        setPost(null);
      } else {
        setPost(data);
        const related = await postsService.getRelated(data.slug, data.category);
        setRelatedPosts(related);
      }
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Article link copied to clipboard', 'success');
      }
    } catch {
      showToast('Failed to copy link', 'error');
    }
  };

  if (isLoading) {
    return (
      <Container size="md" className="py-24">
        <LoadingState message="Loading technical article..." />
      </Container>
    );
  }

  if (hasError || !post) {
    return (
      <Container size="md" className="py-24">
        <ErrorState
          title="Article Not Found"
          message={`The requested technical article "${slug}" could not be located.`}
          onRetry={() => navigate('/blog')}
        />
      </Container>
    );
  }

  // Parse text content into structured blocks (paragraphs and code snippets)
  const renderContentBlocks = (rawContent: string) => {
    const parts = rawContent.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // Code block
        const firstLineEnd = part.indexOf('\n');
        const lang = firstLineEnd !== -1 ? part.substring(0, firstLineEnd).trim() : 'typescript';
        const code = firstLineEnd !== -1 ? part.substring(firstLineEnd + 1) : part;
        return <CodeBlock key={index} code={code} language={lang || 'typescript'} />;
      }

      // Standard text with headings and lists
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
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] hover:text-[#D4A72C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors"
            title="Share Article"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Article Header */}
        <header className="mt-8 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="gold">{post.category}</Badge>
            <span className="text-xs font-mono text-[var(--color-muted)] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt}
            </span>
            <span className="text-xs font-mono text-[var(--color-muted)] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-text)] tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author Card */}
          <div className="flex items-center gap-3 py-3 border-y border-[var(--color-border)]">
            <div className="w-9 h-9 rounded-full bg-[#0B0B0C] border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C] font-mono text-xs font-bold">
              YK
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--color-text)] block">
                {post.author.name}
              </span>
              <span className="text-[11px] font-mono text-[var(--color-muted)]">
                {post.author.role}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="my-8">
          <Image
            asset={post.coverImage}
            aspectRatio="wide"
            showTemporaryBadge
            className="w-full max-h-[440px] object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="prose max-w-none space-y-6">
          {renderContentBlocks(post.content)}
        </article>

        {/* Tags */}
        <div className="pt-8 mt-10 border-t border-[var(--color-border)] space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#D4A72C]" />
            Article Tags:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 mt-12 border-t border-[var(--color-border)] space-y-6">
            <h3 className="text-xl font-bold text-[var(--color-text)]">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Card key={rel.id} hoverEffect className="space-y-3">
                  <Badge variant="gold" size="sm">{rel.category}</Badge>
                  <h4 className="text-base font-bold text-[var(--color-text)]">
                    <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2">
                    {rel.excerpt}
                  </p>
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="text-xs font-semibold text-[#D4A72C] flex items-center gap-1 pt-2"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
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
