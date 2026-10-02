import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import * as Lucide from 'lucide-react';
import { icons, type LucideIcon } from 'lucide-react';
import { SearchBar } from '../app/components/saas/SearchBar';
import { notify, AppToaster } from '../app/components/saas/Toast';
import { Tabs } from '../app/components/saas/Tabs';

/** Icons currently imported from lucide-react somewhere in src/app, grouped by purpose. */
const GROUPS: Record<string, string[]> = {
  Navigation: ['Home', 'LayoutDashboard', 'LayoutGrid', 'Layout', 'Menu', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ArrowUpRight', 'ArrowDownRight', 'ArrowUpDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronDown', 'ChevronsUp', 'ChevronsDown', 'PanelLeftClose', 'PanelLeftOpen', 'PanelRightClose', 'PanelRightOpen', 'Navigation', 'LogOut', 'Maximize', 'Maximize2', 'MoreHorizontal', 'GripVertical', 'Move'],
  Actions: ['Plus', 'Minus', 'Edit', 'Edit2', 'Pencil', 'Copy', 'Trash2', 'Save', 'Download', 'Upload', 'FileUp', 'FileDown', 'Send', 'Search', 'Filter', 'RefreshCw', 'RotateCcw', 'RotateCw', 'Link', 'Eye', 'Crop', 'Settings', 'Check', 'Lock', 'LockKeyhole', 'Key'],
  'Status & feedback': ['Info', 'HelpCircle', 'AlertCircle', 'AlertTriangle', 'CheckCircle', 'CheckCircle2', 'XCircle', 'BadgeCheck', 'BadgeX', 'ShieldCheck', 'Loader2', 'Bell', 'Clock', 'History', 'Inbox', 'Zap'],
  'AI & authoring': ['Sparkles', 'Wand2', 'Brain', 'Palette', 'Layers', 'Languages', 'Globe', 'Captions', 'Mic', 'Music2', 'Volume2', 'Video', 'Image', 'FileAudio', 'Bold', 'Italic', 'AlignLeft', 'AlignCenter', 'AlignRight', 'List', 'ListOrdered', 'ListChecks', 'Hash', 'MousePointer', 'GitBranch', 'Square'],
  'Content & files': ['BookOpen', 'Bookmark', 'FileText', 'FileCheck', 'FileEdit', 'Folder', 'FolderOpen', 'ClipboardCheck', 'ClipboardList', 'Package', 'MessageSquare', 'Mail', 'Phone', 'Calendar', 'CalendarDays', 'MapPin'],
  'Learning & people': ['GraduationCap', 'Award', 'Target', 'User', 'Users', 'UserCheck', 'Briefcase', 'Building2'],
  'Player': ['Play', 'Pause', 'SkipBack', 'SkipForward'],
  'Commerce & analytics': ['ShoppingCart', 'Tag', 'TicketPercent', 'Percent', 'IndianRupee', 'ReceiptText', 'BarChart3', 'TrendingUp', 'TrendingDown'],
};

// Named exports include aliases (Edit, Home, AlertCircle…) that the canonical `icons` map lacks.
const lookup = { ...icons, ...(Lucide as unknown as Record<string, LucideIcon>) } as Record<string, LucideIcon>;

function IconGrid({ names, size, color }: { names: string[]; size: number; color: string }) {
  return (
    <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 p-0">
      {names.filter((n) => lookup[n]).map((n) => {
        const Icon = lookup[n];
        return (
          <li key={n}>
            <button
              type="button"
              title={`Copy import for ${n}`}
              onClick={() => {
                navigator.clipboard?.writeText(`import { ${n} } from 'lucide-react';`).catch(() => {});
                notify.success(`Copied ${n}`, { description: `import { ${n} } from 'lucide-react';` });
              }}
              className="flex h-[92px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white text-[#374151] transition-colors hover:border-[#93C5FD] hover:bg-[#EBF3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]"
            >
              <Icon size={size} color={color} aria-hidden />
              <span className="max-w-full truncate px-1 text-[11px]">{n}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

type Args = { size: number; color: string };

const meta = {
  title: 'Foundations/Icon library',
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'All icons come from **lucide-react**. Click an icon to copy its import. Icon-only buttons must have an `aria-label`.' } },
  },
  argTypes: { size: { control: { type: 'range', min: 12, max: 40, step: 2 } }, color: { control: 'color' } },
  args: { size: 22, color: '#374151' },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const UsedInApp: Story = {
  name: 'Used in the app',
  render: function Render({ size, color }) {
    const [q, setQ] = useState('');
    const filter = (list: string[]) => list.filter((n) => n.toLowerCase().includes(q.toLowerCase()));
    const total = Object.values(GROUPS).flat().filter((n) => lookup[n]).length;
    return (
      <div className="max-w-6xl">
        <AppToaster />
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="m-0 text-[13px] text-[#6B7280]">{total} icons in use</p>
          <SearchBar className="w-80" placeholder="Search icons…" value={q} onChange={setQ} />
        </div>
        <Tabs
          variant="underline"
          aria-label="Icon groups"
          items={[
            { value: 'all', label: 'All', count: total, content: Object.entries(GROUPS).map(([g, list]) => filter(list).length ? (
              <section key={g} className="mb-8">
                <h3 className="mb-3 text-sm font-bold text-[#111827]">{g}</h3>
                <IconGrid names={filter(list)} size={size} color={color} />
              </section>
            ) : null) },
            ...Object.entries(GROUPS).map(([g, list]) => ({ value: g, label: g, count: list.filter((n) => lookup[n]).length, content: <IconGrid names={filter(list)} size={size} color={color} /> })),
          ]}
        />
      </div>
    );
  },
};

export const AllLucide: Story = {
  name: 'All lucide icons',
  render: function Render({ size, color }) {
    const [q, setQ] = useState('');
    const names = useMemo(() => Object.keys(icons).filter((n) => n.toLowerCase().includes(q.toLowerCase())).slice(0, 300), [q]);
    return (
      <div className="max-w-6xl">
        <AppToaster />
        <SearchBar className="mb-4 w-80" placeholder="Search all lucide icons…" value={q} onChange={setQ} />
        <p className="mb-4 text-[13px] text-[#6B7280]">Showing {names.length} of {Object.keys(icons).length}. Search to narrow down.</p>
        <IconGrid names={names} size={size} color={color} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const Icon = lookup.Sparkles;
    return (
      <div className="flex items-end gap-6 text-[12px] text-[#6B7280]">
        {[12, 14, 16, 20, 24, 32].map((s) => (
          <div key={s} className="flex flex-col items-center gap-2"><Icon size={s} color="#1565F0" aria-hidden />{s}px</div>
        ))}
      </div>
    );
  },
};
