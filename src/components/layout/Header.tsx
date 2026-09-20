import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  Terminal,
  Sparkles,
  LayoutDashboard,
  ChevronDown,
  Code2,
  Brain,
  Database,
  Layers,
  Cpu,
  FileText,
  Map,
  ArrowRight,
  Globe,
  Server,
  Cloud,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Download
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Container } from '../common/Container';
import { QuickSearchModal } from './QuickSearchModal';

interface NavSubItem {
  title: string;
  description: string;
  path: string;
  icon: React.ElementType;
  tag?: string;
  color?: string;
}

interface NavGroup {
  id: string;
  label: string;
  path?: string;
  badge?: string;
  isMega?: boolean;
  columns?: {
    heading: string;
    items: NavSubItem[];
  }[];
  subItems?: NavSubItem[];
  footer?: {
    primaryText: string;
    primaryPath: string;
    secondaryText?: string;
    secondaryPath?: string;
  };
}

const navigationGroups: NavGroup[] = [
  {
    id: 'tutorials',
    label: 'Tutorials & AI',
    path: '/tech-lessons',
    badge: 'Curriculum',
    isMega: true,
    columns: [
      {
        heading: '🤖 AI & Smart Automation',
        items: [
          {
            title: 'AI for Coding',
            description: 'Learn how to use AI models to write, test, and improve code with TypeScript.',
            path: '/ai-lessons',
            icon: Code2,
            tag: 'TypeScript AI',
            color: 'text-[#D4A72C]'
          },
          {
            title: 'Autonomous AI Agents',
            description: 'Build smart agents that run tools and solve multi-step tasks automatically.',
            path: '/ai-lessons/tool-calling-and-agentic-execution-loops',
            icon: Terminal,
            tag: 'Agents',
            color: 'text-emerald-400'
          },
          {
            title: 'Search & Vector Knowledge',
            description: 'Search documents by meaning and connect private knowledge to AI models.',
            path: '/ai-lessons/retrieval-augmented-generation-pipeline-design',
            icon: Layers,
            tag: 'Vectors & SQL',
            color: 'text-sky-400'
          },
          {
            title: 'Images & Audio with AI',
            description: 'Process photos, speech, and documents automatically using AI.',
            path: '/ai-lessons/multimodal-vision-and-audio-pipelines',
            icon: Brain,
            tag: 'Multimodal',
            color: 'text-amber-400'
          }
        ]
      },
      {
        heading: '⚡ Web & Software Development',
        items: [
          {
            title: 'Frontend & Modern Web',
            description: 'Build fast, responsive, and accessible websites using React and TypeScript.',
            path: '/tech-lessons?category=Web Dev',
            icon: Globe,
            tag: 'React & TS',
            color: 'text-orange-400'
          },
          {
            title: 'Clean Database Design',
            description: 'Organize relational tables clearly and write fast, reliable SQL queries.',
            path: '/tech-lessons/3nf-relational-database-normalization',
            icon: Database,
            tag: 'PostgreSQL',
            color: 'text-purple-400'
          },
          {
            title: 'Python APIs & Scripts',
            description: 'Create fast web APIs, background scripts, and automation bots in Python.',
            path: '/tech-lessons/python-concurrency-asyncio-pipelines',
            icon: Server,
            tag: 'FastAPI',
            color: 'text-emerald-400'
          },
          {
            title: 'C++ Systems & Memory',
            description: 'Learn how computer memory works, pointer basics, and fast algorithms.',
            path: '/tech-lessons/cpp-memory-management-pointers-stl',
            icon: Cpu,
            tag: 'Systems',
            color: 'text-sky-400'
          }
        ]
      }
    ],
    footer: {
      primaryText: 'Explore All AI Lessons →',
      primaryPath: '/ai-lessons',
      secondaryText: 'View All 15+ Tech Lessons →',
      secondaryPath: '/tech-lessons'
    }
  },
  {
    id: 'resources',
    label: 'Resources',
    path: '/resources',
    badge: 'Downloads',
    subItems: [
      {
        title: 'Full-Stack Web Dev Roadmap',
        description: 'A step-by-step learning guide from beginner to full-stack developer.',
        path: '/resources',
        icon: Map,
        tag: 'Roadmap',
        color: 'text-[#D4A72C]'
      },
      {
        title: 'Python Handbook (Free PDF)',
        description: 'A 48-page practical guide to building real-world Python apps and APIs.',
        path: '/resources',
        icon: FileText,
        tag: 'PDF Download',
        color: 'text-emerald-400'
      },
      {
        title: 'Database Normalization Guide',
        description: 'A simple visual cheat sheet to organize database tables without duplicate data.',
        path: '/resources',
        icon: Database,
        tag: 'SQL Cheat Sheet',
        color: 'text-purple-400'
      },
      {
        title: 'Production API Starter Kit',
        description: 'A ready-to-use project template for secure and typed REST APIs.',
        path: '/resources',
        icon: Server,
        tag: 'Starter Template',
        color: 'text-sky-400'
      }
    ],
    footer: {
      primaryText: 'View All Developer Guides & Downloads →',
      primaryPath: '/resources'
    }
  }
];

