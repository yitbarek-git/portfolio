import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/common/Container';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { profileData } from '../../data/profile';
import { useSEO } from '../../hooks/useSEO';
import {
  Code2,
  Database,
  Terminal,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Video,
  MapPin,
  Laptop,
  Users,
  Award,
  Globe2,
  Building2,
  Star,
  Presentation,
  Zap,
  Check,
  Briefcase,
  Clock,
  Lock
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  useSEO({
    title: 'About Yitbarek K. — Senior Frontend & Full-Stack Engineer',
    description: 'Senior Frontend & Full-Stack Engineer specializing in sub-second React 19/TypeScript web platforms, custom E-Commerce, and Python bots for international clients and startups.',
    keywords: 'Senior Frontend Engineer, React TypeScript Developer, Freelance Full-Stack Developer, Upwork Remote Engineer, Python Bot Developer'
  });

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <Container size="lg">
        {/* Profile Intro */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold">Engineering Profile & Philosophy</Badge>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-[var(--color-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-0.5 rounded-full">
              <Globe2 className="w-3 h-3 text-[#D4A72C]" />
              Remote-First • Available for International Contracts
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
            Senior Frontend & Full-Stack Developer
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            I work with startups, businesses, and founders to build fast web applications, clean user interfaces, and custom online stores. I also build 24/7 Python automation bots and write practical learning guides for over 20,000 developers worldwide.
          </p>
        </div>

        {/* 3 Core Disciplines (Frontend Flagship) */}
        <div className="space-y-6 pt-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
            What I Do Best
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Frontend (Leading Flagship) */}
            <Card padding="md" className="space-y-3 border-t-2 border-t-[#D4A72C]">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[var(--color-text)]">Frontend Web Development</h3>
                <span className="text-[10px] font-mono text-[#D4A72C] font-semibold bg-[#D4A72C]/10 px-2 py-0.5 rounded">Core</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                Turning your Figma designs into clean, responsive React and TypeScript websites. Built to load in under a second and look great on every phone and screen.
              </p>
            </Card>

            {/* Pillar 2: Full-Stack & Python Bots */}
            <Card padding="md" className="space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text)]">Full-Stack & Python Automation</h3>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                Building reliable backends with Node.js, FastAPI, and PostgreSQL. Creating 24/7 Telegram bots, automated membership channels, and data scripts.
              </p>
            </Card>

            {/* Pillar 3: Engineering Education */}
            <Card padding="md" className="space-y-3">
              <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-text)]">Developer Guides & Roadmaps</h3>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                Sharing step-by-step guides, free Python handbooks, and practical architecture cheatsheets with more than 20,000 developers around the world.
              </p>
            </Card>
          </div>
        </div>

        {/* INTERNATIONAL CLIENT WORKING MODEL */}
        <div className="space-y-6 pt-8 border-t border-[var(--color-border)]">
          <div className="space-y-2">
            <Badge variant="gold">Client Guarantees</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
              How I Work With Remote Clients & Startups
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
              Whether you hire me through Upwork, a direct milestone contract, or an agency, you work directly with me—with fast turnaround times and zero agency middlemen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2.5">
              <div className="flex items-center gap-2 text-[#D4A72C]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Milestone Payments</span>
              </div>
              <h3 className="text-sm font-bold text-[var(--color-text)]">Zero Upfront Financial Risk</h3>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                We break projects into clear milestones. You review live preview links on a staging server before approving any payments.
              </p>
            </div>

            <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2.5">
              <div className="flex items-center gap-2 text-[#D4A72C]">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Timezone Friendly</span>
              </div>
              <h3 className="text-sm font-bold text-[var(--color-text)]">4–6 Hours US & EU Overlap</h3>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                Daily overlapping work hours with US and European clients. Clear daily updates, Loom video walkthroughs, and fast replies on Slack.
              </p>
            </div>

            <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2.5">
              <div className="flex items-center gap-2 text-[#D4A72C]">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">100% Code Ownership</span>
              </div>
              <h3 className="text-sm font-bold text-[var(--color-text)]">Full Ownership & 30-Day Warranty</h3>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                You own 100% of the code upon project completion. I sign NDAs upon request and provide 30 days of free bug fixes after launch.
              </p>
            </div>
          </div>
        </div>

        {/* GLOBAL MENTORSHIP IMPACT */}
        <div className="space-y-6 pt-8 border-t border-[var(--color-border)]">
          <div className="space-y-2">
            <Badge variant="gold">Educational Impact</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
              Developer Mentorship: 20k+ Global Community
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
              I believe senior engineering isn't just about shipping code—it's about elevating the craft. Through structured learning materials and video walkthroughs, I have guided over 20,000 developers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-[#D4A72C]">
                <Globe2 className="w-4 h-4" />
                <span>Global Learners</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
                20,000+
              </p>
              <p className="text-[11px] text-[var(--color-muted)]">Across 25+ countries</p>
            </div>

            <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-[#D4A72C]">
                <BookOpen className="w-4 h-4" />
                <span>Production Guides</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
                48-Page
              </p>
              <p className="text-[11px] text-[var(--color-muted)]">Python & 3NF SQL Handbooks</p>
            </div>

            <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-[#D4A72C]">
                <Zap className="w-4 h-4" />
                <span>Lighthouse Score</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
                98+
              </p>
              <p className="text-[11px] text-[var(--color-muted)]">Guaranteed web performance</p>
            </div>

            <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-mono text-[#D4A72C]">
                <Star className="w-4 h-4" />
                <span>Contract Success</span>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
                100%
              </p>
              <p className="text-[11px] text-[var(--color-muted)]">On-time milestone delivery</p>
            </div>
          </div>
        </div>

        {/* Academic Reference (Single concise mention) */}
        <div className="space-y-4 pt-8 border-t border-[var(--color-border)]">
          <h2 className="text-xl font-bold text-[var(--color-text)] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#D4A72C]" />
            Academic Foundation
          </h2>

          <div className="p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] space-y-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              Earned a Bachelor of Science (B.Sc.) in <strong className="text-[var(--color-text)]">Software Engineering from Bahir Dar University (BDU)</strong>. The curriculum established my rigorous groundwork in computational discrete mathematics, asymptotic algorithmic complexity, data structures, and relational database normalization theory—principles that directly inform my production frontend and backend architectures today.
            </p>
          </div>
        </div>

        {/* Engineering Standards Checklist */}
        <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)]">
            Production Engineering Standards
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[var(--color-muted)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span>Strict TypeScript type safety with zero any casts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span>Sub-second Largest Contentful Paint (LCP &lt; 0.8s) & CLS &lt; 0.05</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span>ACID-compliant 3NF database design with parameterized queries</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0" />
              <span>Asyncio non-blocking concurrency for Python bots & scrapers</span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-6 flex flex-wrap items-center gap-4">
          <Link to="/contact">
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Hire for Next Project / Contract
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="secondary" size="md" leftIcon={<Briefcase className="w-4 h-4 text-[#D4A72C]" />}>
              View Services & Deliverables
            </Button>
          </Link>
          <Link to="/resources">
            <Button variant="outline" size="md" leftIcon={<BookOpen className="w-4 h-4 text-[#D4A72C]" />}>
              Free Handbooks & Roadmaps
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

