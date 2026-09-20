import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Terminal,
  Send,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  RefreshCw,
  Play,
  Pause,
  Copy,
  Check,
  Code2,
  Database,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  Clock,
  Zap,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Sliders,
  AlertCircle
} from 'lucide-react';

type LabMode = 'telegram-bot' | 'etl-pipeline' | 'ecommerce-db';

interface TelegramMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  buttons?: { label: string; action: string; icon?: string }[];
  isTyping?: boolean;
}

interface ETLStep {
  id: number;
  name: string;
  module: string;
  status: 'idle' | 'running' | 'completed';
  duration?: string;
  records?: number;
  description: string;
}

export const InteractiveAutomationLab: React.FC = () => {
  const [activeMode, setActiveMode] = useState<LabMode>('telegram-bot');
  const [copiedCode, setCopiedCode] = useState(false);

  // -------------------------------------------------------------
  // MODE 1: TELEGRAM BOT SIMULATOR STATE
  // -------------------------------------------------------------
  const [tgMessages, setTgMessages] = useState<TelegramMessage[]>([
    {
      id: 'msg-0',
      sender: 'bot',
      text: '👋 Welcome to TeleFlow Bot engine! Built with Python 3.12 & aiogram 3.x.\n\nChoose an automated capability below to simulate live event handling:',
      timestamp: '12:00 PM',
      buttons: [
        { label: '💳 Join VIP Channel ($29/mo)', action: 'vip_paywall' },
        { label: '🤖 Ask AI Customer Support', action: 'ai_support' },
        { label: '📢 Dispatch Channel Broadcast', action: 'broadcast_demo' },
        { label: '🔄 Reset Conversation', action: 'reset' }
      ]
    }
  ]);
  const [tgInput, setTgInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [tgConsoleLogs, setTgConsoleLogs] = useState<string[]>([
    '[12:00:00.102] [aiogram.dispatcher] Bot initialized with token ***_bot_token',
    '[12:00:00.105] [PostgreSQL] Connected to 3NF pool: max_conns=20, idle=5',
    '[12:00:00.110] [Router] Registered 8 message & callback_query handlers'
  ]);
  const [tgActiveTab, setTgActiveTab] = useState<'terminal' | 'webhook' | 'python'>('terminal');

  const addTgLog = (log: string) => {
    const time = new Date().toISOString().substring(11, 23);
    setTgConsoleLogs((prev) => [...prev.slice(-25), `[${time}] ${log}`]);
  };

  const handleTgAction = (action: string) => {
    if (isBotTyping) return;

    if (action === 'reset') {
      setTgMessages([
        {
          id: `msg-${Date.now()}`,
          sender: 'bot',
          text: '🔄 Session reset. Welcome to TeleFlow Bot engine (aiogram 3.x).\n\nSelect a simulated action:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          buttons: [
            { label: '💳 Join VIP Channel ($29/mo)', action: 'vip_paywall' },
            { label: '🤖 Ask AI Customer Support', action: 'ai_support' },
            { label: '📢 Dispatch Channel Broadcast', action: 'broadcast_demo' }
          ]
        }
      ]);
      addTgLog('[Session] Reset conversation state machine (FSMContext: default)');
      return;
    }

    if (action === 'vip_paywall') {
      const userMsg: TelegramMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: 'Join VIP Channel ($29/mo)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTgMessages((prev) => [...prev, userMsg]);
      setIsBotTyping(true);
      addTgLog('[aiogram] Received callback_query: data="vip_paywall" from user_id=4821039');
      addTgLog('[PostgreSQL] BEGIN; SELECT id, status FROM subscriptions WHERE tg_id=4821039 FOR UPDATE;');

      setTimeout(() => {
        addTgLog('[Stripe API] POST /v1/checkout/sessions -> 200 OK (id=cs_live_9941a)');
        addTgLog('[Telegram API] createChatInviteLink(member_limit=1, expire_date=+24h) -> https://t.me/+inv_98k2');
        setIsBotTyping(false);

        const botReply: TelegramMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: '⚡ Instant VIP Paywall Checkout:\n\n1. Invoice generated via Stripe.\n2. Single-use invitation link prepared.\n3. Automatic subscription auto-renewal configured.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          buttons: [
            { label: '🔗 Open Single-Use Invite Link', action: 'open_invite' },
            { label: '📋 View Webhook Payload', action: 'show_webhook' }
          ]
        };
        setTgMessages((prev) => [...prev, botReply]);
      }, 700);
    } else if (action === 'ai_support') {
      const userMsg: TelegramMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: 'How does inventory reservation work in your e-commerce platform?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTgMessages((prev) => [...prev, userMsg]);
      setIsBotTyping(true);
      addTgLog('[LangChain / RAG] Generated query embedding with text-embedding-3-small (1536 dims)');
      addTgLog('[pgvector SQL] SELECT content, cosine_distance FROM doc_embeddings ORDER BY embedding <=> $1 LIMIT 3;');

      setTimeout(() => {
        addTgLog('[LLM Gateway] Prompt streamed: 142 tokens generated in 184ms');
        setIsBotTyping(false);

        const botReply: TelegramMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: '🤖 AI Grounded Answer:\n\nOur e-commerce engine uses pessimistic database row-locking (SELECT ... FOR UPDATE) inside PostgreSQL. When a customer initiates checkout, that exact SKU count is atomically held for 15 minutes, preventing race-condition overselling completely.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          buttons: [
            { label: '🛒 Test E-Commerce Row-Lock', action: 'switch_to_ecommerce' },
            { label: '💳 Join VIP Channel', action: 'vip_paywall' }
          ]
        };
        setTgMessages((prev) => [...prev, botReply]);
      }, 900);
    } else if (action === 'broadcast_demo') {
      const userMsg: TelegramMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text: 'Dispatch Channel Broadcast',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTgMessages((prev) => [...prev, userMsg]);
      setIsBotTyping(true);
      addTgLog('[Broadcast] Querying active subscribers: 1,420 users returned');

      setTimeout(() => {
        addTgLog('[aiogram.batch] asyncio.gather() chunks dispatched: 1,420 messages sent in 240ms (0 rate-limit retries)');
        setIsBotTyping(false);

        const botReply: TelegramMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: '📢 Broadcast Delivered!\n\n• Target Audience: 1,420 active subscribers\n• Delivery Time: 240ms (asyncio chunked)\n• Telegram API Rate Limits: 0 errors (429 compliant)',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          buttons: [{ label: '🔄 Reset Conversation', action: 'reset' }]
        };
        setTgMessages((prev) => [...prev, botReply]);
      }, 700);
    } else if (action === 'open_invite') {
      addTgLog('[Audit] User clicked one-time invite link -> Telegram membership activated.');
      alert('Simulated Action: One-time Telegram invite link https://t.me/+inv_98k2 verified and marked as consumed.');
    } else if (action === 'show_webhook') {
      setTgActiveTab('webhook');
    } else if (action === 'switch_to_ecommerce') {
      setActiveMode('ecommerce-db');
    }
  };

  const handleTgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tgInput.trim() || isBotTyping) return;
    const text = tgInput.trim();
    setTgInput('');

    const userMsg: TelegramMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTgMessages((prev) => [...prev, userMsg]);
    setIsBotTyping(true);
    addTgLog(`[aiogram.message_handler] Received text: "${text}" from user_id=4821039`);

    setTimeout(() => {
      setIsBotTyping(false);
      let replyText = `I processed your command: "${text}". You can also test VIP channel paywalls or AI support via the buttons above!`;
      if (text.toLowerCase().includes('price') || text.toLowerCase().includes('cost')) {
        replyText = 'VIP subscription is $29/mo with instant automated access and direct Python bot support.';
      } else if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) {
        replyText = 'Hello! I am Yitbarek\'s automated Telegram bot demonstration. How can I help with your project today?';
      }
      setTgMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          buttons: [
            { label: '💳 Join VIP Channel ($29/mo)', action: 'vip_paywall' },
            { label: '🤖 Ask AI Customer Support', action: 'ai_support' }
          ]
        }
      ]);
      addTgLog('[aiogram] Sent text response via sendMessage API');
    }, 600);
  };

  // -------------------------------------------------------------
  // MODE 2: ETL PIPELINE RUNNER STATE
  // -------------------------------------------------------------
  const [etlSteps, setEtlSteps] = useState<ETLStep[]>([
    {
      id: 1,
      name: 'Playwright Scraper',
      module: 'scraper.py',
      status: 'idle',
      duration: '142ms',
      records: 50,
      description: 'Headless Chromium extracts product prices, stock & reviews'
    },
    {
      id: 2,
      name: '3NF Data Normalizer',
      module: 'normalize_3nf.py',
      status: 'idle',
      duration: '48ms',
      records: 50,
      description: 'Pydantic v2 schema validation, deduplication, currency standardization'
    },
    {
      id: 3,
      name: 'Google Sheets Sync',
      module: 'sheets_api.py',
      status: 'idle',
      duration: '96ms',
      records: 50,
      description: 'Service Account OAuth batch append to live inventory sheet'
    },
    {
      id: 4,
      name: 'PDF Invoice Engine',
      module: 'pdf_render.py',
      status: 'idle',
      duration: '62ms',
      records: 1,
      description: 'Compiles formatted enterprise PDF report with QR verification'
    },
    {
      id: 5,
      name: 'Telegram Dispatcher',
      module: 'notify_bot.py',
      status: 'idle',
      duration: '38ms',
      records: 1,
      description: 'Sends execution summary, alerts, and report link to admin channel'
    }
  ]);
  const [isEtlRunning, setIsEtlRunning] = useState(false);
  const [etlLogs, setEtlLogs] = useState<string[]>([
    'ETL Pipeline Engine ready. Click "Execute Automated Pipeline" to run all 5 microservices in sequence.'
  ]);
  const [scrapedSampleData, setScrapedSampleData] = useState<
    { sku: string; title: string; compPrice: number; ourPrice: number; margin: string; status: string }[]
  >([
    { sku: 'APX-901', title: 'Mechanical Keyboard Pro', compPrice: 169.0, ourPrice: 149.0, margin: '+24.5%', status: 'Ready' },
    { sku: 'APX-902', title: 'Ultra-Wide Monitor Light Bar', compPrice: 89.0, ourPrice: 79.0, margin: '+32.1%', status: 'Ready' },
    { sku: 'APX-903', title: 'Ergonomic Desk Mat XXL', compPrice: 38.0, ourPrice: 32.0, margin: '+41.0%', status: 'Ready' }
  ]);

  const runEtlPipeline = async () => {
    if (isEtlRunning) return;
    setIsEtlRunning(true);
    setEtlLogs(['[ETL] Starting automated execution loop across 5 modules...']);

    // Reset steps
    setEtlSteps((prev) => prev.map((s) => ({ ...s, status: 'idle' })));

    // Step 1: Scraper
    setEtlSteps((prev) => prev.map((s) => (s.id === 1 ? { ...s, status: 'running' } : s)));
    setEtlLogs((prev) => [...prev, '[Step 1/5] Launching Playwright headless browser instance (Chromium 124)...']);
    await new Promise((r) => setTimeout(r, 600));
    setEtlSteps((prev) => prev.map((s) => (s.id === 1 ? { ...s, status: 'completed' } : s)));
    setEtlLogs((prev) => [...prev, '[Step 1/5] Scraped 50 raw items from 3 competitor catalogs in 142ms.']);

    // Step 2: Normalizer
    setEtlSteps((prev) => prev.map((s) => (s.id === 2 ? { ...s, status: 'running' } : s)));
    setEtlLogs((prev) => [...prev, '[Step 2/5] Validating Pydantic schemas, stripping outliers, normalizing USD currency...']);
    await new Promise((r) => setTimeout(r, 500));
    setEtlSteps((prev) => prev.map((s) => (s.id === 2 ? { ...s, status: 'completed' } : s)));
    setEtlLogs((prev) => [...prev, '[Step 2/5] 3NF Validation complete: 50 records matched schema with 0 anomalies.']);
    setScrapedSampleData((prev) => prev.map((d) => ({ ...d, status: 'Normalized' })));

    // Step 3: Google Sheets
    setEtlSteps((prev) => prev.map((s) => (s.id === 3 ? { ...s, status: 'running' } : s)));
    setEtlLogs((prev) => [...prev, '[Step 3/5] Authenticating with Google Cloud Service Account OAuth token...']);
    await new Promise((r) => setTimeout(r, 550));
    setEtlSteps((prev) => prev.map((s) => (s.id === 3 ? { ...s, status: 'completed' } : s)));
    setEtlLogs((prev) => [...prev, '[Step 3/5] Appended 50 rows to "Live Inventory Sheet" via Google Sheets v4 API.']);
    setScrapedSampleData((prev) => prev.map((d) => ({ ...d, status: 'Synced to Sheet' })));

    // Step 4: PDF
    setEtlSteps((prev) => prev.map((s) => (s.id === 4 ? { ...s, status: 'running' } : s)));
    setEtlLogs((prev) => [...prev, '[Step 4/5] Rendering binary PDF summary with WeasyPrint & dynamic SVG charts...']);
    await new Promise((r) => setTimeout(r, 500));
    setEtlSteps((prev) => prev.map((s) => (s.id === 4 ? { ...s, status: 'completed' } : s)));
    setEtlLogs((prev) => [...prev, '[Step 4/5] Generated PDF report: "daily_inventory_summary_2026-09-20.pdf" (1.2 MB).']);

    // Step 5: Telegram Alert
    setEtlSteps((prev) => prev.map((s) => (s.id === 5 ? { ...s, status: 'running' } : s)));
    setEtlLogs((prev) => [...prev, '[Step 5/5] Dispatching notification to Executive Telegram channel...']);
    await new Promise((r) => setTimeout(r, 450));
    setEtlSteps((prev) => prev.map((s) => (s.id === 5 ? { ...s, status: 'completed' } : s)));
    setEtlLogs((prev) => [
      ...prev,
      '🎉 [Success] Pipeline completed in 386ms total. All 5 steps finished with 100% data integrity.'
    ]);
    setIsEtlRunning(false);
  };

  // -------------------------------------------------------------
  // MODE 3: E-COMMERCE ACID ROW-LOCK SIMULATOR STATE
  // -------------------------------------------------------------
  const [stockCount, setStockCount] = useState(2);
  const [useRowLocking, setUseRowLocking] = useState(true);
  const [ecommerceLogs, setEcommerceLogs] = useState<string[]>([
    'E-Commerce ACID simulator loaded. Toggle row-locking to observe concurrency behavior during high-traffic flash sales.'
  ]);
  const [checkoutStatus, setCheckoutStatus] = useState<
    'idle' | 'processing' | 'success' | 'oversold_error'
  >('idle');
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    orderId: string;
    items: string;
    total: string;
    method: string;
  } | null>(null);

  const simulateCheckout = (buyerType: 'single' | 'concurrent_flash_sale') => {
    setCheckoutStatus('processing');
    const time = new Date().toISOString().substring(11, 23);

    if (buyerType === 'single') {
      if (stockCount <= 0) {
        setCheckoutStatus('oversold_error');
        setEcommerceLogs((prev) => [
          ...prev,
          `[${time}] [ABORT] Item out of stock (stock=${stockCount}). Transaction rolled back.`
        ]);
        return;
      }

      setEcommerceLogs((prev) => [
        ...prev,
        `[${time}] [BEGIN] Customer initiating checkout for SKU: "APX-901"...`,
        `[${time}] [SQL] BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;`,
        useRowLocking
          ? `[${time}] [LOCK] SELECT stock FROM inventory WHERE sku='APX-901' FOR UPDATE; (Row locked)`
          : `[${time}] [UNSAFE] SELECT stock FROM inventory WHERE sku='APX-901'; (No lock)`,
        `[${time}] [STRIPE] Payment intent succeeded: pi_3N92... ($149.00 USD)`,
        `[${time}] [SQL] UPDATE inventory SET stock = stock - 1 WHERE sku='APX-901';`,
        `[${time}] [COMMIT] Transaction committed cleanly. Receipt generated.`
      ]);

      setStockCount((prev) => Math.max(0, prev - 1));
      setCheckoutStatus('success');
      setLastOrderDetails({
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: '1x Mechanical Keyboard Pro',
        total: '$149.00 USD',
        method: 'Stripe Instant Checkout'
      });
    } else {
      // Concurrent flash sale (2 simultaneous buyers competing for 1 item)
      setEcommerceLogs((prev) => [
        ...prev,
        `[${time}] [FLASH SALE] 2 Concurrent buyers click "Buy Now" at the exact same millisecond!`
      ]);

      if (useRowLocking) {
        setEcommerceLogs((prev) => [
          ...prev,
          `[${time}] [Buyer 1] Acquired exclusive lock: SELECT ... FOR UPDATE`,
          `[${time}] [Buyer 2] Waiting on lock acquisition (Thread paused safely)`,
          `[${time}] [Buyer 1] Payment processed, stock decremented by 1`,
          `[${time}] [Buyer 1] COMMIT released lock`,
          stockCount > 1
            ? `[${time}] [Buyer 2] Acquired lock. Stock remaining was ${stockCount - 1}. Successfully fulfilled!`
            : `[${time}] [Buyer 2] Acquired lock. Stock remaining is 0! Gracefully notified: "Item just sold out". Zero overselling.`
        ]);
        setStockCount((prev) => Math.max(0, prev - (stockCount > 1 ? 2 : 1)));
        setCheckoutStatus('success');
        setLastOrderDetails({
          orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          items: 'Concurrent Safe Fulfillment (3NF Row-Locked)',
          total: '$149.00 USD',
          method: 'ACID Guaranteed'
        });
      } else {
        // Race condition failure!
        setEcommerceLogs((prev) => [
          ...prev,
          `[${time}] [Buyer 1] Read stock = ${stockCount} (No lock)`,
          `[${time}] [Buyer 2] Read stock = ${stockCount} simultaneously! (Dirty read)`,
          `[${time}] [Buyer 1] Wrote stock = ${stockCount - 1}`,
          `[${time}] [Buyer 2] Wrote stock = ${stockCount - 2} (Overwrote without check)`,
          `[${time}] ⚠️ [CRITICAL BUG] Database race condition! Inventory corrupted or negative balance created.`
        ]);
        setStockCount((prev) => prev - 2);
        setCheckoutStatus('oversold_error');
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="space-y-8" id="interactive-lab">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A72C]/10 border border-[#D4A72C]/30 text-xs font-mono text-[#D4A72C]">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Engineering Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
            Live Automations, Bots & Full-Stack Sandbox
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
            Test actual production logic right in your browser: Telegram bot paywalls, automated Python ETL workflows, and ACID row-locking database transactions.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="inline-flex p-1 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xs">
          <button
            onClick={() => setActiveMode('telegram-bot')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold transition-all cursor-pointer ${
              activeMode === 'telegram-bot'
                ? 'bg-[#D4A72C] text-[#0B0B0C] shadow-xs'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Telegram Bot (aiogram)</span>
          </button>

          <button
            onClick={() => setActiveMode('etl-pipeline')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold transition-all cursor-pointer ${
              activeMode === 'etl-pipeline'
                ? 'bg-[#D4A72C] text-[#0B0B0C] shadow-xs'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Python ETL Pipeline</span>
          </button>

          <button
            onClick={() => setActiveMode('ecommerce-db')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-md)] text-xs font-semibold transition-all cursor-pointer ${
              activeMode === 'ecommerce-db'
                ? 'bg-[#D4A72C] text-[#0B0B0C] shadow-xs'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>E-Commerce ACID Lock</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* MODE 1: TELEGRAM BOT SIMULATOR & TELEMETRY                    */}
      {/* ============================================================= */}
      {activeMode === 'telegram-bot' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Realistic Telegram Mobile Window */}
          <div className="lg:col-span-6 xl:col-span-5 bg-[#0F141C] border border-[#232E3E] rounded-[24px] overflow-hidden shadow-2xl flex flex-col h-[520px]">
            {/* Telegram Header */}
            <div className="px-4 py-3 bg-[#17212B] border-b border-[#232E3E] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2AABEE] to-[#229ED9] flex items-center justify-center text-white font-bold text-sm shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white text-xs font-bold">TeleFlow Assistant</span>
                    <Badge variant="gold" size="sm">Bot</Badge>
                  </div>
                  <span className="text-[11px] text-[#2AABEE] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    online • aiogram 3.x
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleTgAction('reset')}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Reset session"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Bubble Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-sans text-xs bg-[#0E1621]/90">
              {tgMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[14px] p-3 text-xs leading-relaxed whitespace-pre-line shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#2B5278] text-white rounded-br-none'
                        : 'bg-[#182533] text-[#E4ECF2] border border-[#243447] rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] text-right mt-1 opacity-60">
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Interactive Inline Keyboard Buttons */}
                  {msg.buttons && (
                    <div className="mt-2 w-full max-w-[85%] space-y-1.5">
                      {msg.buttons.map((btn, bIdx) => (
                        <button
                          key={bIdx}
                          onClick={() => handleTgAction(btn.action)}
                          className="w-full text-left px-3 py-2 rounded-lg bg-[#202F42] hover:bg-[#2B3E56] border border-[#2B3E56] text-white text-[11px] font-medium flex items-center justify-between transition-all active:scale-[0.99] cursor-pointer group"
                        >
                          <span className="group-hover:text-[#D4A72C] transition-colors">
                            {btn.label}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isBotTyping && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-[#182533] border border-[#243447] px-3 py-2 rounded-full w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2AABEE] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2AABEE] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2AABEE] animate-bounce [animation-delay:0.3s]" />
                  <span className="text-[11px] font-mono text-[#2AABEE] ml-1">bot is typing...</span>
                </div>
              )}
            </div>

            {/* Telegram Input Bar */}
            <form
              onSubmit={handleTgSubmit}
              className="p-2.5 bg-[#17212B] border-t border-[#232E3E] flex items-center gap-2"
            >
              <input
                type="text"
                value={tgInput}
                onChange={(e) => setTgInput(e.target.value)}
                placeholder="Type a message or /command..."
                className="flex-1 bg-[#0E1621] border border-[#243447] text-white text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-[#2AABEE]"
              />
              <button
                type="submit"
                disabled={isBotTyping || !tgInput.trim()}
                className="p-2 rounded-xl bg-[#2AABEE] hover:bg-[#229ED9] text-white disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right: Live Asyncio Terminal, Webhook & Source Code Inspector */}
          <div className="lg:col-span-6 xl:col-span-7 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] shadow-lg overflow-hidden flex flex-col h-[520px]">
            {/* Top Inspector Header */}
            <div className="px-4 py-2.5 bg-[var(--color-bg)] border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-[var(--color-muted)] font-semibold ml-2">
                  Python 3.12 • Dispatcher Runtime
                </span>
              </div>

              {/* Sub-Tabs */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTgActiveTab('terminal')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    tgActiveTab === 'terminal'
                      ? 'bg-[var(--color-surface)] text-[#D4A72C] font-bold border border-[var(--color-border)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  Terminal Logs
                </button>
                <button
                  onClick={() => setTgActiveTab('webhook')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    tgActiveTab === 'webhook'
                      ? 'bg-[var(--color-surface)] text-[#D4A72C] font-bold border border-[var(--color-border)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  Webhook JSON
                </button>
                <button
                  onClick={() => setTgActiveTab('python')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    tgActiveTab === 'python'
                      ? 'bg-[var(--color-surface)] text-[#D4A72C] font-bold border border-[var(--color-border)]'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  Source Code
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-[#0B0B0C] text-[#D1D5DB]">
              {tgActiveTab === 'terminal' && (
                <div className="space-y-1">
                  <div className="text-gray-500 text-[11px] pb-2 border-b border-white/10">
                    # Real-time event loop dispatch stream (asyncio + aiogram 3.x):
                  </div>
                  {tgConsoleLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed font-mono text-[11px]">
                      {log.includes('aiogram') ? (
                        <span className="text-[#2AABEE]">{log}</span>
                      ) : log.includes('PostgreSQL') || log.includes('SQL') ? (
                        <span className="text-purple-400">{log}</span>
                      ) : log.includes('Stripe') ? (
                        <span className="text-emerald-400">{log}</span>
                      ) : log.includes('LangChain') ? (
                        <span className="text-amber-400">{log}</span>
                      ) : (
                        <span className="text-gray-300">{log}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {tgActiveTab === 'webhook' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 pb-2 border-b border-white/10">
                    <span>POST https://api.yitbarek.dev/webhook/telegram</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(
                            {
                              update_id: 98421049,
                              callback_query: {
                                id: '439019284091',
                                from: { id: 4821039, is_bot: false, first_name: 'Client', username: 'alex_startup' },
                                message: { message_id: 104, date: 1774167600, chat: { id: 4821039, type: 'private' } },
                                data: 'vip_paywall'
                              }
                            },
                            null,
                            2
                          )
                        )
                      }
                      className="flex items-center gap-1 text-[#D4A72C] hover:underline cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre className="text-emerald-400 text-[11px] leading-relaxed overflow-x-auto">
{`{
  "update_id": 98421049,
  "callback_query": {
    "id": "439019284091",
    "from": {
      "id": 4821039,
      "is_bot": false,
      "first_name": "Client",
      "username": "alex_startup"
    },
    "message": {
      "message_id": 104,
      "chat": { "id": 4821039, "type": "private" }
    },
    "data": "vip_paywall"
  }
}`}
                  </pre>
                </div>
              )}

              {tgActiveTab === 'python' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 pb-2 border-b border-white/10">
                    <span>handlers/paywall.py (aiogram 3.x)</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
`@router.callback_query(F.data == "vip_paywall")
async def handle_vip_paywall(call: types.CallbackQuery, db_pool: asyncpg.Pool):
    # Atomic lookup
    async with db_pool.acquire() as conn:
        sub = await conn.fetchrow(
            "SELECT * FROM subscriptions WHERE tg_id = $1", 
            call.from_user.id
        )
    # Generate single-use invite link
    invite = await call.bot.create_chat_invite_link(
        chat_id=settings.VIP_CHANNEL_ID,
        member_limit=1,
        expire_date=timedelta(hours=24)
    )
    await call.message.edit_text(
        f"⚡ Your single-use VIP link: {invite.invite_link}",
        reply_markup=vip_keyboard
    )`
                        )
                      }
                      className="flex items-center gap-1 text-[#D4A72C] hover:underline cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="text-sky-300 text-[11px] leading-relaxed overflow-x-auto">
{`@router.callback_query(F.data == "vip_paywall")
async def handle_vip_paywall(call: types.CallbackQuery, db_pool: asyncpg.Pool):
    # 1. Check existing subscription in 3NF PostgreSQL
    async with db_pool.acquire() as conn:
        sub = await conn.fetchrow(
            "SELECT * FROM subscriptions WHERE tg_id = $1", 
            call.from_user.id
        )

    # 2. Generate cryptographically safe single-use link
    invite = await call.bot.create_chat_invite_link(
        chat_id=settings.VIP_CHANNEL_ID,
        member_limit=1,
        expire_date=timedelta(hours=24)
    )

    # 3. Deliver formatted response
    await call.message.edit_text(
        f"⚡ Your single-use VIP invite: {invite.invite_link}",
        reply_markup=vip_action_keyboard
    )`}
                  </pre>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-3 bg-[var(--color-bg)] border-t border-[var(--color-border)] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[var(--color-muted)] font-mono">
                SLA Guarantee: Sub-80ms webhook delivery
              </span>
              <Link to="/contact">
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                  Hire for Telegram Bot Development
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODE 2: PYTHON BUSINESS AUTOMATION & ETL PIPELINE             */}
      {/* ============================================================= */}
      {activeMode === 'etl-pipeline' && (
        <div className="space-y-6">
          <Card padding="lg" className="border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
              <div>
                <h3 className="text-lg font-bold text-[var(--color-text)]">
                  Autonomous Python ETL & Business Sync Engine
                </h3>
                <p className="text-xs text-[var(--color-muted)]">
                  Simulates extracting raw market data with Playwright, normalizing via Pydantic schemas, syncing with Google Sheets, and generating PDF invoices.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={runEtlPipeline}
                  disabled={isEtlRunning}
                  variant="primary"
                  size="md"
                  leftIcon={isEtlRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                >
                  {isEtlRunning ? 'Running Microservices...' : 'Execute Automated Pipeline'}
                </Button>
              </div>
            </div>

            {/* 5-Step Node Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-6">
              {etlSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-[var(--radius-lg)] border transition-all ${
                    step.status === 'completed'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : step.status === 'running'
                      ? 'bg-[#D4A72C]/10 border-[#D4A72C] text-[#D4A72C] animate-pulse'
                      : 'bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-muted)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs pb-1.5 mb-1.5 border-b border-current/20">
                    <span className="font-mono font-bold text-[10px]">
                      0{step.id} • {step.module}
                    </span>
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : step.status === 'running' ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4A72C]" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-[var(--color-text)]">{step.name}</div>
                  <div className="text-[11px] text-[var(--color-muted)] mt-1 leading-snug">
                    {step.description}
                  </div>
                  {step.status === 'completed' && (
                    <div className="mt-2 pt-2 border-t border-current/20 flex items-center justify-between text-[10px] font-mono">
                      <span>✓ {step.duration}</span>
                      <span>{step.records} records</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Live Data Sample & Logs Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
              {/* Data Table */}
              <div className="lg:col-span-7 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] block">
                  Normalized Data Preview (3NF Schema):
                </span>
                <div className="border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden bg-[var(--color-bg)]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)] text-[var(--color-muted)]">
                      <tr>
                        <th className="p-2.5">SKU</th>
                        <th className="p-2.5">Product Title</th>
                        <th className="p-2.5">Comp. Price</th>
                        <th className="p-2.5">Our Price</th>
                        <th className="p-2.5">Margin</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      {scrapedSampleData.map((item) => (
                        <tr key={item.sku} className="hover:bg-[var(--color-surface)]">
                          <td className="p-2.5 font-bold text-[#D4A72C]">{item.sku}</td>
                          <td className="p-2.5 text-[var(--color-text)]">{item.title}</td>
                          <td className="p-2.5 text-[var(--color-muted)] line-through">${item.compPrice}</td>
                          <td className="p-2.5 text-emerald-500 font-bold">${item.ourPrice}</td>
                          <td className="p-2.5 text-sky-400">{item.margin}</td>
                          <td className="p-2.5">
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Execution Console Logs */}
              <div className="lg:col-span-5 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)] block">
                  Execution Telemetry Stream:
                </span>
                <div className="p-3 bg-[#0B0B0C] border border-[var(--color-border)] rounded-[var(--radius-md)] h-44 overflow-y-auto font-mono text-[11px] text-gray-300 space-y-1">
                  {etlLogs.map((log, lIdx) => (
                    <div
                      key={lIdx}
                      className={
                        log.includes('Success')
                          ? 'text-emerald-400 font-bold'
                          : log.includes('Step')
                          ? 'text-[#D4A72C]'
                          : 'text-gray-300'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODE 3: E-COMMERCE ACID ROW-LOCK INSPECTOR                    */}
      {/* ============================================================= */}
      {activeMode === 'ecommerce-db' && (
        <div className="space-y-6">
          <Card padding="lg" className="border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Product & Checkout Controls */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-1">
                  <Badge variant="gold">NovaCommerce Core</Badge>
                  <h3 className="text-lg font-bold text-[var(--color-text)]">
                    ACID Concurrency & Row-Lock Engine
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Test how our relational database architecture handles concurrent flash sales without overselling.
                  </p>
                </div>

                {/* Product Card */}
                <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-bg)] border border-[var(--color-border)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--color-muted)]">SKU: APX-901</span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        stockCount > 0
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                          : 'bg-red-500/10 text-red-500 border border-red-500/30'
                      }`}
                    >
                      {stockCount > 0 ? `In Stock: ${stockCount} Units` : 'SOLD OUT'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text)]">
                      Mechanical Developer Keyboard Pro
                    </h4>
                    <p className="text-xs text-[var(--color-muted)]">
                      Hot-swappable switches, sound dampening, USB-C.
                    </p>
                    <div className="text-lg font-extrabold text-[#D4A72C] mt-1">$149.00 USD</div>
                  </div>

                  {/* Concurrency Mode Switch */}
                  <div className="pt-2 border-t border-[var(--color-border)]">
                    <label className="flex items-center justify-between text-xs cursor-pointer">
                      <span className="font-semibold text-[var(--color-text)]">
                        Enable 3NF Row-Locking (SELECT FOR UPDATE)
                      </span>
                      <input
                        type="checkbox"
                        checked={useRowLocking}
                        onChange={(e) => setUseRowLocking(e.target.checked)}
                        className="w-4 h-4 text-[#D4A72C] rounded cursor-pointer accent-[#D4A72C]"
                      />
                    </label>
                    <span className="text-[11px] text-[var(--color-muted)] block mt-0.5">
                      {useRowLocking
                        ? '✓ Enforces ACID isolation level. Zero overselling.'
                        : '⚠️ Unsafe: Race conditions will cause negative inventory!'}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-2 pt-2">
                    <Button
                      onClick={() => simulateCheckout('single')}
                      disabled={checkoutStatus === 'processing'}
                      variant="primary"
                      size="md"
                      leftIcon={<ShoppingBag className="w-4 h-4" />}
                    >
                      Single Buyer Instant Checkout
                    </Button>
                    <Button
                      onClick={() => simulateCheckout('concurrent_flash_sale')}
                      disabled={checkoutStatus === 'processing'}
                      variant="outline"
                      size="md"
                      leftIcon={<Zap className="w-4 h-4 text-[#D4A72C]" />}
                    >
                      Simulate Concurrent Flash Sale (2 Buyers)
                    </Button>
                    <button
                      onClick={() => {
                        setStockCount(3);
                        setCheckoutStatus('idle');
                        setEcommerceLogs((prev) => [...prev, '[Restock] Inventory reset to 3 units.']);
                      }}
                      className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] underline pt-1"
                    >
                      Reset Stock (3 units)
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: SQL & Concurrency Logs */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-text)]">
                    PostgreSQL Transaction Log:
                  </span>
                  <Badge variant={useRowLocking ? 'gold' : 'danger'} size="sm">
                    {useRowLocking ? 'ACID Guaranteed' : 'Unsafe Race Condition Mode'}
                  </Badge>
                </div>

                <div className="p-4 bg-[#0B0B0C] border border-[var(--color-border)] rounded-[var(--radius-lg)] font-mono text-xs text-gray-300 h-64 overflow-y-auto space-y-1.5 shadow-inner">
                  {ecommerceLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.includes('CRITICAL BUG')
                          ? 'text-red-400 font-bold'
                          : log.includes('COMMIT')
                          ? 'text-emerald-400'
                          : log.includes('LOCK')
                          ? 'text-purple-400'
                          : log.includes('SQL')
                          ? 'text-sky-300'
                          : 'text-gray-300'
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>

                {/* Receipt Card if Success */}
                {checkoutStatus === 'success' && lastOrderDetails && (
                  <div className="p-3.5 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <span className="font-bold text-emerald-400">Order Confirmed: {lastOrderDetails.orderId}</span>
                        <span className="text-[11px] text-[var(--color-muted)] block">
                          {lastOrderDetails.items} • {lastOrderDetails.total}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">{lastOrderDetails.method}</span>
                  </div>
                )}

                {checkoutStatus === 'oversold_error' && (
                  <div className="p-3.5 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      Transaction Rejected: Stock depleted or concurrency race condition detected.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
};
