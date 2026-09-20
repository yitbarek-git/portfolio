import React from 'react';
import { ShieldCheck, Zap, Globe, Lock, CheckCircle2, ArrowRight, Clock, Award, FileCode, Check } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';

export const FreelanceWorkflowSection: React.FC = () => {
  const guarantees = [
    {
      icon: ShieldCheck,
      emoji: '🛡️',
      title: 'Milestone-Based Payments',
      description: 'We split the project into simple milestones. You review live preview links at every stage before payment is released.',
      highlight: 'Zero Upfront Risk',
      accent: 'text-[#D4A72C]',
      border: 'border-[#D4A72C]/30'
    },
    {
      icon: Zap,
      emoji: '⚡',
      title: 'Fast & Modern Websites',
      description: 'Your website loads in under 1 second, looks great on mobile phones and laptops, and follows accessibility standards.',
      highlight: 'Under 1-Second Load',
      accent: 'text-amber-400',
      border: 'border-amber-400/30'
    },
    {
      icon: Globe,
      emoji: '🌐',
      title: 'US & Europe Hours',
      description: 'Daily 4–6 hours of live overlap with US and European business hours. Clear communication on Slack, email, or video.',
      highlight: 'Flexible Schedule',
      accent: 'text-sky-400',
      border: 'border-sky-400/30'
    },
    {
      icon: Lock,
      emoji: '🔒',
      title: '100% Code Ownership',
      description: 'You own all the code upon delivery. I sign NDAs on request and include 30 days of free bug fixes after launch.',
      highlight: '30-Day Warranty',
      accent: 'text-emerald-400',
      border: 'border-emerald-400/30'
    }
  ];

  const clientProofPoints = [
    'Work directly with the developer—no account managers or middlemen',
    'Live staging links to test your website before making any payment',
    'Clean, tested code written in TypeScript and Python',
    'Flexible payment options: Upwork Escrow, Stripe invoice, or bank transfer'
  ];

  return (
    <section className="py-6 sm:py-8">
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A72C]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 text-xs font-mono text-[#D4A72C]">
              <span>🤝</span>
              <span>Client Guarantees & Work Process</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
              Simple, Reliable Remote Work for Founders & Teams
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
              Work directly with an experienced developer. Clear timelines, milestone payments, and high-quality code from day one.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)]">
              <span>⭐</span> Top-Rated Developer
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-bg)] border border-[var(--color-border)] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for New Projects
            </span>
          </div>
        </div>

        {/* 4 Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {guarantees.map((item, idx) => {
            return (
              <div
                key={idx}
                className="p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)]/80 hover:border-[#D4A72C]/50 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border bg-[var(--color-surface)] ${item.accent} ${item.border}`}>
                      {item.highlight}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-text)] group-hover:text-[#D4A72C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Strip: Client Peace of Mind & Direct CTAs */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--color-text-secondary)]">
            {clientProofPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/contact">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Start a Project / Get Quote
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" size="sm">
                View Services & Rates
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
