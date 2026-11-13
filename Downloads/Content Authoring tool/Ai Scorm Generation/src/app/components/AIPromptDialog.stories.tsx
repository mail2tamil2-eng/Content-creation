import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { AIPromptDialog } from './AIPromptDialog';

const meta = {
  title: 'Editor/AIPromptDialog',
  component: AIPromptDialog,
  tags: ['autodocs'],
  args: {
    open: true, onOpenChange: fn(),
    title: 'Generate slide with AI',
    description: 'Describe the slide you want and AI will create it.',
    hint: 'Adds a slide at the end of “Core Concepts”.',
    placeholder: 'e.g. A slide about active listening in customer service…',
    actionLabel: 'Generate slide',
    onGenerate: fn(async () => { await new Promise(r => setTimeout(r, 600)); }),
  },
  render: function Render(args) {
    const [open, setOpen] = useState(args.open);
    return (
      <div style={{ padding: 24 }}>
        <button type="button" onClick={() => setOpen(true)}>Open</button>
        <AIPromptDialog {...args} open={open} onOpenChange={o => { setOpen(o); args.onOpenChange(o); }} />
      </div>
    );
  },
} satisfies Meta<typeof AIPromptDialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const GenerateSlide: Story = {};
export const GenerateSection: Story = {
  args: { title: 'Generate section with AI', description: 'Describe the section and topics you want to create.', hint: 'The new section is added at the end of the course.', placeholder: 'e.g. A section covering communication skills for front-desk hotel staff…', actionLabel: 'Generate' },
};

/** Typing a prompt and pressing Ctrl+Enter generates. */
export const KeyboardSubmit: Story = {
  play: async ({ args }) => {
    const body = within(document.body);
    const box = await body.findByRole('textbox');
    await userEvent.type(box, 'Active listening');
    await userEvent.keyboard('{Control>}{Enter}{/Control}');
    await expect(args.onGenerate).toHaveBeenCalledWith('Active listening');
  },
};
