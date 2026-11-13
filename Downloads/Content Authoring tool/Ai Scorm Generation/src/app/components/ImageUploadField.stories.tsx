import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ImageUploadField } from './ImageUploadField';
import { samplePhoto } from './slidePhotos';

const meta = {
  title: 'Slides/Settings/ImageUploadField',
  component: ImageUploadField,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
  args: { label: 'Card 1 image', value: '', sampleSrc: samplePhoto('tpl-forest-hexa', 0), onChange: fn() },
  render: function Render(args) {
    const [v, setV] = useState(args.value);
    return <div style={{ width: 288 }}><ImageUploadField {...args} value={v} onChange={u => { setV(u); args.onChange(u); }} /></div>;
  },
} satisfies Meta<typeof ImageUploadField>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing uploaded yet: the sample photo is shown and marked "Sample image". */
export const SampleImage: Story = {};
/** An uploaded image: Replace + Remove. */
export const Uploaded: Story = { args: { value: samplePhoto('tpl-tech-grid', 0) } };
export const NoSample: Story = { args: { sampleSrc: undefined } };

/** Keyboard: Tab reaches the Upload button. */
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole('button', { name: /Upload image/ })).toHaveFocus();
  },
};
