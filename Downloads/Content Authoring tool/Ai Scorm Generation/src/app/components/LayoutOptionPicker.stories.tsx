import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { GALLERY_LAYOUTS, HORIZONTAL_SERIES_LAYOUTS, IMAGE_POSITIONS, LayoutOptionPicker, VERTICAL_SERIES_LAYOUTS } from './LayoutOptionPicker';

const meta = {
  title: 'Slides/Settings/LayoutOptionPicker',
  component: LayoutOptionPicker,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
  args: { label: 'Layout', value: 'horizontal', options: GALLERY_LAYOUTS, onChange: fn() },
  render: function Render(args) {
    const [v, setV] = useState(args.value);
    return <div style={{ width: 288 }}><LayoutOptionPicker {...args} value={v} onChange={x => { setV(x); args.onChange(x); }} /></div>;
  },
} satisfies Meta<typeof LayoutOptionPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Image Gallery: scroll row or grid. */
export const GalleryLayouts: Story = {};
export const GridSelected: Story = { args: { value: 'grid' } };
/** Horizontal Series: scroll row or equal columns. */
export const HorizontalSeries: Story = { args: { value: 'scroll', options: HORIZONTAL_SERIES_LAYOUTS } };
/** Vertical Series: stack or two columns. */
export const VerticalSeries: Story = { args: { value: 'stack', options: VERTICAL_SERIES_LAYOUTS } };
/** Image + Text: picture on the left or right. */
export const ImagePosition: Story = { args: { label: 'Image position', value: 'left', options: IMAGE_POSITIONS } };

/** Keyboard: Tab into the group, arrow keys change the layout. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    await userEvent.tab();
    await expect(c.getByRole('radio', { name: 'Scroll row' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(args.onChange).toHaveBeenCalledWith('grid');
  },
};
