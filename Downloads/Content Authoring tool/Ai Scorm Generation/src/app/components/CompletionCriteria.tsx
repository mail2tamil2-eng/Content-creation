import { useId, type ReactNode } from 'react';
import { cn } from './ui/utils';

export type CompletionSource = 'final-assessment' | 'slide-view' | 'knowledge-check';

export interface CompletionCriteriaProps {
  selected: CompletionSource[];
  onChange: (next: CompletionSource[]) => void;
  /** Pass mark for the final assessment (%). */
  passPct: number;
  onPassPctChange: (v: number) => void;
  /** Share of slides a learner must view (%). */
  slidePct: number;
  onSlidePctChange: (v: number) => void;
  /** Whether the course contains a final assessment (quiz) / knowledge checks; options are disabled otherwise. */
  hasFinalAssessment: boolean;
  hasKnowledgeChecks: boolean;
  className?: string;
}

function PctInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <div className="flex items-center gap-2 pl-7 pt-2">
      <label htmlFor={id} className="text-xs text-[#4B5563]">{label}</label>
      <span className="ml-auto inline-flex items-center gap-1.5">
        <input id={id} type="number" min={1} max={100} value={value}
          onChange={e => onChange(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
          className="h-8 w-16 rounded-md border border-[#6B7280] bg-white px-2 text-center text-[13px] font-semibold text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]" />
        <span className="text-[13px] font-semibold text-[#374151]" aria-hidden="true">%</span>
      </span>
    </div>
  );
}

function Option({ checked, disabled, title, hint, onToggle, children }: { checked: boolean; disabled?: boolean; title: string; hint: string; onToggle: () => void; children?: ReactNode }) {
  const id = useId();
  return (
    <div className={cn('rounded-lg border-[1.5px] px-3 py-2.5 transition-colors',
      disabled ? 'border-[#E5E7EB] bg-[#F9FAFB]' : checked ? 'border-[#93C5FD] bg-[#EBF3FF]' : 'border-[#E5E7EB] bg-white')}>
      <div className="flex items-start gap-3">
        <input id={id} type="checkbox" checked={checked && !disabled} disabled={disabled} onChange={onToggle} aria-describedby={`${id}-hint`}
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[#1565F0] disabled:cursor-not-allowed" />
        <span className="min-w-0">
          <label htmlFor={id} className={cn('block text-[13px] font-semibold', disabled ? 'cursor-not-allowed text-[#6B7280]' : 'cursor-pointer text-[#111827]')}>{title}</label>
          <span id={`${id}-hint`} className="block text-xs text-[#4B5563]">{hint}</span>
        </span>
      </div>
      {checked && !disabled && children}
    </div>
  );
}

/**
 * "Mark complete when…" options for publishing. The final assessment IS the course quiz,
 * so there is one option for it (with its pass mark) rather than separate "quiz" and "final assessment".
 */
export function CompletionCriteria({ selected, onChange, passPct, onPassPctChange, slidePct, onSlidePctChange, hasFinalAssessment, hasKnowledgeChecks, className }: CompletionCriteriaProps) {
  const toggle = (s: CompletionSource) => onChange(selected.includes(s) ? selected.filter(x => x !== s) : [...selected, s]);
  const active = selected.filter(s => (s !== 'final-assessment' || hasFinalAssessment) && (s !== 'knowledge-check' || hasKnowledgeChecks));
  return (
    <fieldset className={cn('m-0 min-w-0 border-0 p-0', className)}>
      <legend className="mb-2.5 p-0 text-xs font-bold uppercase tracking-[0.05em] text-[#374151]">Mark complete when — select all that apply</legend>
      <div className="flex flex-col gap-1.5">
        <Option checked={selected.includes('final-assessment')} disabled={!hasFinalAssessment} onToggle={() => toggle('final-assessment')}
          title="Learner passes the final assessment"
          hint={hasFinalAssessment ? `Score at least ${passPct}% on the course quiz.` : 'This course has no final assessment. Turn on “Add Quiz” in Step 1 to use this.'}>
          <PctInput label="Pass mark" value={passPct} onChange={onPassPctChange} />
        </Option>
        <Option checked={selected.includes('slide-view')} onToggle={() => toggle('slide-view')}
          title="Learner views enough slides" hint={`Open at least ${slidePct}% of the slides.`}>
          <PctInput label="Slides viewed" value={slidePct} onChange={onSlidePctChange} />
        </Option>
        <Option checked={selected.includes('knowledge-check')} disabled={!hasKnowledgeChecks} onToggle={() => toggle('knowledge-check')}
          title="Learner completes every knowledge check"
          hint={hasKnowledgeChecks ? 'Answer all knowledge-check questions in the course.' : 'This course has no knowledge checks. Turn on “Knowledge Check per Topic” in Step 1 to use this.'} />
      </div>
      <p className="mb-0 mt-2 text-xs text-[#4B5563]" aria-live="polite">
        {active.length === 0
          ? 'Nothing selected: the course is marked complete when the learner reaches the last slide.'
          : active.length > 1 ? 'The learner must meet all selected conditions.' : null}
      </p>
    </fieldset>
  );
}
