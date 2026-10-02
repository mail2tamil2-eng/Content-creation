import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta = {
  title: 'App (current)/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { userName: 'Dheva', isCollapsed: false },
  decorators: [(Story) => <div style={{ height: 120, position: 'relative', transform: 'translateZ(0)' }}><Story /></div>],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const SidebarCollapsed: Story = { args: { isCollapsed: true } };
