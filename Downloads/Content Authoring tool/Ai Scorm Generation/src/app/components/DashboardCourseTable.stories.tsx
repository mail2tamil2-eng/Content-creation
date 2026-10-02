import type { Meta, StoryObj } from '@storybook/react-vite';
import { withCourses, withRouter } from '../../../.storybook/decorators';
import { DashboardCourseTable } from './DashboardCourseTable';

const meta = {
  title: 'Courses/DashboardCourseTable',
  component: DashboardCourseTable,
  tags: ['autodocs'],
  decorators: [withCourses, withRouter('/dashboard')],
} satisfies Meta<typeof DashboardCourseTable>;

export default meta;
/** Uses the mock courses from CourseContext (or whatever is saved in localStorage `authoring-courses-v1`). */
export const Default: StoryObj<typeof meta> = {};
