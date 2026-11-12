import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BulletStyleSelect } from './BulletStyleSelect';

const meta = {
  title: 'Slides/Settings/BulletStyleSelect',
  component: BulletStyleSelect,
  tags: ['autodocs'],
  args: { value: 'disc', onChange: fn() },
  render: function Render(args) {
    const [v, setV] = useState(args.value);
    return <div style={{ width: 280 }}><BulletStyleSelect {...args} value={v} onChange={x => { setV(x); args.onChange(x); }} /></div>;
  },
} satisfies Meta<typeof BulletStyleSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleDot: Story = {};
export const None: Story = { args: { value: 'none' } };
export const Tick: Story = { args: { value: 'check' } };

/** Open the list with the keyboard and pick "Square". */
export const KeyboardSelect: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox', { name: 'Bullet style' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const body = within(document.body);
    await userEvent.click(await body.findByRole('option', { name: 'Square' }));
    await expect(args.onChange).toHaveBeenCalledWith('square');
  },
};
