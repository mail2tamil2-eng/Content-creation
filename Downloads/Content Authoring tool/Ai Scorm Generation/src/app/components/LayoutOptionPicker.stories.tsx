import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { CARD_STYLES, HORIZONTAL_SERIES_LAYOUTS, IMAGE_POSITIONS, imageStyleOptions, LayoutOptionPicker, VERTICAL_SERIES_LAYOUTS } from './LayoutOptionPicker';

const meta = {
  title: 'Slides/Settings/LayoutOptionPicker',
  component: LayoutOptionPicker,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
  args: { label: 'Layout', value: 'horizontal', options: CARD_STYLES, onChange: fn() },
  render: function Render(args) {
    const [v, setV] = useState(args.value);
    return <div style={{ width: 288 }}><LayoutOptionPicker {...args} value={v} onChange={x => { setV(x); args.onChange(x); }} /></div>;
  },
} satisfies Meta<typeof LayoutOptionPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Image Gallery card style: boxed card or no box. */
export const GalleryCardStyle: Story = {};
export const NoBoxSelected: Story = { args: { value: 'plain' } };
/** Horizontal Series: scroll row or equal columns. */
export const HorizontalSeries: Story = { args: { value: 'scroll', options: HORIZONTAL_SERIES_LAYOUTS } };
/** Vertical Series: stack or two columns. */
export const VerticalSeries: Story = { args: { value: 'stack', options: VERTICAL_SERIES_LAYOUTS } };
/** Image + Text: picture on the left or right. */
export const ImagePosition: Story = { args: { label: 'Image position', value: 'left', options: IMAGE_POSITIONS } };

/** Image + Text picture shape; "Template" follows the course template (here Forest Hexa's hexagon). */
export const ImageStyle: Story = { args: { label: 'Image style', value: 'template', options: imageStyleOptions('hex', 'Hexagon') } };

/** Keyboard: Tab into the group, arrow keys change the layout. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    await userEvent.tab();
    await expect(c.getByRole('radio', { name: 'Card' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(args.onChange).toHaveBeenCalledWith('plain');
  },
};
