import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { Terminal, Shield, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { profileData } from '../../data/profile';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/60 text-[var(--color-text)] transition-colors mt-20">
      <Container size="xl">
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group select-none">
              <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[#0B0B0C] border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C]">
                <span className="font-mono font-black text-sm">YK</span>
              </div>
              <span className="text-base font-bold tracking-tight text-[var(--color-text)]">
                YITBAREK.K
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed max-w-sm">
              Frontend & full-stack developer building fast React web applications, custom online stores, and 24/7 Python automation bots for clients and startups worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] transition-colors flex items-center gap-1.5 text-xs font-mono"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] transition-colors flex items-center gap-1.5 text-xs font-mono"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${profileData.socials.email}`}
                className="p-2 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] transition-colors flex items-center gap-1.5 text-xs font-mono"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Platform Columns */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] mb-3 flex items-center gap-1.5">
              <span>🛠️</span> Engineering
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-muted)]">
              <li>
                <Link to="/projects" className="hover:text-[#D4A72C] transition-colors flex items-center gap-1.5">
                  <span>💻</span> Production Projects
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#D4A72C] transition-colors flex items-center gap-1.5">
                  <span>✨</span> Services & Pricing
                </Link>
              </li>
              <li>
                <Link to="/journey" className="hover:text-[#D4A72C] transition-colors flex items-center gap-1.5">
                  <span>🚀</span> Engineering Journey
                </Link>
              </li>
              <li>
                <Link to="/cv" className="hover:text-[#D4A72C] transition-colors flex items-center gap-1.5">
                  <span>📄</span> Curriculum Vitae
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] mb-3 flex items-center gap-1.5">
              <span>📚</span> Roadmaps & Docs
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-muted)]">
              <li>
                <Link to="/resources" className="hover:text-[#D4A72C] transition-colors font-medium text-[#D4A72C] flex items-center gap-1.5">
                  <span>🗺️</span> Full-Stack Roadmap
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-[#D4A72C] transition-colors flex items-center gap-1.5">
                  <span>📖</span> Python PDF Handbook
                </Link>
              </li>
              <li>
                <Link to="/ai-lessons" className="hover:text-[#D4A72C] transition-colors flex items-center gap-1.5">
                  <span>🤖</span> AI Systems Curriculum
                </Link>
              </li>
              <li>
                <Link to="/tech-lessons" className="hover:text-[#D4A72C] transition-colors flex items-center gap-1.5">
                  <span>🐘</span> 3NF Database Guides
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#D4A72C] transition-colors flex items-center gap-1.5">
                  <span>✍️</span> Technical Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] mb-3 flex items-center gap-1.5">
              <span>🌐</span> Platform
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-muted)]">
              <li>
                <Link to="/contact" className="hover:text-[#D4A72C] transition-colors flex items-center gap-1.5">
                  <span>💬</span> Contact / Get Quote
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#D4A72C] transition-colors font-mono flex items-center gap-1.5">
                  <span>🔐</span> Admin Workspace
                </Link>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-muted)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>All Systems Operational</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--color-muted)]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} YITBAREK.K</span>
            <span>•</span>
            <span>Senior Frontend & Full-Stack Systems Engineer</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>⚡ High-Performance Architecture</span>
            <span>•</span>
            <span>TypeScript & React 19</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
