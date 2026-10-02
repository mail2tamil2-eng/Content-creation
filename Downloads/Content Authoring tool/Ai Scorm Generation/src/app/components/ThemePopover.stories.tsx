import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { fn } from 'storybook/test';
import { Button } from './ui/button';
import { ThemePopover } from './ThemePopover';

const meta = {
  title: 'Editor/ThemePopover',
  component: ThemePopover,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { isOpen: true, onClose: fn(), anchorEl: null, onApply: fn() },
  argTypes: { anchorEl: { control: false } },
  render: function Render(args) {
    const ref = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(args.isOpen);
    return (
      <div style={{ minHeight: 760, padding: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Button ref={ref} variant="outline" onClick={() => setOpen((o) => !o)}>Theme</Button>
        <ThemePopover {...args} isOpen={open} anchorEl={ref.current} onClose={() => { setOpen(false); args.onClose(); }} />
      </div>
    );
  },
} satisfies Meta<typeof ThemePopover>;

export default meta;
export const Open: StoryObj<typeof meta> = {};
