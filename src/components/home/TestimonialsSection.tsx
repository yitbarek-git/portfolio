import React, { useState } from 'react';
import { Testimonial } from '../../types';
import { mockTestimonials } from '../../data/testimonials';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { Star, CheckCircle, Quote, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

const countryFlags: Record<string, string> = {
  'United States': '🇺🇸',
  'Germany': '🇩🇪',
  'Kenya': '🇰🇪',
  'Canada': '🇨🇦',
  'United Kingdom': '🇬🇧',
  'Ethiopia': '🇪🇹',
  'Australia': '🇦🇺'
};

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'client' | 'student'>('all');

  const filteredTestimonials = filter === 'all' 
    ? mockTestimonials.slice(0, 3) 
    : mockTestimonials.filter(t => t.type === filter).slice(0, 3);

  return (
    <section className="py-12 sm:py-16">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4A72C] uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-[#D4A72C]" />
              <span>⭐ Verified Impact & Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              Client & Learner Testimonials
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 max-w-xl">
              Authentic feedback from international software clients and developers mentored across 25+ countries.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-mono font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#D4A72C] text-[#0B0B0C] shadow-xs'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setFilter('client')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-mono font-semibold transition-all cursor-pointer ${
                filter === 'client'
                  ? 'bg-[#D4A72C] text-[#0B0B0C] shadow-xs'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>💼</span>
              <span>Clients</span>
            </button>
            <button
              onClick={() => setFilter('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-mono font-semibold transition-all cursor-pointer ${
                filter === 'student'
                  ? 'bg-[#D4A72C] text-[#0B0B0C] shadow-xs'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>🎓</span>
              <span>Learners</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <Card key={item.id} hoverEffect className="flex flex-col justify-between p-6 space-y-4 border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="space-y-3">
                {/* Header with Avatar and Details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={item.avatarUrl}
                        alt={item.name}
                        className="w-11 h-11 rounded-full object-cover border border-[#D4A72C]/40"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      {item.verified && (
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5" title="Verified Review">
                          <CheckCircle className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text)] leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#D4A72C] font-mono">
                        {item.role}
                      </p>
                      <p className="text-[11px] text-[var(--color-muted)] flex items-center gap-1 mt-0.5">
                        <span>{item.organization}</span>
                        <span>•</span>
                        <span className="text-[var(--color-text-secondary)] flex items-center gap-1">
                          <span>{countryFlags[item.country] || '🌐'}</span>
                          <span>{item.country}</span>
                        </span>
                      </p>
                    </div>
                  </div>

                  <Quote className="w-6 h-6 text-[#D4A72C]/20 shrink-0" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#D4A72C]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4A72C]" />
                  ))}
                  <span className="text-xs font-mono text-[var(--color-muted)] ml-1.5">5.0 / 5.0</span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Footer Pill */}
              <div className="pt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)]">
                <span className="px-2 py-0.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[#D4A72C] truncate max-w-[200px]">
                  {item.projectOrCourse}
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span>✓</span> Verified
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

