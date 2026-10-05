import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  APPROVED_PAIRS_DARK, APPROVED_PAIRS_LIGHT, FORBIDDEN_LIGHT, RADII, SCALES, SEMANTIC, SHADOWS, SPACING, TYPE_SCALE, contrast,
} from './tokens';

const meta = {
  title: 'Foundations/Design tokens',
  parameters: {
    layout: 'padded',
    // Forbidden pairs are rendered on purpose to show what fails.
    a11y: { test: 'off' },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 20, fontWeight: 700, margin: '32px 0 12px' }}>{children}</h2>
);

function PairTable({ pairs, min = 4.5 }: { pairs: readonly { use: string; fg: string; bg: string }[]; min?: number }) {
  return (
    <table style={{ borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr style={{ textAlign: 'left' }}>
          <th style={{ padding: '6px 12px' }}>Use</th>
          <th style={{ padding: '6px 12px' }}>Sample</th>
          <th style={{ padding: '6px 12px' }}>Foreground / background</th>
          <th style={{ padding: '6px 12px' }}>Ratio</th>
        </tr>
      </thead>
      <tbody>
        {pairs.map((p) => {
          const r = contrast(p.fg, p.bg);
          const pass = r >= min;
          return (
            <tr key={p.use + p.fg + p.bg}>
              <td style={{ padding: '6px 12px' }}>{p.use}</td>
              <td style={{ padding: '6px 12px' }}>
                <span style={{ color: p.fg, background: p.bg, padding: '6px 12px', borderRadius: 8, border: '1px solid #E2E8F0', display: 'inline-block' }}>
                  Aa Sample text
                </span>
              </td>
              <td style={{ padding: '6px 12px', fontFamily: 'monospace' }}>{p.fg} / {p.bg}</td>
              <td style={{ padding: '6px 12px', fontWeight: 600 }}>
                {r.toFixed(1)}:1 {pass ? '✓ pass' : '✗ fail'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export const Colors: Story = {
  render: () => (
    <div>
      {Object.entries(SCALES).map(([name, scale]) => (
        <div key={name}>
          <Heading>{name}</Heading>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Object.entries(scale).map(([step, hex]) => (
              <div key={step} style={{ width: 96 }}>
                <div style={{ height: 56, background: hex, borderRadius: 8, border: '1px solid #E2E8F0' }} />
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>{name}-{step}</div>
                <div style={{ fontSize: 12, fontFamily: 'monospace' }}>{hex}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Heading>Semantic</Heading>
      <div style={{ display: 'flex', gap: 12 }}>
        {SEMANTIC.map((s) => (
          <div key={s.name} style={{ background: s.bg, color: s.fg, padding: '12px 16px', borderRadius: 8, border: `1px solid ${s.fg}`, fontWeight: 600 }}>
            {s.name}
          </div>
        ))}
      </div>
      <Heading>Brand gradient (decorative only)</Heading>
      <div style={{ height: 64, width: 400, borderRadius: 12, background: 'linear-gradient(135deg, #F48120 0%, #F05A28 100%)' }} />
    </div>
  ),
};

export const ApprovedPairs: Story = {
  render: () => (
    <div>
      <Heading>Approved pairs — light mode</Heading>
      <PairTable pairs={APPROVED_PAIRS_LIGHT} />
      <Heading>Approved pairs — dark mode</Heading>
      <PairTable pairs={APPROVED_PAIRS_DARK} />
      <Heading>Forbidden — light mode</Heading>
      <PairTable pairs={FORBIDDEN_LIGHT} />
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ fontFamily: 'Nunito Sans, system-ui, sans-serif', display: 'grid', gap: 16 }}>
      {TYPE_SCALE.map((t) => (
        <div key={t.token} style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
          <code style={{ width: 160, fontSize: 12 }}>{t.token} · {t.size}/{t.line} · {t.weight}</code>
          <span style={{ fontSize: t.size, lineHeight: `${t.line}px`, fontWeight: t.weight }}>{t.use}</span>
        </div>
      ))}
    </div>
  ),
};

export const SpacingRadiusShadow: Story = {
  render: () => (
    <div>
      <Heading>Spacing (8px grid)</Heading>
      <div style={{ display: 'grid', gap: 8 }}>
        {SPACING.map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <code style={{ width: 40, fontSize: 12 }}>{s}</code>
            <div style={{ width: s, height: 16, background: '#4B7FBF', borderRadius: 2 }} />
          </div>
        ))}
      </div>
      <Heading>Radius</Heading>
      <div style={{ display: 'flex', gap: 16 }}>
        {Object.entries(RADII).map(([k, v]) => (
          <div key={k} style={{ textAlign: 'center', fontSize: 12 }}>
            <div style={{ width: 72, height: 72, borderRadius: v, background: '#EEF4FB', border: '2px solid #154880' }} />
            {k} · {v === 9999 ? 'full' : `${v}px`}
          </div>
        ))}
      </div>
      <Heading>Shadows</Heading>
      <div style={{ display: 'flex', gap: 24 }}>
        {Object.entries(SHADOWS).map(([k, v]) => (
          <div key={k} style={{ width: 140, height: 88, borderRadius: 12, background: '#FFFFFF', boxShadow: v, display: 'grid', placeItems: 'center', fontSize: 12, color: '#0F172A' }}>
            shadow-{k}
          </div>
        ))}
      </div>
    </div>
  ),
};
