import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import type { CourseTopic } from '../courseContent';
import { DESIGN_OPTIONS } from './TemplatePopover';
import { generateSlideContent } from '../courseContent';
import { COURSE_TITLE, presentationFor } from '../../stories/fixtures';
import CoursePresentation from './CoursePresentation';

const SLIDE_TYPES = [
  'title-text', 'title-bullets', 'summary', 'horizontal-series', 'vertical-series', 'expandable-list', 'table',
  'image-horizontal', 'media-collection', 'video', 'audio', 'spokesperson', 'hotspot', 'click-reveal', 'slider',
  'drag-drop', 'matching', 'scenario', 'flash-card', 'branching-scenario', 'simulation', 'knowledge-check', 'quiz',
];
const DESIGNS = DESIGN_OPTIONS.map(d => d.id);

type Args = { slideType: string; design: string; title: string };

const meta = {
  title: 'Slides/CoursePresentation',
  tags: ['autodocs'],
  argTypes: {
    slideType: { control: 'select', options: SLIDE_TYPES },
    design: { control: 'select', options: DESIGNS },
  },
  args: { slideType: 'title-bullets', design: 'tpl-corporate-navy', title: 'Key security principles' },
  render: ({ slideType, design, title }) => (
    <div style={{ width: 960 }}>
      <CoursePresentation
        topic={generateSlideContent({ id: 'story', title, slideType }, COURSE_TITLE, 2)}
        courseTitle={COURSE_TITLE}
        sectionTitle="Getting started"
        index={1}
        total={6}
        settings={presentationFor(design)}
      />
    </div>
  ),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const TitleText: Story = { args: { slideType: 'title-text' } };
export const TitleBullets: Story = {};
export const Spokesperson: Story = { args: { slideType: 'spokesperson' } };
export const Quiz: Story = { args: { slideType: 'quiz', title: 'Check your understanding' } };
export const Scenario: Story = { args: { slideType: 'scenario' } };
export const ModernDesign: Story = { args: { design: 'modern' } };
export const ElegantDesign: Story = { args: { design: 'elegant' } };

/** Every design option side by side, for visual comparison. */
export const AllDesigns: Story = {
  render: ({ slideType, title }) => (
    <div className="grid grid-cols-2 gap-6" style={{ width: 1200 }}>
      {DESIGNS.map((d) => (
        <div key={d}>
          <p className="mb-2 text-sm font-semibold capitalize">{d}</p>
          <CoursePresentation
            topic={generateSlideContent({ id: d, title, slideType }, COURSE_TITLE, 1)}
            courseTitle={COURSE_TITLE}
            index={0}
            total={1}
            settings={presentationFor(d)}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Click-to-edit (Step 2 editor). Hover shows a dashed outline + label; click selects
 * (the editor focuses the matching Slide Settings field); double-click or F2 edits on the slide.
 * Enter saves (on a bullet: saves and adds the next bullet), Esc cancels.
 */
export const EditableInEditor: StoryObj<Args & { onSelectField: (k: string | null) => void }> = {
  args: { onSelectField: fn() },
  render: function Render({ slideType, design, title, onSelectField }) {
    const [topic, setTopic] = useState<CourseTopic>(() => generateSlideContent({ id: 'story', title, slideType }, COURSE_TITLE, 2));
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ width: 960 }}>
        <CoursePresentation
          topic={topic} courseTitle={COURSE_TITLE} sectionTitle="Getting started" index={1} total={6}
          settings={presentationFor(design)}
          editable selectedField={selected}
          onSelectField={k => { setSelected(k); onSelectField(k); }}
          onInlineChange={u => setTopic(t => ({ ...t, ...u }))}
        />
      </div>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const titleBtn = canvas.getByRole('button', { name: /^Title:/ });
    await userEvent.click(titleBtn);
    await expect(args.onSelectField).toHaveBeenCalledWith('title');
    titleBtn.focus();
    await userEvent.keyboard('{F2}');
    const box = await canvas.findByRole('textbox', { name: 'Title' });
    await userEvent.keyboard('{Control>}a{/Control}Edited title{Enter}');
    await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent('Edited title');
    await expect(box).not.toBeInTheDocument();
  },
};

/** Light template: brand marks (numbers, rule) keep 4.5:1 via --slide-primary-text. */
export const EditableLightTemplate: typeof EditableInEditor = { ...EditableInEditor, args: { ...EditableInEditor.args, design: 'tpl-fresh-mint' } };
