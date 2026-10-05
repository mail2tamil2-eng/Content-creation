import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { withRouter } from '../../../.storybook/decorators';
import { CreateCourseModal } from './CreateCourseModal';

const meta = {
  title: 'Courses/CreateCourseModal',
  component: CreateCourseModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [withRouter('/dashboard'), (Story) => <div style={{ minHeight: 640 }}><Story /></div>],
  args: { isOpen: true, onClose: fn() },
} satisfies Meta<typeof CreateCourseModal>;

export default meta;
export const Open: StoryObj<typeof meta> = {};
