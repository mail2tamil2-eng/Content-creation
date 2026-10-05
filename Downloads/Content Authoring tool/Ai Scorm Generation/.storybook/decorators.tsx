import type { Decorator } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { CourseProvider } from '../src/app/context/CourseContext';
import { Toaster } from '../src/app/components/ui/sonner';

/** For components that use <Link>, useNavigate or useLocation. */
export const withRouter =
  (initialPath = '/dashboard'): Decorator =>
  (Story) => (
    <MemoryRouter initialEntries={[initialPath]}>
      <Story />
    </MemoryRouter>
  );

/** For components that call useCourseContext(). Seeds from localStorage or the mock courses. */
export const withCourses: Decorator = (Story) => (
  <CourseProvider>
    <Story />
    <Toaster position="top-right" richColors />
  </CourseProvider>
);
