import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { Image } from '../../components/common/Image';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { DeveloperHeroVideo } from '../../components/home/DeveloperHeroVideo';
import { InteractiveAutomationLab } from '../../components/home/InteractiveAutomationLab';
import { AudienceGateways } from '../../components/home/AudienceGateways';
import { CurriculumTabsShowcase } from '../../components/home/CurriculumTabsShowcase';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { FreelanceWorkflowSection } from '../../components/home/FreelanceWorkflowSection';
import { profileData } from '../../data/profile';
import { mockProjects } from '../../data/projects';
import { projectsService } from '../../services/projectsService';
import { servicesService } from '../../services/servicesService';
import { Project, Service } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import {
  ArrowRight,
  Code2,
  Database,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  Video,
  Globe,
  Building2,
  Star,
  Users,
  Cloud,
  Map,
  FileText
} from 'lucide-react';

export const HomePage: React.FC = () => {
  useSEO({
    title: 'Full-Stack Developer & Python Automation Specialist — Yitbarek K.',
    description: 'Real portfolio of Yitbarek K. specializing in full-stack web development (e-commerce, web apps, portfolios) and Python automation (Telegram bots, AI chatbots, business workflows).',
    keywords: 'Full-Stack Developer, Python Automation, Telegram Bots, AI Chatbots, Business Automation, E-Commerce Development, Web Apps, React, Node.js, Bahir Dar University BDU'
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const [p, s] = await Promise.all([
        projectsService.getFeatured(),
        servicesService.getAll()
      ]);
      setProjects(p.slice(0, 4));
      setServices(s.slice(0, 3));
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <Container size="lg" className="py-24">
        <LoadingState message="Initializing engineering platform..." />
      </Container>
    );
  }

  if (hasError) {
    return (
      <Container size="lg" className="py-24">
        <ErrorState onRetry={loadData} />
      </Container>
    );
  }

  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-10">
      {/* 1. HERO WITH STREAMLINED VIDEO BACKGROUND */}
      <section className="relative">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col: Core Statement & Action CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 text-xs font-mono text-[#D4A72C]">
                  <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-pulse" />
                  <span>⚡ YITBAREK.K • Senior Frontend & Full-Stack Developer</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] font-mono text-[var(--color-muted)]">
                  <span>🌐</span>
                  <span>Remote Freelancer • Direct & Upwork</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text)] leading-[1.18]">
                Building Fast Web Apps &{' '}
                <span className="text-[#D4A72C]">Smart Automation</span>
              </h1>

              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
                I build fast, responsive web applications with <strong className="text-[var(--color-text)]">React, TypeScript, and modern e-commerce stores</strong>. I also create 24/7 <strong className="text-[#D4A72C]">🤖 Python bots (Telegram bots, AI assistants, and automated workflows)</strong> for clients and startups worldwide.
              </p>

              {/* Status Badge */}
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1.5 rounded-[var(--radius-md)] w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>🟢 {profileData.status}</span>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link to="/projects">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore Projects
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="secondary" size="md" leftIcon={<Sparkles className="w-4 h-4 text-[#D4A72C]" />}>
                    Services & Pricing
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="md">
                    Hire Me / Contact
                  </Button>
                </Link>
              </div>

              {/* Verified Tech Strip */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider font-bold block mb-2">
                  🛠️ Technologies I Work With:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] flex items-center gap-1.5">
                    <span>⚛️</span> React
                  </span>
                  <span className="px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] flex items-center gap-1.5">
                    <span>🔷</span> TypeScript
                  </span>
                  <span className="px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] flex items-center gap-1.5">
                    <span>🐍</span> Python
                  </span>
                  <span className="px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] flex items-center gap-1.5">
                    <span>🚀</span> FastAPI
                  </span>
                  <span className="px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] flex items-center gap-1.5">
                    <span>🐘</span> PostgreSQL
                  </span>
                  <span className="px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] flex items-center gap-1.5">
                    <span>⚡</span> Redis
                  </span>
                  <span className="px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] flex items-center gap-1.5">
                    <span>🐳</span> Docker
                  </span>
                  <span className="px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] flex items-center gap-1.5">
                    <span>💳</span> Stripe
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: High-Tech Video Component */}
            <div className="lg:col-span-6">
              <DeveloperHeroVideo />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. CORE SPECIALTIES & METRICS BANNER */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-8 sm:py-10">
        <Container size="xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-mono text-[#D4A72C]">
                <span>⚡</span>
                <span>Fast Loading</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
                98+ Lighthouse
              </p>
              <p className="text-xs text-[var(--color-muted)]">Loads under 1 second & clean code</p>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-mono text-[#D4A72C]">
                <span>🤖</span>
                <span>Python Automation</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
                Telegram & Bots
              </p>
              <p className="text-xs text-[var(--color-muted)]">24/7 bots, AI helpers & data scripts</p>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-mono text-[#D4A72C]">
                <span>🌐</span>
                <span>Remote Delivery</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
                US & EU Hours
              </p>
              <p className="text-xs text-[var(--color-muted)]">Flexible schedule & fast replies</p>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-mono text-[#D4A72C]">
                <span>⭐</span>
                <span>Client Guarantee</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
                100% On-Time
              </p>
              <p className="text-xs text-[var(--color-muted)]">Clear milestones & 30-day bug warranty</p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. INTERACTIVE AUTOMATION & BOT ENGINEERING LAB */}
      <Container size="xl">
        <InteractiveAutomationLab />
      </Container>

      {/* 4. AUDIENCE GATEWAYS: FOR CLIENTS, LEARNERS, & FELLOW DEVS */}
      <Container size="xl">
        <AudienceGateways />
      </Container>

      {/* 4. CURATED DEVELOPER ROADMAPS, AI LESSONS & HANDBOOKS (TABBED SHOWCASE) */}
      <div className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-6 sm:py-10">
        <Container size="xl">
          <CurriculumTabsShowcase />
        </Container>
      </div>

      {/* 5. FEATURED FLAGSHIP PROJECTS (CURATED & CLEAN) */}
      <section>
        <Container size="xl">
          <SectionHeading
            badgeText="Portfolio"
            title="Featured Projects & Bots"
            subtitle="Real web apps, online stores, Telegram bots, and automated business scripts."
            action={
              <Link to="/projects">
                <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  View All Projects ({mockProjects.length})
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project) => (
              <Card key={project.id} hoverEffect padding="none" className="flex flex-col overflow-hidden border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="relative">
                  <Image
                    asset={project.images[0]}
                    aspectRatio="video"
                    showTemporaryBadge
                    className="h-48 sm:h-52 w-full"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="gold">{project.category}</Badge>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)] hover:text-[#D4A72C] transition-colors">
                      <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-bg)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-xs font-semibold text-[#D4A72C] hover:text-[#B88A18] flex items-center gap-1"
                    >
                      Technical Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] font-mono text-[var(--color-muted)]">
                      {project.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. INTERNATIONAL FREELANCE & REMOTE COLLABORATION ARCHITECTURE */}
      <Container size="xl">
        <FreelanceWorkflowSection />
      </Container>

      {/* 7. VERIFIED TESTIMONIALS & CLIENT REVIEWS */}
      <div className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <TestimonialsSection />
      </div>

      {/* 7. MINIMALIST CONTACT / COLLABORATION BANNER */}
      <section>
        <Container size="xl">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-12 shadow-[var(--shadow-card)] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <Badge variant="gold">Available for New Projects</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
                Have an Idea for a Website or Automation Bot?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                I am ready to help you build your next web application, custom online store, or Telegram bot. Let's discuss your timeline and budget.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link to="/contact">
                <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Get in Touch
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="md">
                  View Services & Pricing
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

