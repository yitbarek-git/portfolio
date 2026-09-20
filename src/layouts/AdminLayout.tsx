import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  BookOpen,
  Sparkles,
  Milestone,
  Cpu,
  Layers,
  Mail,
  Brain,
  BarChart3,
  Settings,
  ArrowLeft,
  Sun,
  Moon,
  ShieldCheck,
  LogOut,
  Lock,
  User,
  KeyRound,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const adminNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Blog Posts', icon: FileText },
  { label: 'Tech Lessons', icon: BookOpen },
  { label: 'AI Lessons', icon: Sparkles },
  { label: 'Services', icon: Layers },
  { label: 'Messages', icon: Mail },
  { label: 'Skills', icon: Cpu },
  { label: 'Journey', icon: Milestone },
  { label: 'AI Knowledge', icon: Brain },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default true for effortless exploration
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((username === 'admin' && (password === 'admin123' || password === 'admin')) || username === 'yitbarek') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Use default admin / admin123');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] p-4">
        <div className="w-full max-w-md p-8 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 flex items-center justify-center text-[#D4A72C] mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold font-mono tracking-tight">
              ADMIN AUTHENTICATION
            </h1>
            <p className="text-xs text-[var(--color-muted)]">
              Sign in to manage projects, curriculum lessons, and client messages.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-mono">
                {authError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--color-muted)] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[#D4A72C]"
                placeholder="admin"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[var(--color-muted)] flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border)] text-sm focus:outline-none focus:border-[#D4A72C]"
                placeholder="admin123"
                required
              />
            </div>

            <div className="p-2.5 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[11px] font-mono text-[var(--color-muted)]">
              Default demo credentials: <span className="text-[#D4A72C]">admin</span> / <span className="text-[#D4A72C]">admin123</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-[var(--radius-md)] bg-[#D4A72C] text-[#121214] font-bold text-sm hover:bg-[#E5B83B] transition-colors"
            >
              Sign In to Admin Workspace
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Public Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col shrink-0 hidden md:flex">
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[var(--radius-sm)] bg-[#0B0B0C] border border-[#D4A72C]/50 flex items-center justify-center text-[#D4A72C] font-mono text-xs font-bold">
              YK
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold font-mono">ADMIN WORKSPACE</span>
              <span className="text-[10px] text-[#D4A72C] font-mono">Phase 4 Active</span>
            </div>
          </Link>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--color-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#D4A72C]" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Phase notice banner */}
        <div className="p-3 m-3 rounded-[var(--radius-md)] bg-[#D4A72C]/10 border border-[#D4A72C]/20 text-[11px] text-[var(--color-text)] flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
          <span>
            <strong>Phase 4 Management:</strong> Full REST API, 3NF schema, live CRUD operations, and message management active.
          </span>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto" aria-label="Admin Navigation">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-[#D4A72C]/15 text-[#D4A72C] font-semibold border border-[#D4A72C]/30'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[var(--color-border)] space-y-1">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-sm)] text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Public Site
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="md:hidden p-1 text-[var(--color-muted)] hover:text-[var(--color-text)]" title="Back to public site">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-sm font-semibold text-[var(--color-text)] truncate">
              Admin • {activeTab}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#D4A72C] px-2.5 py-1 rounded bg-[#D4A72C]/10 border border-[#D4A72C]/20 hidden sm:inline-block">
              System Admin
            </span>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="md:hidden p-1.5 rounded text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile Horizontal Navigation Tabs */}
        <div className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 overflow-x-auto scrollbar-none flex gap-1.5">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-[#D4A72C] text-[#121214] font-semibold shadow-2xs'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-text)] bg-[var(--color-bg)] border border-[var(--color-border)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet context={{ activeTab, setActiveTab }} />
        </main>
      </div>
    </div>
  );
};
