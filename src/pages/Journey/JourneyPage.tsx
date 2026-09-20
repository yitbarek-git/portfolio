import React, { useState, useEffect } from 'react';
import { Container } from '../../components/common/Container';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { journeyService } from '../../services/journeyService';
import { JourneyEntry } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import { GraduationCap, Code2, Milestone, Sparkles, CheckCircle2 } from 'lucide-react';

export const JourneyPage: React.FC = () => {
  useSEO({
    title: 'Engineering Milestones & Academic Journey — Yitbarek K.',
    description: 'Chronological timeline of software engineering achievements, academic coursework, tech teaching milestones, and content creation by Yitbarek K.',
    keywords: 'Software Engineer Journey, Computer Science Milestones, Tech Educator Story Ethiopia'
  });

  const [entries, setEntries] = useState<JourneyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchJourney = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await journeyService.getAll();
      setEntries(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJourney();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-[#D4A72C]" />;
      case 'Technical':
        return <Code2 className="w-4 h-4 text-blue-500" />;
      case 'Product':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      default:
        return <Milestone className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="xl">
        <SectionHeading
          badgeText="Verified Timeline"
          title="Engineering Journey & Milestones"
          subtitle="Chronological overview of academic computer science studies, full-stack software development milestones, and foundational programming background."
        />

        {isLoading ? (
          <div className="py-16">
            <LoadingState message="Loading engineering timeline..." />
          </div>
        ) : hasError ? (
          <div className="py-16">
            <ErrorState onRetry={fetchJourney} />
          </div>
        ) : (
          <div className="relative border-l-2 border-[#D4A72C]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
            {entries.map((entry) => (
              <div key={entry.id} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-[var(--color-surface)] border-2 border-[#D4A72C] flex items-center justify-center group-hover:scale-125 transition-transform shadow-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
                </div>

                <Card padding="lg" className="space-y-4 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(entry.category)}
                      <span className="text-xs font-mono font-bold text-[#D4A72C]">
                        {entry.period}
                      </span>
                    </div>
                    <Badge variant="neutral" size="sm">
                      {entry.category}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)]">
                      {entry.title}
                    </h2>
                    <p className="text-xs font-mono text-[var(--color-text-secondary)] mt-0.5">
                      {entry.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                    {entry.description}
                  </p>

                  {/* Highlights */}
                  {entry.highlights.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-text-secondary)] block">
                        Focus Areas & Highlights:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[var(--color-muted)]">
                        {entry.highlights.map((h, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A72C] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--color-border)]">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-surface-hover)] text-[var(--color-muted)] border border-[var(--color-border)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
