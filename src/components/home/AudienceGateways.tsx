import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Terminal, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';

export const AudienceGateways: React.FC = () => {
  const gateways = [
    {
      id: 'clients-fullstack',
      emoji: '⚛️',
      badge: 'Web & E-Commerce',
      title: 'Web Apps & Online Stores',
      description: 'Fast, modern websites built with React and TypeScript. Pixel-perfect design, fast loading speeds, and secure Stripe checkout for your customers.',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Frontend website development with React and TypeScript',
      icon: Briefcase,
      accentColor: 'text-[#D4A72C]',
      bgAccent: 'bg-[#D4A72C]/10',
      borderAccent: 'hover:border-[#D4A72C]/50',
      features: [
        'Fast page loading under 1 second on all screens',
        'Custom design matching your Figma mockups exactly',
        'Complete online store with shopping cart & Stripe checkout'
      ],
      primaryLink: {
        text: 'Explore Web Services',
        url: '/services'
      },
      secondaryLink: {
        text: 'View Projects',
        url: '/projects'
      }
    },
    {
      id: 'clients-automation',
      emoji: '🤖',
      badge: 'Python Automation',
      title: 'Telegram Bots & Automation',
      description: 'Reliable Python bots and scripts that run 24/7. Handle orders, answer customer questions with AI, and automate your daily business tasks.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Python Telegram Bots and Chatbots',
      icon: Terminal,
      accentColor: 'text-emerald-400',
      bgAccent: 'bg-emerald-400/10',
      borderAccent: 'hover:border-emerald-400/50',
      features: [
        'Custom Telegram bots with paid membership gates & buttons',
        'Smart AI chatbots trained on your business FAQs and data',
        'Automated web scrapers & Google Sheets syncing scripts'
      ],
      primaryLink: {
        text: 'Explore Automation',
        url: '/services'
      },
      secondaryLink: {
        text: 'View Bot Demos',
        url: '/projects'
      }
    },
    {
      id: 'learners-engineers',
      emoji: '📚',
      badge: 'Tutorials & Guides',
      title: 'Developer Guides & Roadmaps',
      description: 'Clear, step-by-step guides for developers of all levels: complete web development roadmaps, a free 48-page Python handbook, and SQL cheat sheets.',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'Developer Curriculum and Engineering Roadmaps',
      icon: GraduationCap,
      accentColor: 'text-sky-400',
      bgAccent: 'bg-sky-400/10',
      borderAccent: 'hover:border-sky-400/50',
      features: [
        'Complete 2026 Web Development roadmap for beginners & pros',
        'Free 48-page practical Python handbook (PDF download)',
        'Simple database design rules and SQL cheat sheets'
      ],
      primaryLink: {
        text: 'Get Free Guides',
        url: '/resources'
      },
      secondaryLink: {
        text: 'Browse Lessons',
        url: '/tech-lessons'
      }
    }
  ];

  return (
    <section className="py-6">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
          <span>🎯 How I Can Help You</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text)]">
          Built for Clients, Founders & Developers
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
          Whether you need a developer for your next project, an automated Python bot, or practical programming guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {gateways.map((gate) => {
          return (
            <Card
              key={gate.id}
              hoverEffect
              padding="none"
              className={`flex flex-col justify-between overflow-hidden transition-all duration-200 border-[var(--color-border)] ${gate.borderAccent} bg-[var(--color-surface)]`}
            >
              {/* Card Image Header */}
              <div className="relative h-40 w-full overflow-hidden bg-black/40 group">
                <img
                  src={gate.imageUrl}
                  alt={gate.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-black/30" />
                
                {/* Floating Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-2xl drop-shadow-md">{gate.emoji}</span>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-xs border border-white/20 text-white">
                    {gate.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[var(--color-text)] leading-snug flex items-center gap-2">
                      <span>{gate.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                      {gate.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--color-border)]/60 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] font-bold block">
                      ✨ What's included:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
                      {gate.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${gate.accentColor} shrink-0 mt-0.5`} />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
                  <Link
                    to={gate.primaryLink.url}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[var(--radius-md)] text-xs font-bold bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-opacity min-h-[42px]"
                  >
                    <span>{gate.primaryLink.text}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to={gate.secondaryLink.url}
                    className="text-xs font-mono text-[var(--color-muted)] hover:text-[#D4A72C] transition-colors whitespace-nowrap px-2 py-1"
                  >
                    {gate.secondaryLink.text}
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
