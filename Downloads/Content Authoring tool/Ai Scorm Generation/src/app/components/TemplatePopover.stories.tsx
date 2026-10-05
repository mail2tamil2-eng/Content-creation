import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { fn } from 'storybook/test';
import { Button } from './ui/button';
import { TemplatePopover } from './TemplatePopover';

const meta = {
  title: 'Editor/TemplatePopover',
  component: TemplatePopover,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { isOpen: true, onClose: fn(), anchorEl: null, currentDesignId: 'corporate', onApply: fn() },
  argTypes: {
    anchorEl: { control: false },
    currentDesignId: { control: 'select', options: ['corporate', 'modern', 'minimal', 'bold', 'natural', 'warm', 'ocean', 'elegant'] },
  },
  render: function Render(args) {
    const ref = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(args.isOpen);
    const [design, setDesign] = useState(args.currentDesignId);
    return (
      <div style={{ minHeight: 640, padding: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Button ref={ref} variant="outline" onClick={() => setOpen((o) => !o)}>Template</Button>
        <TemplatePopover
          {...args}
          isOpen={open}
          anchorEl={ref.current}
          currentDesignId={design}
          onClose={() => { setOpen(false); args.onClose(); }}
          onApply={(id) => { setDesign(id); args.onApply(id); }}
        />
      </div>
    );
  },
} satisfies Meta<typeof TemplatePopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const DarkDesignSelected: Story = { args: { currentDesignId: 'elegant' } };
