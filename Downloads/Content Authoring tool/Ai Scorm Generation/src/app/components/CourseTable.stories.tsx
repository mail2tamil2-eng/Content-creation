import type { Meta, StoryObj } from '@storybook/react-vite';
import { withCourses, withRouter } from '../../../.storybook/decorators';
import { CourseTable } from './CourseTable';

const meta = {
  title: 'Courses/CourseTable',
  component: CourseTable,
  tags: ['autodocs'],
  decorators: [withCourses, withRouter('/courses')],
} satisfies Meta<typeof CourseTable>;

export default meta;
/** Publish / download / copy / delete actions mutate the CourseContext mock state. */
export const Default: StoryObj<typeof meta> = {};
