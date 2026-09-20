import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Image } from '../../components/common/Image';
import { SearchInput } from '../../components/common/SearchInput';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { EmptyState } from '../../components/common/EmptyState';
import { techLessonsService } from '../../services/techLessonsService';
import { TechLesson } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import { 
  ArrowRight, 
  GraduationCap, 
  Code2, 
  Clock, 
  Sparkles, 
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Database,
  Cloud,
  Layers2
} from 'lucide-react';

const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'All': <Layers2 className="w-4 h-4" />,
  'AI & LLM Engineering': <Sparkles className="w-4 h-4 text-[#D4A72C]" />,
  'Web Development': <Code2 className="w-4 h-4 text-sky-400" />,
  'Python & Data Science': <Terminal className="w-4 h-4 text-emerald-400" />,
  'C++ & Systems': <Cpu className="w-4 h-4 text-indigo-400" />,
  'DevOps & Cloud': <Cloud className="w-4 h-4 text-amber-400" />,
  'Databases': <Database className="w-4 h-4 text-purple-400" />
};

export const TechLessonsPage: React.FC = () => {
  useSEO({
    title: 'Computer Science & Full-Stack Tech Lessons — by Yitbarek K.',
    description: 'Master AI Engineering, Full-Stack TypeScript, Python, C++, DevOps, and 3NF Databases with step-by-step beginner-to-advanced lessons by Yitbarek K.',
    keywords: 'AI Lessons, Web Development Tutorials, Python Data Science, C++ Systems, DevOps Docker CI CD, Database Normalization 3NF, Tech Educator Yitbarek'
  });

  const [lessons, setLessons] = useState<TechLesson[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchLessons = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const [data, cats] = await Promise.all([
        techLessonsService.getAll({
          category: selectedCategory,
          difficulty: selectedDifficulty,
          search: searchQuery
        }),
        techLessonsService.getCategories()
      ]);
      setLessons(data);
      const uniqueCats = Array.from(new Set(['All', 'AI & LLM Engineering', 'Web Development', 'Python & Data Science', 'C++ & Systems', 'DevOps & Cloud', 'Databases', ...cats]));
      setCategories(uniqueCats);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="xl">
        <SectionHeading
          badgeText="Global Tech Academy"
          title="Engineering & Computer Science Lessons"
          subtitle="Structured curricula taught to over 20,000+ developers globally. Clear progressions from foundational fundamentals to production system architecture."
        />

        {/* Learning Roadmap Progression Banner */}
        <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#D4A72C] tracking-wide uppercase">
                Curriculum Progression Model
              </span>
              <h3 className="text-lg font-bold text-[var(--color-text)] mt-1">
                Structured Beginner to Advanced Learning Roadmaps
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 max-w-2xl">
                Every discipline is structured into three concrete difficulty milestones so you can build deep practical capability without gaps in theoretical understanding.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/30 text-center">
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase block">Tier 1</span>
                <span className="text-xs font-bold text-[var(--color-text)] block mt-0.5">Beginner</span>
                <span className="text-[10px] text-[var(--color-muted)] block mt-0.5">Core Mechanics</span>
              </div>
              <div className="p-3 rounded-[var(--radius-md)] bg-sky-500/10 border border-sky-500/30 text-center">
                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase block">Tier 2</span>
                <span className="text-xs font-bold text-[var(--color-text)] block mt-0.5">Intermediate</span>
                <span className="text-[10px] text-[var(--color-muted)] block mt-0.5">Real-World Logic</span>
              </div>
              <div className="p-3 rounded-[var(--radius-md)] bg-[#D4A72C]/10 border border-[#D4A72C]/30 text-center">
                <span className="text-[10px] font-mono font-bold text-[#D4A72C] uppercase block">Tier 3</span>
                <span className="text-xs font-bold text-[var(--color-text)] block mt-0.5">Advanced</span>
                <span className="text-[10px] text-[var(--color-muted)] block mt-0.5">Systems Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-md)] text-xs font-mono whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-[#D4A72C] text-[#0B0B0C] border-[#D4A72C] font-bold shadow-sm'
                    : 'bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)]'
                }`}
              >
                {CATEGORY_ICONS[cat] || <Layers className="w-3.5 h-3.5" />}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-3 border-t border-[var(--color-border)]">
            {/* Difficulty Tabs */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-mono font-semibold text-[var(--color-muted)]">Difficulty:</span>
              <div className="flex items-center gap-1.5 bg-[var(--color-bg)] p-1 rounded-md border border-[var(--color-border)]">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                      selectedDifficulty === diff
                        ? 'bg-[var(--color-surface)] text-[var(--color-text)] font-bold shadow-xs border border-[var(--color-border)]'
                        : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search tutorials, code, or tags..."
              />
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        {isLoading ? (
          <div className="py-16">
            <LoadingState message="Fetching comprehensive technical lessons..." />
          </div>
        ) : hasError ? (
          <div className="py-16">
            <ErrorState onRetry={fetchLessons} />
          </div>
        ) : lessons.length === 0 ? (
          <div className="py-16">
            <EmptyState
              title="No Lessons Found"
              description={`No lessons found matching category "${selectedCategory}" and search "${searchQuery}".`}
              actionText="Reset Filters"
              onAction={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSearchQuery('');
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson) => (
              <Card key={lesson.id} hoverEffect padding="none" className="flex flex-col overflow-hidden group">
                <div className="relative">
                  <Image
                    asset={lesson.thumbnail}
                    aspectRatio="video"
                    showTemporaryBadge
                    className="h-48 w-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge variant="gold">{lesson.category}</Badge>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                    <span className={`px-2 py-0.5 rounded-full font-bold border backdrop-blur-md ${
                      lesson.difficulty === 'Beginner'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : lesson.difficulty === 'Intermediate'
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                        : 'bg-[#D4A72C]/20 text-[#D4A72C] border-[#D4A72C]/40'
                    }`}>
                      {lesson.difficulty}
                    </span>

                    {lesson.duration && (
                      <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                        <Clock className="w-3 h-3 text-[var(--color-muted)]" />
                        {lesson.duration}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)] group-hover:text-[#D4A72C] transition-colors leading-snug">
                      <Link to={`/tech-lessons/${lesson.slug}`}>{lesson.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2">
                      {lesson.description}
                    </p>
                  </div>

                  {/* Learning Objectives Pill */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-secondary)]">
                      <GraduationCap className="w-4 h-4 text-[#D4A72C]" />
                      <span className="font-semibold">{lesson.objectives.length} Core Objectives</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {lesson.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-muted)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                    <Link
                      to={`/tech-lessons/${lesson.slug}`}
                      className="text-xs font-bold text-[#D4A72C] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    >
                      Start Lesson <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] font-mono text-[var(--color-muted)]">
                      {lesson.author.name}
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
