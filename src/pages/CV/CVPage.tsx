import React, { useState, useEffect } from 'react';
import { Container } from '../../components/common/Container';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { profileData } from '../../data/profile';
import { skillsService } from '../../services/skillsService';
import { projectsService } from '../../services/projectsService';
import { SkillCategory, Project } from '../../types';
import { useSEO } from '../../hooks/useSEO';
import { Printer, Download, Mail, Github, Linkedin, ExternalLink, GraduationCap, Code2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const CVPage: React.FC = () => {
  useSEO({
    title: 'Curriculum Vitae — Senior Frontend & Full-Stack Engineer — Yitbarek K.',
    description: 'Senior Frontend & Full-Stack Engineer with verified expertise in React 19, TypeScript, Python bots, and remote international contract delivery.',
    keywords: 'Senior Frontend Engineer Resume, React TypeScript Developer CV, Remote Contract Developer, Freelance Full-Stack Engineer, Python Telegram Bot Developer'
  });

  const { showToast } = useToast();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    skillsService.getAllCategories().then(setSkillCategories);
    projectsService.getFeatured().then(setProjects);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container size="lg">
        {/* Action Header Bar (Hidden in Print) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)] print:hidden">
          <div>
            <Badge variant="gold">Curriculum Vitae</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mt-1">
              Engineering Resume & Track Record
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-8 sm:p-12 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] space-y-10 print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[var(--color-border)]">
            <div className="space-y-1.5">
              <h2 className="text-3xl font-black tracking-tight text-[var(--color-text)]">
                {profileData.name}
              </h2>
              <p className="text-sm font-mono font-semibold text-[#D4A72C]">
                Senior Frontend & Full-Stack Systems Engineer
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Remote Contracts • Available Worldwide (US/EU Timezone Synchronized)
              </p>
            </div>

            <div className="space-y-1 text-xs font-mono text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4A72C]" />
                <a href={`mailto:${profileData.socials.email}`} className="hover:underline">
                  {profileData.socials.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-[#D4A72C]" />
                <a href={profileData.socials.github} target="_blank" rel="noreferrer" className="hover:underline">
                  github.com/yitbarek-k
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-[#D4A72C]" />
                <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  linkedin.com/in/yitbarek-k
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] pb-1 border-b border-[var(--color-border)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
              Executive Profile
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Senior Frontend & Full-Stack Engineer specializing in high-performance React 19/TypeScript web platforms, accessible design systems, and custom E-Commerce applications with sub-second LCP and 98+ Lighthouse scores. Proven track record partnering with international startups and remote teams via milestone-based escrow contracts, supplemented by high-concurrency Python bot automation and technical mentorship empowering 20,000+ developers globally.
            </p>
          </section>

          {/* Professional Experience */}
          <section className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] pb-1 border-b border-[var(--color-border)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
              Engineering & Contract Experience
            </h3>

            {/* Experience 1: International Freelance Contracts */}
            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-hover)] border border-[var(--color-border)] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                <div>
                  <span className="font-bold text-[var(--color-text)] text-sm">
                    Senior Frontend & Remote Full-Stack Engineer
                  </span>
                  <span className="block text-[11px] text-[var(--color-muted)] font-sans">
                    Independent Contractor • International Clients (US, Canada, Europe)
                  </span>
                </div>
                <span className="text-[#D4A72C] shrink-0 font-semibold">2022 — Present</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--color-muted)] pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A72C] font-bold">›</span>
                  <span><strong>Frontend Excellence:</strong> Architected responsive, accessible client portals and e-commerce web applications using React 19, TypeScript, and modern CSS, ensuring sub-0.8s LCP and 98+ Google Lighthouse benchmarks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A72C] font-bold">›</span>
                  <span><strong>Full-Stack Integrations:</strong> Built secure backend APIs with Node.js/FastAPI and normalized 3NF PostgreSQL schemas, integrating Stripe webhooks, JWT auth, and automated email/webhook triggers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A72C] font-bold">›</span>
                  <span><strong>Python Bot Infrastructures:</strong> Deployed asynchronous Telegram bots using aiogram 3.x, Redis rate limiting, and automated webhook dispatchers for customer engagement and digital fulfillment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A72C] font-bold">›</span>
                  <span><strong>International Client Workflow:</strong> Maintained 4–6 hours daily overlap with North American and European timezones, delivering sprint updates via Loom, comprehensive documentation, and 100% on-time milestone releases.</span>
                </li>
              </ul>
            </div>

            {/* Experience 2: Mentorship & Technical Education */}
            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-hover)] border border-[var(--color-border)] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                <div>
                  <span className="font-bold text-[var(--color-text)] text-sm">
                    Lead Technical Educator & Engineering Mentor
                  </span>
                  <span className="block text-[11px] text-[var(--color-muted)] font-sans">
                    Global Digital Knowledge Platform & Developer Workshops
                  </span>
                </div>
                <span className="text-[#D4A72C] shrink-0 font-semibold">2023 — Present</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--color-muted)] pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A72C] font-bold">›</span>
                  <span><strong>20,000+ Global Community:</strong> Authored in-depth engineering roadmaps, code walkthroughs, and practical developer handbooks covering modern frontend architecture and Python automation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4A72C] font-bold">›</span>
                  <span><strong>Hands-On Sprints:</strong> Hosted interactive workshops focused on database 3NF normalization, asynchronous event loops, and clean component composition.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Technical Skills Matrix */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] pb-1 border-b border-[var(--color-border)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
              Core Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-xs space-y-1">
                <span className="font-bold text-[var(--color-text)] font-mono block">
                  ⚡ Frontend & UI Systems (Flagship):
                </span>
                <p className="text-[var(--color-muted)]">
                  React 19, TypeScript, Next.js, Tailwind CSS, Responsive Systems, Core Web Vitals (LCP/CLS), WCAG Accessibility, Zustand.
                </p>
              </div>

              <div className="text-xs space-y-1">
                <span className="font-bold text-[var(--color-text)] font-mono block">
                  🤖 Python & Automation Engineering:
                </span>
                <p className="text-[var(--color-muted)]">
                  Python 3.12, aiogram 3.x (Telegram Bots), FastAPI, BeautifulSoup4, Asyncio, Celery, Business ETL & Web Scraping.
                </p>
              </div>

              <div className="text-xs space-y-1">
                <span className="font-bold text-[var(--color-text)] font-mono block">
                  💾 Backend & Database Architecture:
                </span>
                <p className="text-[var(--color-muted)]">
                  Node.js, Express, PostgreSQL, MySQL (3NF Normalization), Redis Caching, RESTful APIs, Stripe Webhooks.
                </p>
              </div>

              <div className="text-xs space-y-1">
                <span className="font-bold text-[var(--color-text)] font-mono block">
                  🌐 Collaboration & Delivery:
                </span>
                <p className="text-[var(--color-muted)]">
                  Git/GitHub, Docker, CI/CD, Upwork Milestone Escrow, US/EU Timezone Overlap, Clean Code & Agile Sprints.
                </p>
              </div>
            </div>
          </section>

          {/* Key Featured Projects */}
          <section className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] pb-1 border-b border-[var(--color-border)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
              Selected Production Projects
            </h3>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-text)] text-sm">
                      {proj.title} <span className="font-normal text-[var(--color-muted)] font-mono">({proj.category})</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#D4A72C]">{proj.status}</span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1 text-[10px] font-mono text-[var(--color-muted)]">
                    <span className="font-semibold text-[var(--color-text)]">Stack:</span>
                    <span>{proj.technologies.join(' • ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education (Concise Single Reference to BDU) */}
          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] pb-1 border-b border-[var(--color-border)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
              Academic Background
            </h3>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                <span className="font-bold text-[var(--color-text)] text-sm">
                  Bachelor of Science (B.Sc.) in Software Engineering
                </span>
                <span className="text-[#D4A72C]">2020 — 2024</span>
              </div>
              <p className="text-xs text-[var(--color-muted)] font-medium">
                Bahir Dar University (BDU) — Bahir Dar Institute of Technology (BiT)
              </p>
              <div className="pt-1">
                <span className="text-[11px] font-mono text-[var(--color-text-secondary)] block mb-1">
                  Relevant Foundation:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Data Structures & Algorithms',
                    'Relational Database Normalization (3NF)',
                    'Distributed Systems',
                    'Object-Oriented Design Patterns',
                    'Web Engineering & Network Protocols'
                  ].map((course) => (
                    <span
                      key={course}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-surface-hover)] text-[var(--color-muted)] border border-[var(--color-border)]"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};
