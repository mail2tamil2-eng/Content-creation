import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { withRouter } from '../../../.storybook/decorators';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'App (current)/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { activeTab: 'dashboard', setActiveTab: () => {}, isCollapsed: false, setIsCollapsed: () => {} },
  // transform makes the fixed-position sidebar render inside the story frame
  decorators: [(Story) => <div style={{ height: 560, transform: 'translateZ(0)' }}><Story /></div>],
  render: function Render(args) {
    const [collapsed, setCollapsed] = useState(args.isCollapsed);
    return <Sidebar {...args} isCollapsed={collapsed} setIsCollapsed={setCollapsed} />;
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = { decorators: [withRouter('/dashboard')] };
export const CourseAuthoring: Story = { decorators: [withRouter('/courses')] };
export const Collapsed: Story = { args: { isCollapsed: true }, decorators: [withRouter('/dashboard')] };
