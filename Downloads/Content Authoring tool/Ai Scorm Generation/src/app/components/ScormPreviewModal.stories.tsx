import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { COURSE_TITLE, SECTIONS, presentationFor } from '../../stories/fixtures';
import ScormPreviewModal from './ScormPreviewModal';

type Panel = 'none' | 'menu' | 'help' | 'transcript';
type Args = { design: string; slide: number; panel: Panel };

const meta = {
  title: 'Editor/ScormPreviewModal',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    design: { control: 'select', options: ['corporate', 'modern', 'minimal', 'bold', 'natural', 'warm', 'ocean', 'elegant'] },
    panel: { control: 'select', options: ['none', 'menu', 'help', 'transcript'] },
  },
  args: { design: 'corporate', slide: 0, panel: 'none' },
  render: function Render(args) {
    const [playing, setPlaying] = useState(false);
    const [panel, setPanel] = useState<Panel>(args.panel);
    const [idx, setIdx] = useState(args.slide);
    const [answer, setAnswer] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ minHeight: 800 }}>
        <ScormPreviewModal
          presentationSettings={presentationFor(args.design)}
          courseTitle={COURSE_TITLE}
          sections={SECTIONS}
          scormPlaying={playing}
          setScormPlaying={setPlaying}
          scormSidePanel={panel}
          setScormSidePanel={setPanel}
          scormSlideIdx={idx}
          setScormSlideIdx={setIdx}
          scormSelectedAnswer={answer}
          setScormSelectedAnswer={setAnswer}
          scormAnswerChecked={checked}
          setScormAnswerChecked={setChecked}
          onClose={fn()}
        />
      </div>
    );
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const FirstSlide: Story = {};
export const QuizSlide: Story = { args: { slide: 4 } };
export const MenuPanel: Story = { args: { panel: 'menu' } };
export const DarkDesign: Story = { args: { design: 'modern' } };
