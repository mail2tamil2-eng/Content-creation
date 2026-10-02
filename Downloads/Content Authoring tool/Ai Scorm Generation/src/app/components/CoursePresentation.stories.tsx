import type { Meta, StoryObj } from '@storybook/react-vite';
import { generateSlideContent } from '../courseContent';
import { COURSE_TITLE, presentationFor } from '../../stories/fixtures';
import CoursePresentation from './CoursePresentation';

const SLIDE_TYPES = [
  'title-text', 'title-bullets', 'summary', 'horizontal-series', 'vertical-series', 'expandable-list', 'table',
  'image-horizontal', 'media-collection', 'video', 'audio', 'spokesperson', 'hotspot', 'click-reveal', 'slider',
  'drag-drop', 'matching', 'scenario', 'flash-card', 'branching-scenario', 'simulation', 'knowledge-check', 'quiz',
];
const DESIGNS = ['corporate', 'modern', 'minimal', 'bold', 'natural', 'warm', 'ocean', 'elegant'];

type Args = { slideType: string; design: string; title: string };

const meta = {
  title: 'Slides/CoursePresentation',
  tags: ['autodocs'],
  argTypes: {
    slideType: { control: 'select', options: SLIDE_TYPES },
    design: { control: 'select', options: DESIGNS },
  },
  args: { slideType: 'title-bullets', design: 'corporate', title: 'Key security principles' },
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