export const Header: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md transition-colors">
        <Container size="xl">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo & Brand Identity */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group select-none focus-visible:outline-none shrink-0"
              aria-label="YITBAREK.K Home"
            >
              <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[#0B0B0C] border border-[#D4A72C]/40 flex items-center justify-center text-[#D4A72C] group-hover:border-[#D4A72C] transition-colors shadow-xs">
                <span className="font-mono font-black text-sm tracking-tighter">YK</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-[var(--color-text)] flex items-center gap-1.5">
                  YITBAREK.K
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
                </span>
                <span className="text-[10px] font-mono text-[var(--color-muted)] leading-none hidden sm:inline">
                  Frontend & Full-Stack Developer
                </span>
              </div>
            </Link>

            {/* Desktop Navigation: Crisp, Clean & Uncluttered */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-medium" aria-label="Main Navigation">
              {/* 1. Projects */}
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-[var(--radius-sm)] transition-colors ${
                    isActive
                      ? 'text-[#D4A72C] font-semibold bg-[#D4A72C]/10 border border-[#D4A72C]/20'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                  }`
                }
              >
                Projects
              </NavLink>

              {/* 2. Services */}
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-[var(--radius-sm)] transition-colors ${
                    isActive
                      ? 'text-[#D4A72C] font-semibold bg-[#D4A72C]/10 border border-[#D4A72C]/20'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                  }`
                }
              >
                Services
              </NavLink>

              {/* 3 & 4. Dropdowns: Tutorials & AI + Resources */}
              {navigationGroups.map((group) => {
                const isOpen = activeDropdown === group.id;
                const isCurrent =
                  group.path &&
                  (location.pathname.startsWith(group.path.split('?')[0]) ||
                    (group.id === 'tutorials' && location.pathname.startsWith('/ai-lessons')));

                return (
                  <div
                    key={group.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(group.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius-sm)] transition-colors cursor-pointer focus-visible:outline-none ${
                        isOpen || isCurrent
                          ? 'text-[#D4A72C] font-semibold bg-[#D4A72C]/10 border border-[#D4A72C]/20'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#D4A72C]' : 'text-[var(--color-muted)]'
                        }`}
                      />
                      {group.badge && (
                        <span className="hidden xl:inline-block px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-[#D4A72C]/15 text-[#D4A72C] border border-[#D4A72C]/30">
                          {group.badge}
                        </span>
                      )}
                    </button>

                    {/* Mega Dropdown for Tutorials & AI */}
                    {isOpen && group.isMega && (
                      <div
                        className="absolute top-full -left-12 xl:left-0 mt-1 w-[560px] xl:w-[600px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                        onMouseEnter={() => handleMouseEnter(group.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {group.columns?.map((col, cIdx) => (
                            <div key={cIdx} className="space-y-1.5">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text)] font-bold block px-2 pb-1 border-b border-[var(--color-border)]">
                                {col.heading}
                              </span>
                              <div className="space-y-1">
                                {col.items.map((sub, sIdx) => {
                                  const SubIcon = sub.icon;
                                  return (
                                    <Link
                                      key={sIdx}
                                      to={sub.path}
                                      onClick={() => setActiveDropdown(null)}
                                      className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] border border-transparent hover:border-[var(--color-border)] transition-all flex items-start gap-2.5 group/sub"
                                    >
                                      <div className={`p-1.5 rounded-[var(--radius-sm)] bg-[var(--color-bg)] border border-[var(--color-border)] ${sub.color || 'text-[#D4A72C]'} group-hover/sub:scale-105 transition-transform shrink-0`}>
                                        <SubIcon className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="flex-1 min-w-0 space-y-0.5">
                                        <div className="flex items-center justify-between gap-1">
                                          <span className="text-xs font-bold text-[var(--color-text)] group-hover/sub:text-[#D4A72C] transition-colors truncate">
                                            {sub.title}
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-[var(--color-muted)] leading-tight line-clamp-1">
                                          {sub.description}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Mega Dropdown Dual Footer */}
                        {group.footer && (
                          <div className="pt-2.5 border-t border-[var(--color-border)] flex items-center justify-between px-2 text-[11px] font-mono">
                            <Link
                              to={group.footer.primaryPath}
                              onClick={() => setActiveDropdown(null)}
                              className="text-[#D4A72C] hover:underline font-semibold"
                            >
                              {group.footer.primaryText}
                            </Link>
                            {group.footer.secondaryText && (
                              <Link
                                to={group.footer.secondaryPath || group.footer.primaryPath}
                                onClick={() => setActiveDropdown(null)}
                                className="text-[var(--color-muted)] hover:text-[var(--color-text)] hover:underline"
                              >
                                {group.footer.secondaryText}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Standard Dropdown for Resources */}
                    {isOpen && !group.isMega && (
                      <div
                        className="absolute top-full left-0 mt-1 w-[380px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl p-3 space-y-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                        onMouseEnter={() => handleMouseEnter(group.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="grid grid-cols-1 gap-1">
                          {group.subItems?.map((sub, sIdx) => {
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sIdx}
                                to={sub.path}
                                onClick={() => setActiveDropdown(null)}
                                className="p-2.5 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] border border-transparent hover:border-[var(--color-border)] transition-all flex items-start gap-3 group/sub"
                              >
                                <div className={`p-2 rounded-[var(--radius-sm)] bg-[var(--color-bg)] border border-[var(--color-border)] ${sub.color || 'text-[#D4A72C]'} group-hover/sub:scale-105 transition-transform shrink-0`}>
                                  <SubIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0 space-y-0.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-bold text-[var(--color-text)] group-hover/sub:text-[#D4A72C] transition-colors truncate">
                                      {sub.title}
                                    </span>
                                    {sub.tag && (
                                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--color-bg)] text-[var(--color-muted)] border border-[var(--color-border)] shrink-0">
                                        {sub.tag}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-[var(--color-muted)] leading-tight line-clamp-2">
                                    {sub.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {group.footer && (
                          <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between px-2 text-[11px]">
                            <Link
                              to={group.footer.primaryPath}
                              onClick={() => setActiveDropdown(null)}
                              className="font-mono text-[#D4A72C] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>{group.footer.primaryText}</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* 5. About */}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-[var(--radius-sm)] transition-colors ${
                    isActive
                      ? 'text-[#D4A72C] font-semibold bg-[#D4A72C]/10 border border-[#D4A72C]/20'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                  }`
                }
              >
                About
              </NavLink>

              {/* 6. Resume */}
              <NavLink
                to="/cv"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-[var(--radius-sm)] transition-colors ${
                    isActive
                      ? 'text-[#D4A72C] font-semibold bg-[#D4A72C]/10 border border-[#D4A72C]/20'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                  }`
                }
              >
                Resume
              </NavLink>
            </nav>

            {/* Right Action Icons & Primary CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Quick Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-[var(--radius-sm)] text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface-hover)] border border-[var(--color-border)] transition-colors focus-visible:outline-none cursor-pointer"
                aria-label="Quick Search (Ctrl+K)"
                title="Quick Search (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px] font-mono">Search</span>
                <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-muted)]">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] transition-colors focus-visible:outline-none cursor-pointer"
                aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#D4A72C]" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--color-text)]" />
                )}
              </button>

              {/* Direct Hire Me / Contact CTA Button */}
              <Link
                to="/contact"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-[var(--radius-sm)] bg-[#D4A72C] text-[#0B0B0C] font-bold text-xs hover:bg-[#c49824] transition-colors shadow-xs"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] transition-colors focus-visible:outline-none"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5 shadow-2xl max-h-[80vh] overflow-y-auto space-y-4 animate-in fade-in duration-150">
            {/* Quick Navigation 4-card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-3 border-b border-[var(--color-border)]">
              <Link
                to="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[var(--radius-sm)] text-xs font-bold text-center bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[#D4A72C] flex items-center justify-center gap-1.5"
              >
                <span>💻</span>
                <span>Projects</span>
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[var(--radius-sm)] text-xs font-bold text-center bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[#D4A72C] flex items-center justify-center gap-1.5"
              >
                <span>✨</span>
                <span>Services</span>
              </Link>
              <Link
                to="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[var(--radius-sm)] text-xs font-bold text-center bg-[var(--color-bg)] border border-[#D4A72C]/40 text-[#D4A72C] flex items-center justify-center gap-1.5"
              >
                <span>📚</span>
                <span>Resources</span>
              </Link>
              <Link
                to="/cv"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-[var(--radius-sm)] text-xs font-bold text-center bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[#D4A72C] flex items-center justify-center gap-1.5"
              >
                <span>📄</span>
                <span>Resume</span>
              </Link>
            </div>

            {/* Accordion Categories */}
            <div className="space-y-2">
              {navigationGroups.map((group) => {
                const isExpanded = mobileExpandedSection === group.id;
                const allItems = group.isMega
                  ? group.columns?.flatMap((col) => col.items) || []
                  : group.subItems || [];

                return (
                  <div key={group.id} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden">
                    <button
                      onClick={() => setMobileExpandedSection(isExpanded ? null : group.id)}
                      className="w-full p-3 flex items-center justify-between text-xs font-bold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                    >
                      <span className="flex items-center gap-2">
                        <span>{group.label}</span>
                        {group.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#D4A72C]/20 text-[#D4A72C]">
                            {group.badge}
                          </span>
                        )}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-[#D4A72C]' : 'text-[var(--color-muted)]'}`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="p-2.5 pt-0 border-t border-[var(--color-border)]/50 space-y-1.5">
                        {allItems.map((sub, idx) => {
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={idx}
                              to={sub.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className="p-2 rounded flex items-center gap-2.5 hover:bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:text-[#D4A72C]"
                            >
                              <SubIcon className={`w-3.5 h-3.5 ${sub.color || 'text-[#D4A72C]'}`} />
                              <span className="font-semibold truncate">{sub.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Additional Links */}
            <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[var(--color-muted)] hover:text-[var(--color-text)]"
              >
                About
              </Link>
              <Link
                to="/journey"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[var(--color-muted)] hover:text-[var(--color-text)]"
              >
                Journey
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[var(--color-muted)] hover:text-[#D4A72C]"
              >
                Admin
              </Link>
            </div>

            {/* Primary Mobile Action */}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-[var(--radius-sm)] bg-[#D4A72C] text-[#0B0B0C] font-bold text-xs text-center flex items-center justify-center gap-2"
            >
              <span>Work With Me / Contact</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
