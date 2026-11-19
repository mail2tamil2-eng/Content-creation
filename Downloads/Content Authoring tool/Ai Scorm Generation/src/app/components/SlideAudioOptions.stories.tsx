import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SlideAudioOptions, type SlideAudioValue } from './SlideAudioOptions';

const meta = {
  title: 'Slides/Settings/SlideAudioOptions',
  component: SlideAudioOptions,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
  args: {
    value: { source: 'ai' },
    slideTitle: 'Key Concepts',
    onChange: fn(),
    aiContent: <button type="button" className="h-9 w-full rounded-lg bg-[#1565F0] text-[13px] font-semibold text-white">Generate Narration with AI</button>,
  },
  render: function Render(args) {
    const [v, setV] = useState<SlideAudioValue>(args.value);
    return <div style={{ width: 300 }}><SlideAudioOptions {...args} value={v} onChange={p => { setV(o => ({ ...o, ...p })); args.onChange(p); }} /></div>;
  },
} satisfies Meta<typeof SlideAudioOptions>;
export default meta;
type Story = StoryObj<typeof meta>;

/** New slide: no audio until the author picks a source. */
export const NoAudio: Story = { args: { value: { source: 'none' } } };
export const AINarration: Story = {};
export const SlideAudio: Story = { args: { value: { source: 'upload' } } };
export const SlideAudioUploaded: Story = { args: { value: { source: 'upload', audioFile: 'key-concepts.mp3' } } };
export const TextToSpeech: Story = { args: { value: { source: 'tts', ttsVoice: 'female' } } };
export const TextToSpeechFilled: Story = { args: { value: { source: 'tts', ttsVoice: 'male', ttsText: 'Welcome to the Key Concepts section.' } } };

/** Arrow keys move between the three options. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByLabelText(/AI Audio Narration/));
    await userEvent.keyboard('{ArrowDown}');
    await expect(c.getByLabelText(/^Slide Audio/)).toBeChecked();
  },
};
