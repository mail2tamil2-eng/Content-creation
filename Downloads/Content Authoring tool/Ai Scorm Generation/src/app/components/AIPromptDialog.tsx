import { useEffect, useId, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Loader2, Sparkles, X } from 'lucide-react';

export interface AIPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** e.g. "Generate slide with AI" */
  title: string;
  description: string;
  placeholder: string;
  /** Text of the main button, e.g. "Generate slide". */
  actionLabel: string;
  /** Runs the generation; the dialog shows a busy state until it resolves, then closes. */
  onGenerate: (prompt: string) => Promise<void>;
  /** Extra context shown under the description, e.g. where the slide will be added. */
  hint?: string;
}

/**
 * Prompt dialog for AI generation (section / slide). Radix Dialog: focus trap, Esc,
 * page behind hidden from screen readers. Ctrl/⌘+Enter submits.
 */
export function AIPromptDialog({ open, onOpenChange, title, description, placeholder, actionLabel, onGenerate, hint }: AIPromptDialogProps) {
  const [prompt, setPrompt] = useState('');
  const [busy, setBusy] = useState(false);
  const fieldId = useId();
  useEffect(() => { if (open) { setPrompt(''); setBusy(false); } }, [open]);

  const submit = async () => {
    if (!prompt.trim() || busy) return;
    setBusy(true);
    try { await onGenerate(prompt.trim()); onOpenChange(false); }
    finally { setBusy(false); }
  };

  return (
    <Dialog.Root open={open} onOpenChange={o => { if (!busy) onOpenChange(o); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9998] bg-black/35 data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[9999] w-[480px] max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 rounded-[14px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none"
          style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
        >
          <div className="mb-1.5 flex items-center">
            <Dialog.Title className="m-0 flex-1 text-base font-semibold text-[#111827]">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close" disabled={busy}
                className="inline-flex size-8 items-center justify-center rounded-md text-[#4B5563] hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
                <X className="size-4" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mb-4 text-[13px] text-[#4B5563]">
            {description}{hint && <><br /><span className="font-semibold text-[#374151]">{hint}</span></>}
          </Dialog.Description>
          <label htmlFor={fieldId} className="sr-only">{title} — description</label>
          <textarea
            id={fieldId}
            autoFocus
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); submit(); } }}
            placeholder={placeholder}
            rows={4}
            disabled={busy}
            className="mb-5 block w-full resize-y rounded-lg border border-[#6B7280] px-3 py-2.5 text-sm leading-relaxed text-[#111827] placeholder:text-[#6B7280] focus-visible:border-[#1565F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]/25"
          />
          <div className="flex items-center justify-end gap-2">
            <span className="mr-auto text-xs text-[#6B7280]">Ctrl + Enter to generate</span>
            <Dialog.Close asChild>
              <button type="button" disabled={busy}
                className="h-9 rounded-lg border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#374151] hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]">
                Cancel
              </button>
            </Dialog.Close>
            <button type="button" onClick={submit} disabled={!prompt.trim() || busy} aria-busy={busy || undefined}
              className="inline-flex h-9 min-w-[120px] items-center justify-center gap-1.5 rounded-lg bg-[#1565F0] px-4 text-[13px] font-semibold text-white hover:bg-[#1A63E8] disabled:cursor-not-allowed disabled:bg-[#C4C4C4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0] focus-visible:ring-offset-2">
              {busy ? <><Loader2 className="size-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" /> Generating…</> : <><Sparkles className="size-3.5" aria-hidden="true" /> {actionLabel}</>}
            </button>
          </div>
          <span className="sr-only" aria-live="polite">{busy ? 'Generating, please wait.' : ''}</span>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
