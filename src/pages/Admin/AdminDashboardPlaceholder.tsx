import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { mockProjects } from '../../data/projects';
import { mockPosts } from '../../data/posts';
import { mockTechLessons } from '../../data/techLessons';
import { mockAILessons } from '../../data/aiLessons';
import { mockServices } from '../../data/services';
import { mockSkillCategories } from '../../data/skills';
import {
  FolderKanban,
  FileText,
  BookOpen,
  Sparkles,
  Layers,
  Cpu,
  Mail,
  Brain,
  ShieldAlert,
  Database,
  Plus,
  Eye,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminDashboardPlaceholder: React.FC = () => {
  const { activeTab } = useOutletContext<{ activeTab: string }>();
  const { showToast } = useToast();

  const handleActionNotice = (actionName: string) => {
    showToast(`${actionName} is scheduled for Phase 4 (Admin Authentication & CRUD implementation).`, 'info');
  };

  const statCards = [
    {
      title: 'Projects Entity',
      count: mockProjects.length,
      tab: 'Projects',
      icon: FolderKanban,
      color: 'text-[#D4A72C]',
      description: 'Normalized portfolio records',
    },
    {
      title: 'Blog Articles',
      count: mockPosts.length,
      tab: 'Blog Posts',
      icon: FileText,
      color: 'text-emerald-500',
      description: 'Technical writing & insights',
    },
    {
      title: 'Tech Lessons',
      count: mockTechLessons.length,
      tab: 'Tech Lessons',
      icon: BookOpen,
      color: 'text-blue-500',
      description: 'Curriculum modules & code snippets',
    },
    {
      title: 'AI Lessons',
      count: mockAILessons.length,
      tab: 'AI Lessons',
      icon: Sparkles,
      color: 'text-purple-500',
      description: 'AI & LLM curriculum modules',
    },
    {
      title: 'Services',
      count: mockServices.length,
      tab: 'Services',
      icon: Layers,
      color: 'text-amber-500',
      description: 'Active engineering offerings',
    },
    {
      title: 'Skill Categories',
      count: mockSkillCategories.length,
      tab: 'Skills',
      icon: Cpu,
      color: 'text-cyan-500',
      description: 'Categorized technical proficiencies',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Banner */}
      <div className="p-6 rounded-[var(--radius-xl)] border border-[#D4A72C]/30 bg-[#D4A72C]/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#D4A72C] font-mono font-bold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Phase 1 Structural Placeholder</span>
          </div>
          <Badge variant="gold">Phase 4 Target</Badge>
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text)]">
          Admin Management Portal Architecture
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
          This workspace establishes the complete layout and data models for Phase 4. During Phase 1, UI entities are read-only representations wired to mock data services. Full JWT authentication, secure session handling, and MySQL CRUD operations will be integrated in Phase 4.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} padding="md" className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[var(--color-muted)]">
                  {card.title}
                </span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[var(--color-text)] font-mono">
                  {card.count}
                </span>
                <span className="text-xs font-mono text-emerald-500">Live in Mock DB</span>
              </div>

              <p className="text-xs text-[var(--color-muted)]">
                {card.description}
              </p>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                <button
                  onClick={() => handleActionNotice(`Management view for ${card.title}`)}
                  className="text-xs font-mono font-semibold text-[#D4A72C] hover:underline"
                >
                  Manage Records ›
                </button>
                <span className="text-[10px] font-mono text-[var(--color-muted)]">
                  Table: {card.tab.toLowerCase().replace(' ', '_')}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Database Schema Status preview */}
      <Card padding="lg" className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#D4A72C]" />
            <h3 className="text-base font-bold text-[var(--color-text)]">
              Relational Schema Mapping Status (Phase 2 Preview)
            </h3>
          </div>
          <Badge variant="neutral">Normalized 3NF Ready</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)] space-y-1">
            <span className="text-[var(--color-text)] font-bold block">projects</span>
            <span className="text-[var(--color-muted)] text-[11px]">Primary & Foreign key relations</span>
          </div>
          <div className="p-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)] space-y-1">
            <span className="text-[var(--color-text)] font-bold block">blog_posts & tags</span>
            <span className="text-[var(--color-muted)] text-[11px]">Many-to-many indexed tags</span>
          </div>
          <div className="p-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)] space-y-1">
            <span className="text-[var(--color-text)] font-bold block">tech_lessons & ai_lessons</span>
            <span className="text-[var(--color-muted)] text-[11px]">Curriculum & code blocks</span>
          </div>
          <div className="p-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)] space-y-1">
            <span className="text-[var(--color-text)] font-bold block">journey_milestones</span>
            <span className="text-[var(--color-muted)] text-[11px]">Chronological event logging</span>
          </div>
          <div className="p-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)] space-y-1">
            <span className="text-[var(--color-text)] font-bold block">contact_messages</span>
            <span className="text-[var(--color-muted)] text-[11px]">Inquiry & validation queue</span>
          </div>
          <div className="p-3 rounded bg-[var(--color-bg)] border border-[var(--color-border)] space-y-1">
            <span className="text-[var(--color-text)] font-bold block">ai_knowledge_base</span>
            <span className="text-[var(--color-muted)] text-[11px]">Structured platform context</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
          <span>Target Database: MySQL 8.0 / Normalized SQL Engine</span>
          <Link to="/" className="text-[#D4A72C] hover:underline flex items-center gap-1">
            Return to Public Platform <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Card>
    </div>
  );
};
