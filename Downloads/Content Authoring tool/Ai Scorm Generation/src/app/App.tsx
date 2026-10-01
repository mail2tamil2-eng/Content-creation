import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CourseProvider } from './context/CourseContext';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <CourseProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </CourseProvider>
  );
}