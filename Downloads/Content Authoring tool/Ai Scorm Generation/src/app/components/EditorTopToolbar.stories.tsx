import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { EditorTopToolbar } from './EditorTopToolbar';

const meta = {
  title: 'Editor/EditorTopToolbar',
  component: EditorTopToolbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    courseTitle: 'Information Security Essentials',
    language: 'English',
    rightPanelOpen: true,
    showMoreMenu: false,
    isSidebarCollapsed: true,
    currentDesignId: 'corporate',
    onToggleRightPanel: fn(),
    onToggleMoreMenu: fn(),
    onOpenCourseSettings: fn(),
    onPublish: fn(),
    onPreview: fn(),
    onSaveDraft: fn(),
    onDuplicate: fn(),
    onDelete: fn(),
    onApplyTheme: fn(),
    onApplyTemplate: fn(),
  },
  decorators: [(Story) => <div style={{ minHeight: 480, transform: 'translateZ(0)' }}><Story /></div>],
  render: function Render(args) {
    const [panel, setPanel] = useState(args.rightPanelOpen);
    const [more, setMore] = useState(args.showMoreMenu);
    const [design, setDesign] = useState(args.currentDesignId);
    return (
      <EditorTopToolbar
        {...args}
        rightPanelOpen={panel}
        showMoreMenu={more}
        currentDesignId={design}
        onToggleRightPanel={() => { setPanel((p) => !p); args.onToggleRightPanel(); }}
        onToggleMoreMenu={() => { setMore((m) => !m); args.onToggleMoreMenu(); }}
        onApplyTemplate={(id) => { setDesign(id); args.onApplyTemplate?.(id); }}
      />
    );
  },
} satisfies Meta<typeof EditorTopToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const MoreMenuOpen: Story = { args: { showMoreMenu: true } };
export const LongTitle: Story = { args: { courseTitle: 'Information Security Management System 2026 — Annual Compliance Refresher for All Staff' } };
