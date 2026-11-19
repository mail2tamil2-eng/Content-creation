import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SlidePlaybackFields, type SlidePlayback } from './SlidePlaybackFields';

const meta = {
  title: 'Slides/Settings/SlidePlaybackFields',
  component: SlidePlaybackFields,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
  args: {
    value: {},
    defaults: { slideDuration: 5, slideTransition: 'fade', seekBar: 'enable', backgroundMusic: true, backgroundMusicFile: 'calm-piano.mp3' },
    onChange: fn(),
  },
  render: function Render(args) {
    const [v, setV] = useState<SlidePlayback>(args.value);
    return <div style={{ width: 288 }}><SlidePlaybackFields {...args} value={v} onChange={p => { setV(o => ({ ...o, ...p })); args.onChange(p); }} /></div>;
  },
} satisfies Meta<typeof SlidePlaybackFields>;
export default meta;
type Story = StoryObj<typeof meta>;

/** New slide: everything follows Player Settings. */
export const CourseDefaults: Story = {};
/** This slide overrides every setting. */
export const Overridden: Story = { args: { value: { slideDuration: 12, slideTransition: 'zoom', seekBar: 'hide', backgroundMusic: 'off' } } };
/** Its own music track. */
export const CustomMusic: Story = { args: { value: { backgroundMusic: 'custom', backgroundMusicFile: 'intro-theme.mp3' } } };
/** Course has no music and manual advance. */
export const NoCourseMusic: Story = { args: { defaults: { slideDuration: 0, slideTransition: 'none', seekBar: 'hide', backgroundMusic: false } } };
/** Seek bar shown: pick what the learner can do with it. */
export const SeekBarReadOnly: Story = { args: { value: { seekBar: 'enable', seekBarOption: 'readOnly' } } };

/** Keyboard: Tab reaches Duration first. */
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByLabelText('Duration')).toHaveFocus();
  },
};
