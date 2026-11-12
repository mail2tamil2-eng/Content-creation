import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

export type BulletStyle = 'none' | 'disc' | 'square' | 'check' | 'arrow' | 'number';

export const BULLET_STYLES: { value: BulletStyle; label: string }[] = [
  { value: 'none',   label: 'None' },
  { value: 'disc',   label: 'Simple Dot' },
  { value: 'square', label: 'Square' },
  { value: 'check',  label: 'Tick' },
  { value: 'arrow',  label: 'Arrow' },
  { value: 'number', label: 'Numbered' },
];

/** The marker glyph for a bullet style (decorative; the option label carries the name). */
export function BulletMarker({ style, index = 0, className }: { style: string; index?: number; className?: string }) {
  const box = 'inline-flex w-4 shrink-0 items-center justify-center text-[#111827] ' + (className ?? '');
  switch (style) {
    case 'disc':   return <span aria-hidden="true" className={box}><span className="size-[6px] rounded-full bg-current" /></span>;
    case 'square': return <span aria-hidden="true" className={box}><span className="size-[6px] bg-current" /></span>;
    case 'check':  return <span aria-hidden="true" className={box + ' text-[13px] leading-none'}>✓</span>;
    case 'arrow':  return <span aria-hidden="true" className={box + ' text-[13px] leading-none'}>→</span>;
    case 'number': return <span aria-hidden="true" className={box + ' text-[12px] font-bold leading-none'}>{index + 1}.</span>;
    default:       return <span aria-hidden="true" className={box} />;
  }
}

export interface BulletStyleSelectProps {
  value: string;
  onChange: (v: BulletStyle) => void;
  /** Accessible name of the trigger. */
  label?: string;
  id?: string;
}

/**
 * Dropdown for bullet style. Each option shows its marker before the name
 * (None / ● Simple Dot / ■ Square / ✓ Tick / → Arrow / 1. Numbered).
 * Built on Radix Select: arrow keys, type-ahead, Enter/Space and Esc work.
 */
export function BulletStyleSelect({ value, onChange, label = 'Bullet style', id }: BulletStyleSelectProps) {
  const current = BULLET_STYLES.find(s => s.value === value) ?? BULLET_STYLES[1];
  return (
    <Select.Root value={current.value} onValueChange={v => onChange(v as BulletStyle)}>
      <Select.Trigger
        id={id}
        aria-label={label}
        className="flex h-9 w-full items-center gap-2 rounded-[7px] border border-[#E5E7EB] bg-[#FAFAFA] px-2.5 text-left text-[13px] text-[#111827] outline-none transition-colors hover:border-[#9CA3AF] focus-visible:border-[#1565F0] focus-visible:ring-2 focus-visible:ring-[#1565F0]/25 data-[state=open]:border-[#1565F0]"
        style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
      >
        {current.value !== 'none' && <BulletMarker style={current.value} />}
        <span className="flex-1 truncate"><Select.Value>{current.label}</Select.Value></span>
        <Select.Icon><ChevronDown className="size-4 text-[#6B7280]" aria-hidden="true" /></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-[10002] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-[#E5E7EB] bg-white p-1 shadow-lg"
          style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
        >
          <Select.Viewport>
            {BULLET_STYLES.map(s => (
              <Select.Item
                key={s.value}
                value={s.value}
                className="relative flex h-9 cursor-pointer select-none items-center gap-2 rounded-md px-2.5 pr-8 text-[13px] text-[#111827] outline-none data-[highlighted]:bg-[#EBF3FF] data-[state=checked]:font-semibold data-[state=checked]:text-[#1254C7]"
              >
                {s.value !== 'none' && <BulletMarker style={s.value} className="!text-inherit" />}
                <Select.ItemText>{s.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2.5 inline-flex">
                  <Check className="size-3.5" aria-hidden="true" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
