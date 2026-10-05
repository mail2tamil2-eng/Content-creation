import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, BookOpen } from 'lucide-react';
import { AppSidebar, AppHeader, type NavGroup } from './saas';
import { CreateCourseModal } from './CreateCourseModal';
import axleLogo from '../../imports/AXLE-Korp-LOGO__2_.jpg';
import axleMark from '../../imports/axle-mark.svg';

const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'courses',   label: 'Course Authoring', icon: BookOpen },
    ],
  },
];

const Logo     = <img src={axleLogo} alt="Axle KORP" style={{ height: 36, width: 'auto', objectFit: 'contain', maxWidth: 160 }} />;
const LogoMark = <img src={axleMark} alt="Axle KORP" style={{ width: 36, height: 36, objectFit: 'contain' }} />;

export function Layout() {
  const location = useLocation();
  const navigate  = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (location.pathname === '/ai-create-course') setIsSidebarCollapsed(true);
  }, [location.pathname]);

  const activeId = location.pathname.startsWith('/courses') || location.pathname === '/ai-create-course'
    ? 'courses'
    : 'dashboard';

  const handleNavigate = (id: string) => {
    navigate(id === 'courses' ? '/courses' : '/dashboard');
  };

  const sidebarW = isSidebarCollapsed ? 64 : 220;
  const isEditor = location.pathname === '/ai-create-course';

  return (
    <div
      className={isEditor ? '' : 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'}
      style={isEditor ? { height: '100dvh', overflow: 'hidden' } : {}}
    >
      {/* Sidebar */}
      <div className="fixed left-0 top-0 z-30 h-screen" style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif' }}>
        <AppSidebar
          groups={NAV_GROUPS}
          activeId={activeId}
          onNavigate={handleNavigate}
          collapsed={isSidebarCollapsed}
          onToggleCollapsed={() => setIsSidebarCollapsed(c => !c)}
          logo={Logo}
          logoMark={LogoMark}
          footer={<>Powered by <b className="font-semibold">NOVACTECH</b></>}
          footerCollapsed={<b className="font-bold tracking-wider">NT</b>}
        />
      </div>

      {/* Header */}
      <div
        className="fixed top-0 right-0 z-20"
        style={{ left: sidebarW, transition: 'left 200ms ease' }}
      >
        <AppHeader
          userName="Dheva"
          userRole="Course Creator"
          notificationCount={1}
        />
      </div>

      <main
        className={isEditor ? 'transition-all duration-300' : 'px-8 pb-8 transition-all duration-300'}
        style={isEditor
          ? { position: 'fixed', top: 80, bottom: 0, left: sidebarW, right: 0, overflow: 'hidden', padding: 0, transition: 'left 200ms ease' }
          : { paddingTop: '80px', marginLeft: sidebarW, transition: 'margin-left 200ms ease' }
        }
      >
        <Outlet context={{ onCreateCourse: () => setIsCreateModalOpen(true) }} />
      </main>

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
