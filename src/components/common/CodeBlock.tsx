import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  title,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      showToast('Code copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy code', 'error');
    }
  };

  return (
    <div className={`my-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-[var(--shadow-card)] ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#D4A72C]" />
          <span className="font-semibold text-[var(--color-text)]">{title || language}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="uppercase text-[10px] tracking-wider font-semibold text-[#D4A72C]">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] font-mono text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors p-1 rounded hover:bg-[var(--color-surface)]"
            title="Copy code snippet"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-500" />
                <span className="text-green-500">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code contents */}
      <div className="p-4 overflow-x-auto bg-[#0F0F11] text-[#E5E7EB] font-mono text-xs sm:text-sm leading-relaxed">
        <pre className="selection:bg-[#D4A72C]/30 selection:text-white">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};
