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
import { postsService } from '../../services/postsService';
import { BlogPost } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import { ArrowRight, Calendar, Clock, BookOpen, Tag } from 'lucide-react';

const blogCategories = ['All', 'Backend Architecture', 'Databases', 'Frontend Engineering'];

export const BlogPage: React.FC = () => {
  useSEO({
    title: 'Technical Engineering Blog & Content — Yitbarek K.',
    description: 'Technical articles, architectural deep dives, and tutorials by Ethiopian tech content creator and software engineer Yitbarek K.',
    keywords: 'Tech Content Creator Ethiopia, Software Engineering Blog, TypeScript Articles, Database Optimization Deep Dives, Addis Ababa Developer Blog'
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await postsService.getAll({
        category: selectedCategory,
        search: searchQuery
      });
      setPosts(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-16 space-y-10">
      <Container size="xl">
        <SectionHeading
          badgeText="Engineering Insights"
          title="Technical Writing & Blog"
          subtitle="Articles, architectural notes, and deep dives on backend pipelines, relational query optimization, and modern web systems."
        />

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {blogCategories.map((cat) => (
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
              placeholder="Search articles & tags..."
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        {isLoading ? (
          <div className="py-16">
            <LoadingState message="Fetching technical articles..." />
          </div>
        ) : hasError ? (
          <div className="py-16">
            <ErrorState onRetry={fetchPosts} />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16">
            <EmptyState
              title="No Articles Found"
              description={`No technical articles matched category "${selectedCategory}" and search "${searchQuery}".`}
              actionText="Reset Search"
              onAction={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {posts.map((post) => (
              <Card key={post.id} hoverEffect padding="none" className="flex flex-col overflow-hidden">
                <Image
                  asset={post.coverImage}
                  aspectRatio="video"
                  showTemporaryBadge
                  className="h-48 w-full"
                />

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
                      <span className="text-[#D4A72C] font-semibold">{post.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--color-text)] hover:text-[#D4A72C] transition-colors leading-snug">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-[#D4A72C] flex items-center gap-1"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] font-mono text-[var(--color-muted)]">
                      {post.publishedAt}
                    </span>
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
