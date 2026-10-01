import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CreateCourseModal } from './CreateCourseModal';

export function Layout() {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const userName = 'Dheva';

  useEffect(() => {
    if (location.pathname === '/ai-create-course') {
      setIsSidebarCollapsed(true);
    }
  }, [location.pathname]);

  // Determine active tab based on route
  const getActiveTab = () => {
    if (location.pathname === '/courses') return 'courses';
    if (location.pathname === '/resume') return 'resume';
    return 'dashboard';
  };

  const isEditor = location.pathname === '/ai-create-course';

  return (
    <div
      className={isEditor ? '' : 'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'}
      style={isEditor ? { height: '100dvh', overflow: 'hidden' } : {}}
    >
      <Sidebar
        activeTab={getActiveTab()}
        setActiveTab={() => {}}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <Header userName={userName} isCollapsed={isSidebarCollapsed} />

      <main
        className={isEditor ? 'transition-all duration-300' : 'px-8 pb-8 transition-all duration-300'}
        style={isEditor
          ? {
              position: 'fixed',
              top: 80, bottom: 0,
              left: isSidebarCollapsed ? 64 : 220,
              right: 0,
              overflow: 'hidden',
              padding: 0,
              transition: 'left 200ms ease',
            }
          : { paddingTop: '80px', marginLeft: isSidebarCollapsed ? '64px' : '220px', transition: 'margin-left 200ms ease' }
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
