import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecentCourse } from './RecentCourse';

const meta = {
  title: 'Dashboard/RecentCourse',
  component: RecentCourse,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-96"><Story /></div>],
} satisfies Meta<typeof RecentCourse>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
