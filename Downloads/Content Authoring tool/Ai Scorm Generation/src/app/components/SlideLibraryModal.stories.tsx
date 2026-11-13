import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SlideLibraryModal } from './SlideLibraryModal';

const meta = {
  title: 'Editor/SlideLibraryModal',
  component: SlideLibraryModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { isOpen: true, complexity: 'basic', onClose: fn(), onInsert: fn() },
  render: function Render(args) {
    const [open, setOpen] = useState(args.isOpen);
    return (
      <div style={{ padding: 24 }}>
        <button type="button" onClick={() => setOpen(true)}>Open slide library</button>
        <SlideLibraryModal {...args} isOpen={open}
          onClose={() => { setOpen(false); args.onClose(); }}
          onInsert={(t, id) => { setOpen(false); args.onInsert(t, id); }} />
      </div>
    );
  },
} satisfies Meta<typeof SlideLibraryModal>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Basic course: interactive / advanced layouts are locked. */
export const Basic: Story = {};
export const Advanced: Story = { args: { complexity: 'advanced' } };

/** Keyboard: the search box gets focus, Esc closes and focus returns to the opener. */
export const KeyboardEsc: Story = {
  args: { isOpen: false },
  play: async ({ canvasElement, args }) => {
    const opener = within(canvasElement).getByRole('button', { name: 'Open slide library' });
    await userEvent.click(opener);
    const body = within(document.body);
    await expect(await body.findByRole('dialog', { name: 'Slide library' })).toBeInTheDocument();
    await expect(body.getByRole('textbox', { name: 'Search slide templates' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(args.onClose).toHaveBeenCalled();
  },
};
