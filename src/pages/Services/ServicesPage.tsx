import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { servicesService } from '../../services/servicesService';
import { Service } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import {
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Code2,
  Workflow,
  Cpu,
  Clock,
  Sparkles,
  Tag,
  Zap,
  Terminal,
  ShoppingBag,
  Database,
  Check
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  useSEO({
    title: 'Senior Frontend & Systems Engineering Services — Yitbarek K.',
    description: 'Specialized contract services for international founders and startups: sub-second React 19/TypeScript web platforms, custom E-Commerce, and Python bot automations by Yitbarek K.',
    keywords: 'Senior Frontend Engineer, React TypeScript Development, Remote Freelance Developer, Upwork Contract Engineer, Python Telegram Bot Developer'
  });

  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchServices = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const data = await servicesService.getAll();
      setServices(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="py-10 sm:py-16 space-y-16">
      <Container size="xl">
        <SectionHeading
          badgeText="Services & Pricing"
          title="Web Development & Automation Services"
          subtitle="Software development for startups, businesses, and remote teams: fast React web applications, custom online stores, and 24/7 Python automation bots."
        />

        {/* Guarantees Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] mb-10 shadow-xs">
          <div className="flex items-center gap-2.5 p-2">
            <span className="text-xl">⚡</span>
            <div>
              <p className="text-xs font-bold text-[var(--color-text)]">Fast Turnaround</p>
              <p className="text-[11px] text-[var(--color-muted)]">3 to 14 days delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2">
            <span className="text-xl">🔒</span>
            <div>
              <p className="text-xs font-bold text-[var(--color-text)]">Clean Database Setup</p>
              <p className="text-[11px] text-[var(--color-muted)]">Safe & organized data tables</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2">
            <span className="text-xl">🤖</span>
            <div>
              <p className="text-xs font-bold text-[var(--color-text)]">24/7 Automation</p>
              <p className="text-[11px] text-[var(--color-muted)]">Reliable bots that don't crash</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2">
            <span className="text-xl">🤝</span>
            <div>
              <p className="text-xs font-bold text-[var(--color-text)]">Direct Communication</p>
              <p className="text-[11px] text-[var(--color-muted)]">Work directly with the engineer</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="py-16">
            <LoadingState message="Loading engineering services..." />
          </div>
        ) : hasError ? (
          <div className="py-16">
            <ErrorState onRetry={fetchServices} />
          </div>
        ) : (
          <div className="space-y-12">
            {services.map((srv) => (
              <Card key={srv.id} padding="none" className="border border-[var(--color-border)] shadow-xs overflow-hidden">
                {/* Visual Preview Banner with Aspect-Ratio */}
                {srv.imageUrl && (
                  <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-black/40 border-b border-[var(--color-border)] group">
                    <img
                      src={srv.imageUrl}
                      alt={srv.imageAlt || srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/40 to-transparent" />
                    
                    {/* Top overlay badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                      <span className="text-2xl drop-shadow-md">{srv.emoji}</span>
                      <Badge variant="gold">{srv.status}</Badge>
                    </div>

                    {/* Pricing & Turnaround Pills */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {srv.priceEstimate && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-[#D4A72C]/40 text-xs font-mono text-[#D4A72C] backdrop-blur-sm shadow-md">
                            <Tag className="w-3.5 h-3.5" />
                            <span>{srv.priceEstimate}</span>
                          </div>
                        )}
                        {srv.turnaround && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/20 text-xs font-mono text-gray-200 backdrop-blur-sm shadow-md">
                            <Clock className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{srv.turnaround}</span>
                          </div>
                        )}
                      </div>

                      <Link to="/#interactive-lab" className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-white/90 hover:text-[#D4A72C] bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-xs">
                        <Zap className="w-3 h-3 text-[#D4A72C]" />
                        <span>Simulate in Lab</span>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Service Header Info */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{srv.emoji}</span>
                        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
                          {srv.title}
                        </h2>
                      </div>

                      <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                        {srv.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="pt-2">
                        <span className="text-[11px] font-mono text-[var(--color-muted)] block mb-1.5 font-bold uppercase tracking-wider">
                          🛠️ Core Technologies:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {srv.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 rounded text-xs font-mono bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex flex-wrap items-center gap-3">
                        <Link to="/contact">
                          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            Book Consultation
                          </Button>
                        </Link>
                        <Link to="/projects">
                          <Button variant="secondary" size="md">
                            View Case Studies
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Deliverables & Workflow */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[var(--color-bg)] p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)]">
                      {/* Deliverables Column */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] pb-2 border-b border-[var(--color-border)]">
                          <ShieldCheck className="w-4 h-4 text-[#D4A72C]" />
                          <span>📦 Guaranteed Deliverables</span>
                        </div>
                        <ul className="space-y-2 text-xs text-[var(--color-muted)]">
                          {srv.deliverables.map((d, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="leading-snug">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Workflow Column */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] pb-2 border-b border-[var(--color-border)]">
                          <Workflow className="w-4 h-4 text-[#D4A72C]" />
                          <span>🔄 Engineering Workflow</span>
                        </div>
                        <ol className="space-y-2 text-xs text-[var(--color-muted)]">
                          {srv.workflow.map((w, wIdx) => (
                            <li key={wIdx} className="flex items-start gap-2">
                              <span className="font-mono font-bold text-[#D4A72C] shrink-0">
                                0{wIdx + 1}.
                              </span>
                              <span className="leading-snug">{w}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
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
