import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CompletionCriteria, type CompletionSource } from './CompletionCriteria';

const meta = {
  title: 'Editor/CompletionCriteria',
  component: CompletionCriteria,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
  args: {
    selected: [], onChange: fn(), passPct: 80, onPassPctChange: fn(), slidePct: 80, onSlidePctChange: fn(),
    hasFinalAssessment: true, hasKnowledgeChecks: true,
  },
  render: function Render(args) {
    const [sel, setSel] = useState<CompletionSource[]>(args.selected);
    const [pass, setPass] = useState(args.passPct);
    const [slides, setSlides] = useState(args.slidePct);
    return (
      <div style={{ width: 440 }}>
        <CompletionCriteria {...args} selected={sel} onChange={v => { setSel(v); args.onChange(v); }}
          passPct={pass} onPassPctChange={setPass} slidePct={slides} onSlidePctChange={setSlides} />
      </div>
    );
  },
} satisfies Meta<typeof CompletionCriteria>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NothingSelected: Story = {};
export const AssessmentAndSlides: Story = { args: { selected: ['final-assessment', 'slide-view'] } };
/** Course without a quiz or knowledge checks: those options are disabled with the reason. */
export const NoQuizInCourse: Story = { args: { hasFinalAssessment: false, hasKnowledgeChecks: false } };

/** Keyboard: Tab to the first option, Space ticks it and shows the pass mark. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    await userEvent.tab();
    await userEvent.keyboard(' ');
    await expect(args.onChange).toHaveBeenCalledWith(['final-assessment']);
    await expect(c.getByLabelText('Pass mark')).toBeInTheDocument();
  },
};
