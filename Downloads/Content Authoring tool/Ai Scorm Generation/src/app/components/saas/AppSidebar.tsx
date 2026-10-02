import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '../ui/utils';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Count badge (e.g. drafts). */
  badge?: number;
  disabled?: boolean;
}

export interface NavGroup {
  /** Optional small uppercase heading (hidden when collapsed). */
  title?: string;
  items: NavItem[];
}

export interface AppSidebarProps {
  groups: NavGroup[];
  activeId: string;
  onNavigate?: (id: string) => void;
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
  /** Full logo shown when expanded. */
  logo?: ReactNode;
  /** Square mark shown when collapsed. */
  logoMark?: ReactNode;
  footer?: ReactNode;
  footerCollapsed?: ReactNode;
  className?: string;
}

/** Left navigation: 220px expanded / 64px collapsed, orange active state. Position it yourself. */
export function AppSidebar({
  groups, activeId, onNavigate, collapsed = false, onToggleCollapsed, logo, logoMark, footer, footerCollapsed, className,
}: AppSidebarProps) {
  return (
    <aside
      className={cn('relative flex h-full flex-col border-r border-gray-100 bg-white shadow-sm transition-[width] duration-200', collapsed ? 'w-16' : 'w-[220px]', className)}
      aria-label="Main navigation"
    >
      <div className={cn('flex h-20 shrink-0 items-center overflow-hidden border-b border-gray-100', collapsed ? 'justify-center px-3' : 'px-5')}>
        {collapsed ? logoMark ?? logo : logo}
      </div>

      {onToggleCollapsed && (
        <button
          type="button"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          className="absolute -right-3 top-[103px] z-40 flex size-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]"
        >
          <ChevronLeft className={cn('size-[13px] text-gray-500 transition-transform duration-200', collapsed && 'rotate-180')} />
        </button>
      )}

      <nav className="flex-1 overflow-y-auto px-2.5 pt-3">
        {groups.map((g, gi) => (
          <div key={g.title ?? gi} className={cn(gi > 0 && 'mt-4')}>
            {g.title && !collapsed && <p className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-gray-500">{g.title}</p>}
            {g.title && collapsed && gi > 0 && <hr className="mx-2 mb-2 border-gray-100" />}
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {g.items.map((item) => {
                const active = item.id === activeId;
                const Icon = item.icon;
                return (
                  <li key={item.id} className="group relative">
                    <button
                      type="button"
                      disabled={item.disabled}
                      aria-current={active ? 'page' : undefined}
                      aria-label={collapsed ? item.label : undefined}
                      onClick={() => onNavigate?.(item.id)}
                      className={cn(
                        'flex min-h-12 w-full items-center rounded-[10px] py-2 text-left transition-colors duration-100',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        collapsed ? 'justify-center px-0' : 'gap-2.5 px-2.5',
                        active ? 'bg-[#FFF3E5]' : 'hover:bg-[#F9FAFB]',
                      )}
                    >
                      <span className={cn('relative flex size-[34px] shrink-0 items-center justify-center rounded-[9px] transition-colors', active ? 'bg-[#F97316]' : 'bg-[#F3F4F6]')}>
                        <Icon className={cn('size-[17px]', active ? 'text-white' : 'text-[#6B7280]')} />
                        {collapsed && !!item.badge && <span aria-hidden className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-white bg-[#1565F0]" />}
                      </span>
                      {!collapsed && (
                        <>
                          <span className={cn('flex-1 text-[13px] leading-snug', active ? 'font-semibold text-[#C2410C]' : 'font-medium text-[#6B7280]')}>{item.label}</span>
                          {!!item.badge && (
                            <span className="rounded-full bg-[#EBF3FF] px-1.5 text-[11px] font-bold text-[#1565F0]" aria-label={`${item.badge} items`}>{item.badge}</span>
                          )}
                        </>
                      )}
                    </button>
                    {collapsed && (
                      <span role="tooltip" className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[100] -translate-y-1/2 whitespace-nowrap rounded-md bg-[#1F2937] px-2.5 py-[5px] text-[13px] font-medium text-white opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {(footer || footerCollapsed) && (
        <div className="shrink-0 border-t border-gray-100 py-2.5 text-center text-[13px] text-[#6B7280]">{collapsed ? footerCollapsed ?? footer : footer}</div>
      )}
    </aside>
  );
}
