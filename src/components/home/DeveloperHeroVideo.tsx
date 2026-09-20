import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Terminal,
  Bot,
  Sparkles,
  Check,
  Copy,
  ChevronRight,
  ShieldCheck,
  Send,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DeveloperHeroVideo: React.FC = () => {
  const [activeHeroTab, setActiveHeroTab] = useState<'video' | 'sandbox'>('sandbox');
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Quick Mini Bot in Hero
  const [heroBotQuery, setHeroBotQuery] = useState('');
  const [heroBotReply, setHeroBotReply] = useState<string>(
    '⚡ TeleFlow Bot runtime active. Try typing "pricing" or click a quick action below:'
  );
  const [heroBotThinking, setHeroBotThinking] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleHeroQuickAction = (action: string) => {
    setHeroBotThinking(true);
    setTimeout(() => {
      setHeroBotThinking(false);
      if (action === 'ecommerce') {
        setHeroBotReply('🛒 Full-Stack: Custom e-commerce with Stripe, atomic 3NF row-locking, and 99.9% uptime.');
      } else if (action === 'bot') {
        setHeroBotReply('🤖 Telegram Automation: High-throughput aiogram 3.x bots with VIP paywalls & automatic invite links.');
      } else if (action === 'etl') {
        setHeroBotReply('⚡ Python ETL: Automated Playwright scrapers, Pydantic validation, and live Google Sheets sync.');
      }
    }, 400);
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroBotQuery.trim() || heroBotThinking) return;
    const q = heroBotQuery.trim();
    setHeroBotQuery('');
    setHeroBotThinking(true);

    setTimeout(() => {
      setHeroBotThinking(false);
      if (q.toLowerCase().includes('email') || q.toLowerCase().includes('contact')) {
        setHeroBotReply('📬 You can reach Yitbarek directly at ykifleyohans@gmail.com. Response within 24 hours guaranteed!');
      } else if (q.toLowerCase().includes('price') || q.toLowerCase().includes('rate')) {
        setHeroBotReply('💼 Project rates start at $600 for bots/automations, and $1,200 for full-stack e-commerce platforms.');
      } else {
        setHeroBotReply(`Processed "${q}" with Python 3.12 async engine. Check our Interactive Lab below for full pipelines!`);
      }
    }, 450);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('ykifleyohans@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative w-full h-[430px] sm:h-[480px] rounded-[var(--radius-xl)] overflow-hidden border border-[var(--color-border)] shadow-2xl bg-[#09090B] flex flex-col justify-between">
      {/* Background: Loop Video or Dark Tech Backdrop */}
      {activeHeroTab === 'video' ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          poster="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42848-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-43288-large.mp4"
            type="video/mp4"
          />
        </video>
      ) : (
        <div className="absolute inset-0 bg-radial from-[#1A1A24] via-[#0D0D12] to-[#070709] pointer-events-none" />
      )}

      {/* Cyber Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent pointer-events-none" />

      {/* Top Bar with Mode Tabs */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/10 border border-white/10">
          <button
            onClick={() => setActiveHeroTab('sandbox')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
              activeHeroTab === 'sandbox'
                ? 'bg-[#D4A72C] text-black font-bold shadow-xs'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Interactive Bot</span>
          </button>

          <button
            onClick={() => setActiveHeroTab('video')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
              activeHeroTab === 'video'
                ? 'bg-[#D4A72C] text-black font-bold shadow-xs'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Play className="w-3 h-3" />
            <span>Studio Loop</span>
          </button>
        </div>

        {activeHeroTab === 'video' ? (
          <button
            onClick={togglePlay}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 text-[11px] font-mono text-white transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-[#D4A72C]" /> : <Play className="w-3 h-3 text-[#D4A72C]" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>aiogram 3.x Live</span>
          </div>
        )}
      </div>

      {/* Middle Interactive Zone */}
      <div className="relative z-10 p-4 sm:p-5 flex-1 flex flex-col justify-center">
        {activeHeroTab === 'sandbox' ? (
          <div className="p-4 rounded-[var(--radius-lg)] bg-black/70 backdrop-blur-md border border-white/15 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 pb-2 border-b border-white/10">
              <span className="flex items-center gap-2 text-white font-bold">
                <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
                Telegram & Python Bot Console
              </span>
              <span className="text-[10px] text-[#D4A72C]">FastAPI • Asyncio</span>
            </div>

            {/* Simulated Live Bot Response Bubble */}
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-200 min-h-[64px] flex items-center">
              {heroBotThinking ? (
                <div className="flex items-center gap-2 text-[#D4A72C]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C] animate-bounce [animation-delay:0.3s]" />
                  <span className="text-[11px]">Processing event via asyncio loop...</span>
                </div>
              ) : (
                <p className="leading-relaxed">{heroBotReply}</p>
              )}
            </div>

            {/* Quick Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => handleHeroQuickAction('ecommerce')}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/10 hover:bg-[#D4A72C]/20 hover:text-[#D4A72C] text-gray-300 border border-white/10 transition-colors cursor-pointer"
              >
                🛒 E-Commerce Stack
              </button>
              <button
                onClick={() => handleHeroQuickAction('bot')}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/10 hover:bg-[#D4A72C]/20 hover:text-[#D4A72C] text-gray-300 border border-white/10 transition-colors cursor-pointer"
              >
                🤖 Telegram Bots
              </button>
              <button
                onClick={() => handleHeroQuickAction('etl')}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/10 hover:bg-[#D4A72C]/20 hover:text-[#D4A72C] text-gray-300 border border-white/10 transition-colors cursor-pointer"
              >
                ⚡ Python ETL
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleHeroSubmit} className="flex gap-2 pt-1">
              <input
                type="text"
                value={heroBotQuery}
                onChange={(e) => setHeroBotQuery(e.target.value)}
                placeholder="Ask about rates, bots, or tech stack..."
                className="flex-1 bg-black/60 border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#D4A72C]"
              />
              <button
                type="submit"
                disabled={heroBotThinking || !heroBotQuery.trim()}
                className="px-3 py-1.5 rounded-lg bg-[#D4A72C] text-black font-bold text-xs disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-4 rounded-[var(--radius-lg)] bg-black/80 backdrop-blur-md border border-white/15 space-y-2 text-left font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-gray-400">
              <span className="text-white font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4A72C]" />
                Developer Studio • Senior Frontend & Full-Stack Systems
              </span>
              <span className="text-[#D4A72C] text-[10px]">Production Systems</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Engineering rigorous, typed software architectures with sub-second performance, zero technical debt, and ACID transactional integrity.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Specs & Quick Contact Bar */}
      <div className="relative z-10 p-3 sm:p-4 bg-black/90 backdrop-blur-md border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Copy email to clipboard"
          >
            {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#D4A72C]" />}
            <span className="text-[11px]">{copiedEmail ? 'Copied!' : 'ykifleyohans@gmail.com'}</span>
          </button>
        </div>

        <a
          href="#interactive-lab"
          className="text-[11px] font-bold text-[#D4A72C] hover:underline flex items-center gap-1"
        >
          <span>Explore Live Lab</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
