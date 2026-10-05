import axleLogo from '../../imports/AXLE-Korp-LOGO__2_.jpg';
import axleMark from '../../imports/axle-mark.svg';
import { LayoutDashboard, BookOpen, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router';

const W_EXPANDED  = 220;
const W_COLLAPSED =  64;
const HEADER_H    =  80; // must match global header height

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
    iconBg: '#F97316',
  },
  {
    id: 'courses',
    label: 'Course Authoring',
    icon: BookOpen,
    path: '/courses',
    iconBg: '#F97316',
    matchPaths: ['/courses', '/ai-create-course'],
  },
];

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const { pathname } = useLocation();

  const isItemActive = (item: (typeof NAV_ITEMS)[number]) =>
    item.matchPaths ? item.matchPaths.includes(pathname) : pathname === item.path;

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? W_COLLAPSED : W_EXPANDED }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed left-0 top-0 bg-white border-r border-gray-100 flex flex-col z-30 shadow-sm"
      style={{ height: '100vh', overflow: 'hidden', fontFamily: 'Nunito Sans, system-ui, sans-serif' }}
    >
      {/* ── Logo row — same height as global header ── */}
      <AnimatePresence mode="wait" initial={false}>
        {isCollapsed ? (
          /* ChatGPT-style: clicking/hovering the logo mark expands the sidebar */
          <motion.button
            key="collapsed-logo"
            type="button"
            onClick={() => setIsCollapsed(false)}
            aria-label="Expand sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="group border-b border-gray-100 shrink-0 w-full flex items-center justify-center transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1565F0]"
            style={{ height: HEADER_H, padding: '0 12px', background: 'transparent', cursor: 'pointer' }}
          >
            <span style={{ position: 'relative', width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Orange A-mark — fades out on hover */}
              <img
                src={axleMark}
                alt="Axle KORP"
                className="transition-opacity duration-150 group-hover:opacity-0"
                style={{ width: 36, height: 36, objectFit: 'contain' }}
              />
              {/* Expand icon — fades in on hover, pill matches the expanded PanelLeftClose button */}
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                <span className="flex size-8 items-center justify-center rounded-lg bg-transparent transition-colors group-hover:bg-gray-100">
                  <PanelLeftOpen size={18} color="#6B7280" />
                </span>
              </span>
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="border-b border-gray-100 shrink-0 flex items-center"
            style={{ height: HEADER_H, padding: '0 12px 0 20px' }}
          >
            <img
              src={axleLogo}
              alt="Axle KORP"
              style={{ height: 36, width: 'auto', objectFit: 'contain', display: 'block', maxWidth: 140, flex: '1 1 auto', minWidth: 0 }}
            />
            {/* PanelLeftClose — collapses sidebar, lives inside the header row */}
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              aria-label="Collapse navigation"
              title="Collapse navigation"
              className="group/collapse relative flex shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1565F0]"
              style={{ width: 32, height: 32, marginLeft: 4 }}
            >
              <PanelLeftClose size={18} className="text-gray-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-hidden" style={{ padding: '12px 10px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map(item => {
            const Icon   = item.icon;
            const active = isItemActive(item);

            return (
              <div key={item.id} className="relative group">
                <Link
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isCollapsed ? 0 : 10,
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    minHeight: 48,
                    borderRadius: 10,
                    padding: isCollapsed ? '8px 0' : '8px 10px',
                    background: active ? '#FFF3E5' : 'transparent',
                    textDecoration: 'none',
                    transition: 'background 0.12s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = '#F9FAFB';
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {/* Colored icon badge */}
                  <div
                    style={{
                      width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                      background: active ? item.iconBg : '#F3F4F6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.12s',
                    }}
                  >
                    <Icon size={17} color={active ? '#fff' : '#6B7280'} />
                  </div>

                  {/* Label — only when expanded */}
                  {!isCollapsed && (
                    <span style={{
                      fontSize: 13, fontWeight: active ? 600 : 500,
                      color: active ? '#EA580C' : '#6B7280',
                      lineHeight: 1.35,
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                    }}>
                      {item.label}
                    </span>
                  )}
                </Link>

                {/* Tooltip — collapsed state only */}
                {isCollapsed && (
                  <div
                    className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      position: 'absolute',
                      left: 'calc(100% + 12px)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: '#1F2937',
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 500,
                      padding: '5px 10px',
                      borderRadius: 6,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      zIndex: 100,
                    }}
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* ── Footer ── */}
      <div className="shrink-0 border-t border-gray-100" style={{ padding: '10px 0', textAlign: 'center' }}>
        <AnimatePresence mode="wait" initial={false}>
          {isCollapsed ? (
            <motion.span
              key="nt"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              style={{ fontSize: 13, fontWeight: 700, color: '#6B7280', letterSpacing: '0.05em' }}
            >
              NT
            </motion.span>
          ) : (
            <motion.p
              key="full"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              style={{ fontSize: 13, color: '#6B7280', margin: 0 }}
            >
              Powered by <span style={{ fontWeight: 600, color: '#6B7280' }}>NOVACTECH</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
