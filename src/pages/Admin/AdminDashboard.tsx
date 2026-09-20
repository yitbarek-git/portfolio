import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { projectsService } from '../../services/projectsService';
import { postsService } from '../../services/postsService';
import { techLessonsService } from '../../services/techLessonsService';
import { aiLessonsService } from '../../services/aiLessonsService';
import { contactService, AdminMessage } from '../../services/contactService';
import { Project, BlogPost, TechLesson, AILesson } from '../../types';
import { useToast } from '../../context/ToastContext';
import {
  FolderKanban,
  FileText,
  BookOpen,
  Sparkles,
  Layers,
  Cpu,
  Mail,
  Brain,
  Database,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Star,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Copy,
  Download,
  AlertTriangle,
  Clock,
  Send,
  Eye,
  Check
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { activeTab, setActiveTab } = useOutletContext<{ activeTab: string; setActiveTab: (t: string) => void }>();
  const { showToast } = useToast();

  // Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [techLessons, setTechLessons] = useState<TechLesson[]>([]);
  const [aiLessons, setAILessons] = useState<AILesson[]>([]);
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  // Post Modal State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  // Lesson Modal State
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Partial<TechLesson> | null>(null);

  // Refresh All Data
  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [projList, postList, tlList, alList, msgList] = await Promise.all([
        projectsService.getAll(),
        postsService.getAll(),
        techLessonsService.getAll(),
        aiLessonsService.getAll(),
        contactService.getAllMessages(),
      ]);
      setProjects(projList);
      setPosts(postList);
      setTechLessons(tlList);
      setAILessons(alList);
      setMessages(msgList);
    } catch {
      showToast('Error syncing with backend database', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Project CRUD Actions
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) {
      showToast('Project title is required', 'error');
      return;
    }

    try {
      if (editingProject.id) {
        const updated = await projectsService.update(editingProject.id, editingProject);
        setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
        showToast('Project updated successfully', 'success');
      } else {
        const created = await projectsService.create(editingProject);
        setProjects(prev => [created, ...prev]);
        showToast('Project created successfully', 'success');
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
    } catch {
      showToast('Failed to save project', 'error');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await projectsService.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      showToast('Project deleted', 'info');
    } catch {
      showToast('Failed to delete project', 'error');
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const updated = await projectsService.update(project.id, { featured: !project.featured });
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
      showToast(updated.featured ? 'Marked as featured' : 'Removed from featured', 'success');
    } catch {
      showToast('Failed to update featured status', 'error');
    }
  };

  // Blog Post CRUD Actions
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title) {
      showToast('Post title is required', 'error');
      return;
    }

    try {
      if (editingPost.id) {
        const updated = await postsService.update(editingPost.id, editingPost);
        setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
        showToast('Article updated', 'success');
      } else {
        const created = await postsService.create(editingPost);
        setPosts(prev => [created, ...prev]);
        showToast('Article published', 'success');
      }
      setIsPostModalOpen(false);
      setEditingPost(null);
    } catch {
      showToast('Failed to save article', 'error');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await postsService.delete(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      showToast('Article deleted', 'info');
    } catch {
      showToast('Failed to delete article', 'error');
    }
  };

  // Contact Message Management
  const handleUpdateMessageStatus = async (id: string, status: 'unread' | 'reviewed' | 'replied' | 'archived') => {
    try {
      await contactService.updateStatus(id, status);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      showToast(`Message marked as ${status}`, 'success');
    } catch {
      showToast('Failed to update message status', 'error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await contactService.deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      showToast('Message deleted', 'info');
    } catch {
      showToast('Failed to delete message', 'error');
    }
  };

  const handleResetDatabase = async () => {
    if (!window.confirm('Reset database to default seed data? All custom additions will revert to initial state.')) return;
    try {
      await fetch('/api/admin/reset', { method: 'POST' });
      await loadAllData();
      showToast('Database reset to defaults', 'success');
    } catch {
      showToast('Reset failed', 'error');
    }
  };

  // Render Based on Active Tab
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl font-black tracking-tight text-[var(--color-text)]">
              Admin Workspace & Engine
            </h1>
          </div>
          <p className="text-xs text-[var(--color-muted)] font-mono mt-1">
            Full-Stack Management • REST API & 3NF SQL Integration Active
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={loadAllData}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
          >
            Sync Store
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={handleResetDatabase}
          >
            Reset Seed Data
          </Button>
        </div>
      </div>

      {/* TAB: DASHBOARD OVERVIEW */}
      {activeTab === 'Dashboard' && (
        <div className="space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card padding="md" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
                <span>Projects Entity</span>
                <FolderKanban className="w-4 h-4 text-[#D4A72C]" />
              </div>
              <div className="text-2xl font-black font-mono text-[var(--color-text)]">
                {projects.length}
              </div>
              <p className="text-[11px] text-emerald-500 font-mono">
                {projects.filter(p => p.featured).length} Featured in Showcase
              </p>
            </Card>

            <Card padding="md" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
                <span>Articles Published</span>
                <FileText className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black font-mono text-[var(--color-text)]">
                {posts.length}
              </div>
              <p className="text-[11px] text-[var(--color-muted)] font-mono">
                Technical writing records
              </p>
            </Card>

            <Card padding="md" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
                <span>Curriculum Lessons</span>
                <BookOpen className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-black font-mono text-[var(--color-text)]">
                {techLessons.length + aiLessons.length}
              </div>
              <p className="text-[11px] text-[var(--color-muted)] font-mono">
                {techLessons.length} Tech • {aiLessons.length} AI
              </p>
            </Card>

            <Card padding="md" className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
                <span>Client Inquiries</span>
                <Mail className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black font-mono text-[var(--color-text)]">
                {messages.length}
              </div>
              <p className="text-[11px] text-amber-500 font-mono">
                {messages.filter(m => m.status === 'unread').length} Unread in Queue
              </p>
            </Card>
          </div>

          {/* Quick Management Short-links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card padding="lg" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-[#D4A72C]" />
                  <h2 className="text-base font-bold text-[var(--color-text)]">
                    Project Portfolio Records
                  </h2>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setEditingProject({
                      category: 'Full-Stack Applications',
                      status: 'Production Ready',
                      technologies: ['TypeScript', 'React', 'Node.js'],
                      featured: false,
                    });
                    setIsProjectModalOpen(true);
                  }}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  New Project
                </Button>
              </div>

              <div className="space-y-2 divide-y divide-[var(--color-border)]">
                {projects.slice(0, 4).map((p) => (
                  <div key={p.id} className="pt-2 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-[var(--color-text)]">
                        {p.title}
                      </span>
                      <span className="text-[11px] text-[var(--color-muted)] font-mono block">
                        {p.category} • {p.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        title="Toggle featured status"
                        className={`p-1.5 rounded transition-colors ${
                          p.featured ? 'text-[#D4A72C]' : 'text-[var(--color-muted)] hover:text-[#D4A72C]'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setIsProjectModalOpen(true);
                        }}
                        className="p-1.5 text-[var(--color-muted)] hover:text-[var(--color-text)]"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="lg" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-500" />
                  <h2 className="text-base font-bold text-[var(--color-text)]">
                    Recent Contact Inquiries
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('Messages')}
                  className="text-xs font-mono font-semibold text-[#D4A72C] hover:underline"
                >
                  View All Messages ›
                </button>
              </div>

              <div className="space-y-2 divide-y divide-[var(--color-border)]">
                {messages.length === 0 ? (
                  <p className="text-xs text-[var(--color-muted)] py-4 text-center">
                    No inquiries in queue.
                  </p>
                ) : (
                  messages.slice(0, 3).map((msg) => (
                    <div key={msg.id} className="pt-2 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[var(--color-text)]">
                          {msg.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          msg.status === 'unread' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-[var(--color-surface-hover)] text-[var(--color-muted)]'
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-muted)] line-clamp-1">
                        {msg.message}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-muted)]">
                        <span>{msg.email}</span>
                        <span>{msg.projectType}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Database Schema Status Card */}
          <Card padding="lg" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#D4A72C]" />
                <h3 className="text-base font-bold text-[var(--color-text)]">
                  Normalized 3NF Relational Architecture
                </h3>
              </div>
              <Badge variant="gold">MySQL & PostgreSQL 3NF Ready</Badge>
            </div>

            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              All entities in this admin workspace map directly to the normalized Third Normal Form schema defined in <code className="text-[#D4A72C]">database/schema.sql</code> and populated via <code className="text-[#D4A72C]">database/seed.sql</code>.
            </p>
          </Card>
        </div>
      )}

      {/* TAB: PROJECTS MANAGER */}
      {activeTab === 'Projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text)]">Projects Catalog</h2>
              <p className="text-xs text-[var(--color-muted)]">Add, edit, or remove portfolio technical projects.</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditingProject({
                  title: '',
                  tagline: '',
                  description: '',
                  category: 'Full-Stack Applications',
                  status: 'Production Ready',
                  technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'MySQL'],
                  featured: false,
                  githubUrl: 'https://github.com/yitbarek-k',
                  liveUrl: '',
                  architectureOverview: '',
                  problemStatement: '',
                  solutionStatement: '',
                  features: [],
                });
                setIsProjectModalOpen(true);
              }}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Project
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {projects.map((p) => (
              <Card key={p.id} padding="md" className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      className={`p-1.5 rounded transition-colors ${
                        p.featured ? 'text-[#D4A72C]' : 'text-[var(--color-muted)] hover:text-[#D4A72C]'
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--color-text)]">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[var(--color-muted)] font-mono">
                        Slug: {p.slug} • {p.category} • {p.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setEditingProject(p);
                        setIsProjectModalOpen(true);
                      }}
                      leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteProject(p.id, p.title)}
                      leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)]">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--color-border)]">
                  {p.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-surface-hover)] text-[var(--color-muted)] border border-[var(--color-border)]">
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB: BLOG POSTS MANAGER */}
      {activeTab === 'Blog Posts' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-text)]">Blog & Technical Articles</h2>
              <p className="text-xs text-[var(--color-muted)]">Manage published engineering articles and tutorials.</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditingPost({
                  title: '',
                  excerpt: '',
                  content: '',
                  category: 'Database Engineering',
                  tags: ['Architecture', 'MySQL'],
                  readTime: '6 min read',
                  featured: false,
                });
                setIsPostModalOpen(true);
              }}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Write Article
            </Button>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} padding="md" className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-text)]">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] font-mono">
                      {post.category} • {post.readTime} • Published: {post.publishedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setEditingPost(post);
                        setIsPostModalOpen(true);
                      }}
                      leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-muted)]">{post.excerpt}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TAB: MESSAGES INBOX */}
      {activeTab === 'Messages' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)]">Client Inquiries & Messages</h2>
            <p className="text-xs text-[var(--color-muted)]">Incoming specifications submitted via the contact portal.</p>
          </div>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <Card padding="lg" className="text-center py-12">
                <Mail className="w-8 h-8 text-[var(--color-muted)] mx-auto mb-2" />
                <p className="text-sm font-semibold text-[var(--color-text)]">No Messages</p>
                <p className="text-xs text-[var(--color-muted)]">Inquiries submitted on the contact page will appear here.</p>
              </Card>
            ) : (
              messages.map((msg) => (
                <Card key={msg.id} padding="lg" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[var(--color-text)]">
                          {msg.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          msg.status === 'unread' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}>
                          {msg.status.toUpperCase()}
                        </span>
                      </div>
                      <a href={`mailto:${msg.email}`} className="text-xs font-mono text-[#D4A72C] hover:underline">
                        {msg.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      {msg.status === 'unread' ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpdateMessageStatus(msg.id, 'reviewed')}
                          leftIcon={<Check className="w-3.5 h-3.5" />}
                        >
                          Mark Reviewed
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleUpdateMessageStatus(msg.id, 'replied')}
                          leftIcon={<Send className="w-3.5 h-3.5" />}
                        >
                          Mark Replied
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteMessage(msg.id)}
                        leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono bg-[var(--color-bg)] p-3 rounded border border-[var(--color-border)]">
                    <div>
                      <span className="text-[var(--color-muted)] block text-[10px]">Project Domain</span>
                      <span className="font-semibold text-[var(--color-text)]">{msg.projectType}</span>
                    </div>
                    <div>
                      <span className="text-[var(--color-muted)] block text-[10px]">Budget Scope</span>
                      <span className="font-semibold text-[var(--color-text)]">{msg.budget}</span>
                    </div>
                    <div>
                      <span className="text-[var(--color-muted)] block text-[10px]">Target Deadline</span>
                      <span className="font-semibold text-[var(--color-text)]">{msg.deadline || 'Flexible'}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-[var(--color-muted)] font-semibold">Message Content:</span>
                    <p className="text-xs sm:text-sm text-[var(--color-text)] whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: SERVICES, TECH LESSONS, AI LESSONS & KNOWLEDGE */}
      {(activeTab === 'Tech Lessons' || activeTab === 'AI Lessons' || activeTab === 'Services' || activeTab === 'AI Knowledge' || activeTab === 'Skills' || activeTab === 'Journey' || activeTab === 'Analytics' || activeTab === 'Settings') && (
        <Card padding="lg" className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <h3 className="text-base font-bold text-[var(--color-text)]">
              {activeTab} Management Panel
            </h3>
            <Badge variant="gold">Active</Badge>
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            This category is dynamically served via <code className="text-[#D4A72C]">/api/{activeTab.toLowerCase().replace(' ', '-')}</code> and normalized in the relational schema.
          </p>
          <div className="p-4 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)]">
            Status: Fully synced with server memory store & database scripts.
          </div>
        </Card>
      )}

      {/* PROJECT EDIT / CREATE MODAL */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        title={editingProject?.id ? 'Edit Project' : 'Create New Project'}
        size="lg"
      >
        <form onSubmit={handleSaveProject} className="space-y-4 text-xs sm:text-sm">
          <Input
            label="Project Title *"
            value={editingProject?.title || ''}
            onChange={(e) => setEditingProject(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. Enterprise Inventory Engine"
            required
          />

          <Input
            label="Tagline *"
            value={editingProject?.tagline || ''}
            onChange={(e) => setEditingProject(prev => ({ ...prev, tagline: e.target.value }))}
            placeholder="e.g. High-throughput inventory tracking with 3NF relational normalization"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={[
                { value: 'Full-Stack Applications', label: 'Full-Stack Applications' },
                { value: 'Database Systems', label: 'Database Systems' },
                { value: 'Automation & APIs', label: 'Automation & APIs' },
                { value: 'Educational Tools', label: 'Educational Tools' },
              ]}
              value={editingProject?.category || 'Full-Stack Applications'}
              onChange={(e) => setEditingProject(prev => ({ ...prev, category: e.target.value }))}
            />

            <Select
              label="Status"
              options={[
                { value: 'Production Ready', label: 'Production Ready' },
                { value: 'Active Beta', label: 'Active Beta' },
                { value: 'Stable Release', label: 'Stable Release' },
                { value: 'In Development', label: 'In Development' },
              ]}
              value={editingProject?.status || 'Production Ready'}
              onChange={(e) => setEditingProject(prev => ({ ...prev, status: e.target.value }))}
            />
          </div>

          <Textarea
            label="Description *"
            value={editingProject?.description || ''}
            onChange={(e) => setEditingProject(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            placeholder="Overview of system capabilities..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="GitHub Repository URL"
              value={editingProject?.githubUrl || ''}
              onChange={(e) => setEditingProject(prev => ({ ...prev, githubUrl: e.target.value }))}
              placeholder="https://github.com/..."
            />
            <Input
              label="Live Production Demo URL"
              value={editingProject?.liveUrl || ''}
              onChange={(e) => setEditingProject(prev => ({ ...prev, liveUrl: e.target.value }))}
              placeholder="https://demo..."
            />
          </div>

          <Textarea
            label="Architecture Overview"
            value={editingProject?.architectureOverview || ''}
            onChange={(e) => setEditingProject(prev => ({ ...prev, architectureOverview: e.target.value }))}
            rows={2}
            placeholder="Layered 3-tier architecture details..."
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured-proj"
              checked={Boolean(editingProject?.featured)}
              onChange={(e) => setEditingProject(prev => ({ ...prev, featured: e.target.checked }))}
              className="rounded border-[var(--color-border)] text-[#D4A72C] focus:ring-[#D4A72C]"
            />
            <label htmlFor="featured-proj" className="text-xs font-semibold text-[var(--color-text)]">
              Feature this project on homepage showcase
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setIsProjectModalOpen(false);
                setEditingProject(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Save Project Record
            </Button>
          </div>
        </form>
      </Modal>

      {/* BLOG EDIT / CREATE MODAL */}
      <Modal
        isOpen={isPostModalOpen}
        onClose={() => {
          setIsPostModalOpen(false);
          setEditingPost(null);
        }}
        title={editingPost?.id ? 'Edit Article' : 'Write New Article'}
        size="lg"
      >
        <form onSubmit={handleSavePost} className="space-y-4 text-xs sm:text-sm">
          <Input
            label="Article Title *"
            value={editingPost?.title || ''}
            onChange={(e) => setEditingPost(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. Mastering Database Normalization: 1NF to 3NF"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Category"
              value={editingPost?.category || 'Database Engineering'}
              onChange={(e) => setEditingPost(prev => ({ ...prev, category: e.target.value }))}
            />
            <Input
              label="Read Time"
              value={editingPost?.readTime || '6 min read'}
              onChange={(e) => setEditingPost(prev => ({ ...prev, readTime: e.target.value }))}
            />
          </div>

          <Textarea
            label="Excerpt *"
            value={editingPost?.excerpt || ''}
            onChange={(e) => setEditingPost(prev => ({ ...prev, excerpt: e.target.value }))}
            rows={2}
            placeholder="Short summary for list cards..."
          />

          <Textarea
            label="Article Content (Markdown) *"
            value={editingPost?.content || ''}
            onChange={(e) => setEditingPost(prev => ({ ...prev, content: e.target.value }))}
            rows={6}
            placeholder="Write full technical content..."
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setIsPostModalOpen(false);
                setEditingPost(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Publish Article
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
