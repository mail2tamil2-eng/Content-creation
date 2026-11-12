import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { COURSE_TEMPLATES, SAMPLE_SLIDES } from './courseTemplates';
import { TemplateGallery } from './TemplateGallery';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { TemplateSlide } from './TemplateSlide';

const meta = {
  title: 'Slides/Templates',
  component: TemplateGallery,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { selectedId: COURSE_TEMPLATES[0].id, onSelect: fn(), columns: 3 },
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selectedId);
    return (
      <div style={{ maxWidth: 760 }}>
        <TemplateGallery {...args} selectedId={selected} onSelect={id => { setSelected(id); args.onSelect(id); }} />
      </div>
    );
  },
} satisfies Meta<typeof TemplateGallery>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Template picker: real cover thumbnails; hover a card to reveal "Preview". */
export const Gallery: Story = {};

export const NothingSelected: Story = { args: { selectedId: null } };

/** Keyboard: Tab to a card shows its Preview button. */
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: `Preview ${COURSE_TEMPLATES[0].name} template` })).toHaveFocus();
  },
};

/** The Preview popup: every slide layout of one template. */
export const PreviewPopup: StoryObj<typeof TemplatePreviewModal> = {
  render: () => {
    const [id, setId] = useState<string | null>(COURSE_TEMPLATES[0].id);
    return (
      <>
        <button type="button" onClick={() => setId(COURSE_TEMPLATES[0].id)}>Open preview</button>
        <TemplatePreviewModal
          template={COURSE_TEMPLATES.find(t => t.id === id) ?? null}
          onOpenChange={o => { if (!o) setId(null); }}
          onUse={() => setId(null)}
        />
      </>
    );
  },
};

/** Design reference sheet: all 10 templates × 10 slide layouts (for developer handoff). */
export const AllTemplatesAllLayouts: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: 24, background: '#F3F4F6', fontFamily: 'Nunito Sans, sans-serif' }}>
      {COURSE_TEMPLATES.map(t => (
        <section key={t.id} style={{ marginBottom: 32 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 18 }}>{t.name} <code style={{ fontSize: 12, color: '#4B5563' }}>{t.id}</code></h2>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: '#4B5563' }}>{t.description} · {t.fonts.heading} / {t.fonts.body} · motif: {t.motif} · cover: {t.cover.layout}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 12 }}>
            {SAMPLE_SLIDES.map(s => (
              <figure key={s.kind} style={{ margin: 0 }}>
                <TemplateSlide template={t} kind={s.kind} />
                <figcaption style={{ fontSize: 12, color: '#374151', marginTop: 4 }}>{s.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
