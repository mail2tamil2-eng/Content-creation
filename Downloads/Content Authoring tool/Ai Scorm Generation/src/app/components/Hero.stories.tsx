import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Hero } from './Hero';

const meta = {
  title: 'Dashboard/Hero',
  component: Hero,
  tags: ['autodocs'],
  args: { userName: 'Dheva', onCreateCourse: fn() },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LongName: Story = { args: { userName: 'Annapoorani Venkataraman' } };
