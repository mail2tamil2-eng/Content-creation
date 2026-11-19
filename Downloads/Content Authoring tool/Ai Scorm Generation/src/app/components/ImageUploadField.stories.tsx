import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ImageUploadField } from './ImageUploadField';
import { generatePhoto, isLibraryPhoto, samplePhoto } from './slidePhotos';

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
export const WithRecommendedSize: Story = { args: { recommendedSize: '1200 × 960 px (5:4)' } };

/** Keyboard: Tab reaches the Upload button. */
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole('button', { name: /Upload image/ })).toHaveFocus();
  },
};

/** "Regenerate with AI": shows a loading overlay, then the new picture with an "AI image" tag. */
export const WithRegenerate: Story = {
  args: { onRegenerate: () => generatePhoto('tpl-forest-hexa', [samplePhoto('tpl-forest-hexa', 0)], 600) },
  render: function Render(args) {
    const [v, setV] = useState(args.value);
    return <div style={{ width: 288 }}><ImageUploadField {...args} value={v} generated={isLibraryPhoto(v)} onChange={u => { setV(u); args.onChange(u); }} /></div>;
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: 'Regenerate with AI' }));
    await expect(await c.findByText('AI image', {}, { timeout: 3000 })).toBeInTheDocument();
  },
};
/** While generating: button disabled, overlay on the picture. */
export const Generating: Story = { args: { onRegenerate: () => new Promise<string>(() => undefined) },
  play: async ({ canvasElement }) => { await userEvent.click(within(canvasElement).getByRole('button', { name: 'Regenerate with AI' })); } };
