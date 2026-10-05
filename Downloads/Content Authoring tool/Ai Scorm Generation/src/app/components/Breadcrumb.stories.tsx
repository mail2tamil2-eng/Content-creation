import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter } from '../../../.storybook/decorators';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [withRouter('/courses')],
  args: { items: [{ label: 'Course Authoring', path: '/courses' }, { label: 'Translations' }] },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SingleLevel: Story = { args: { items: [{ label: 'Dashboard' }] } };
export const Deep: Story = {
  args: {
    items: [
      { label: 'Course Authoring', path: '/courses' },
      { label: 'Introduction to SCORM', path: '/courses/1' },
      { label: 'Translations' },
    ],
  },
};
