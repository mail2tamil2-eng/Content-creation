import React, { useState } from 'react';
import type { CourseTopic } from '../courseContent';

// ── Type helpers ──────────────────────────────────────────────────────────────

type AccordionItem = { id: string; heading: string; body: string };
type SeriesItem    = { id: string; label: string; description: string };
type ImageCard     = { id: string; heading: string; description: string };
type HotspotItem   = { id: string; title: string; content: string };
type RevealCard    = { id: string; front: string; back: string };
type MatchPair     = { id: string; left: string; right: string };
type Step          = { id: string; text: string };
type FlashCard     = { id: string; front: string; back: string };
type Choice        = { id: string; text: string; outcome: string };
type QuizOption    = { id: string; text: string; correct: boolean };
type DragItem      = { id: string; label: string; zone: string };
type DropZone      = { id: string; label: string };

function g<T>(topic: CourseTopic, key: string): T {
  return (topic as Record<string, unknown>)[key] as T;
}

const empty = (s: string | undefined) => !s || s.trim() === '';
const Dim = ({ children }: { children: React.ReactNode }) => (
  <span style={{ opacity: 0.38, fontStyle: 'italic' }}>{children}</span>
);

// ── Shared slide-scale sizing ─────────────────────────────────────────────────

const fs = {
  sm:  'clamp(10px, 1.5cqw, 14px)',
  md:  'clamp(12px, 1.9cqw, 18px)',
  lg:  'clamp(14px, 2.2cqw, 22px)',
} as const;

// ── Slide type renderers ──────────────────────────────────────────────────────

function TitleText({ topic }: { topic: CourseTopic }) {
  const body  = g<string>(topic, 'content') || topic.content;
  const align = (g<string>(topic, 'alignment') || 'left') as React.CSSProperties['textAlign'];
  return (
    <p style={{ margin: 0, fontSize: fs.md, lineHeight: 1.7, textAlign: align, whiteSpace: 'pre-wrap', color: 'var(--slide-text)' }}>
      {empty(body) ? <Dim>Add body text in Slide Settings</Dim> : body}
    </p>
  );
}

function TitleBullets({ topic }: { topic: CourseTopic }) {
  const intro   = g<string>(topic, 'introText');
  const bullets = g<string[]>(topic, 'bullets') || topic.bullets || [];
  const style   = g<string>(topic, 'bulletStyle') || 'disc';
  const active  = bullets.filter(Boolean);

  const bullet = (b: string, i: number) => {
    let marker: React.ReactNode = '•';
    if (style === 'number') marker = <span style={{ fontWeight: 700, color: 'var(--slide-primary)', minWidth: '1.4em', display: 'inline-block' }}>{i + 1}.</span>;
    if (style === 'arrow')  marker = <span style={{ color: 'var(--slide-primary)' }}>→</span>;
    if (style === 'check')  marker = <span style={{ color: 'var(--slide-primary)' }}>✓</span>;
    return (
      <li key={i} style={{ display: 'flex', gap: 'clamp(6px,1cqw,10px)', alignItems: 'flex-start', listStyle: 'none' }}>
        <span style={{ fontSize: fs.md, flexShrink: 0, marginTop: 2 }}>{marker}</span>
        <span style={{ fontSize: fs.md, lineHeight: 1.65 }}>{b}</span>
      </li>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      {intro && <p style={{ margin: 0, fontSize: fs.md, opacity: 0.8, lineHeight: 1.6 }}>{intro}</p>}
      {active.length
        ? <ul style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.7cqw,8px)' }}>{active.map(bullet)}</ul>
        : <p style={{ margin: 0, fontSize: fs.md }}><Dim>Add bullet items in Slide Settings</Dim></p>}
    </div>
  );
}

function Series({ topic, dir }: { topic: CourseTopic; dir: 'h' | 'v' }) {
  const items = g<SeriesItem[]>(topic, 'seriesItems') || [];
  if (!items.length) return <p style={{ fontSize: fs.md }}><Dim>Add series items in Slide Settings</Dim></p>;

  if (dir === 'h') {
    return (
      <div style={{ display: 'flex', gap: 'clamp(8px,1.2cqw,14px)', overflowX: 'auto', paddingBottom: 4 }}>
        {items.map((item, i) => (
          <div key={item.id || i} style={{ flex: '0 0 auto', minWidth: 'clamp(100px,18cqw,180px)', padding: 'clamp(8px,1.3cqw,14px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)' }}>
            <p style={{ margin: '0 0 clamp(3px,0.5cqw,6px)', fontSize: fs.lg, fontWeight: 700 }}>{item.label || <Dim>{`Item ${i + 1}`}</Dim>}</p>
            <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.75, lineHeight: 1.55 }}>{item.description || <Dim>Description</Dim>}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,0.9cqw,10px)' }}>
      {items.map((item, i) => (
        <div key={item.id || i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(8px,1.2cqw,14px)', padding: 'clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)' }}>
          <span style={{ fontSize: fs.lg, fontWeight: 800, color: 'var(--slide-primary)', flexShrink: 0, minWidth: '1.6em', textAlign: 'center' }}>{i + 1}</span>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: fs.md, fontWeight: 600 }}>{item.label || <Dim>{`Step ${i + 1}`}</Dim>}</p>
            <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.75, lineHeight: 1.55 }}>{item.description || <Dim>Description</Dim>}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExpandableList({ topic }: { topic: CourseTopic }) {
  const items   = g<AccordionItem[]>(topic, 'accordionItems') || [];
  const defOpen = g<number>(topic, 'defaultOpenIndex') ?? 0;
  const [openIdx, setOpenIdx] = useState<number | null>(defOpen >= 0 ? defOpen : null);

  if (!items.length) return <p style={{ fontSize: fs.md }}><Dim>Add accordion items in Slide Settings</Dim></p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.6cqw,7px)' }}>
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={item.id || i} style={{ border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 18%,transparent)', borderRadius: 'var(--slide-radius)', overflow: 'hidden', background: isOpen ? 'var(--slide-panel)' : 'transparent', transition: 'background 0.15s' }}>
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'clamp(7px,1.1cqw,11px) clamp(10px,1.5cqw,15px)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 8, color: 'var(--slide-text)' }}
            >
              <span style={{ fontSize: fs.md, fontWeight: 600, flex: 1 }}>
                {empty(item.heading) ? <Dim>{`Item ${i + 1} heading`}</Dim> : item.heading}
              </span>
              <span style={{ fontSize: fs.md, color: 'var(--slide-primary)', flexShrink: 0, display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }}>▾</span>
            </button>
            {isOpen && (
              <div style={{ padding: 'clamp(4px,0.7cqw,8px) clamp(10px,1.5cqw,15px) clamp(8px,1.1cqw,11px)', borderTop: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 12%,transparent)' }}>
                <p style={{ margin: 0, fontSize: fs.sm, lineHeight: 1.65, opacity: empty(item.body) ? 0.45 : 1, fontStyle: empty(item.body) ? 'italic' : 'normal' }}>
                  {empty(item.body) ? 'Add description in Slide Settings' : item.body}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Table({ topic }: { topic: CourseTopic }) {
  const headers = g<string[]>(topic, 'tableHeaders') || ['Column 1', 'Column 2'];
  const rows    = g<string[][]>(topic, 'tableRows') || [];
  const hStyle  = g<string>(topic, 'headerStyle') || 'filled';

  const thBg    = hStyle === 'filled' ? 'var(--slide-primary)' : 'transparent';
  const thColor = hStyle === 'filled' ? '#fff' : 'var(--slide-text)';
  const thBdr   = hStyle === 'outlined' ? '2px solid var(--slide-primary)' : '1px solid transparent';
  const cell: React.CSSProperties = { padding: 'clamp(5px,0.9cqw,9px) clamp(8px,1.2cqw,12px)', fontSize: fs.sm, textAlign: 'left', borderBottom: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 12%,transparent)' as string };

  return (
    <div style={{ overflowX: 'auto', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: fs.sm }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{ ...cell, background: thBg, color: thColor, border: thBdr, fontWeight: 700 }}>{h || <Dim>{`Col ${i + 1}`}</Dim>}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 ? 'var(--slide-panel)' : 'transparent' }}>
              {headers.map((_, ci) => <td key={ci} style={cell}>{row[ci] || ''}</td>)}
            </tr>
          )) : (
            <tr><td colSpan={headers.length} style={{ ...cell, textAlign: 'center', opacity: 0.4, fontStyle: 'italic' }}>Add rows in Slide Settings</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ImageCards({ topic }: { topic: CourseTopic }) {
  const cards  = g<ImageCard[]>(topic, 'imageCards') || [];
  const layout = g<string>(topic, 'layout') || 'horizontal';
  if (!cards.length) return <p style={{ fontSize: fs.md }}><Dim>Add image cards in Slide Settings</Dim></p>;

  const isGrid = layout === 'grid' || layout === 'masonry';
  return (
    <div style={{ display: 'flex', flexWrap: isGrid ? 'wrap' : 'nowrap', gap: 'clamp(6px,1cqw,12px)', overflowX: isGrid ? 'visible' : 'auto' }}>
      {cards.map((card, i) => (
        <div key={card.id || i} style={{ flex: isGrid ? '1 1 clamp(100px,28%,200px)' : '0 0 auto', minWidth: isGrid ? undefined : 'clamp(90px,16cqw,160px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', overflow: 'hidden', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 12%,transparent)' }}>
          <div style={{ height: 'clamp(40px,7cqw,70px)', background: 'color-mix(in srgb,var(--slide-primary) 15%,var(--slide-panel))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fs.sm, opacity: 0.5 }}>Image</div>
          <div style={{ padding: 'clamp(6px,0.9cqw,9px)' }}>
            <p style={{ margin: '0 0 2px', fontSize: fs.sm, fontWeight: 600 }}>{card.heading || <Dim>{`Card ${i + 1}`}</Dim>}</p>
            {card.description && <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.7, lineHeight: 1.5 }}>{card.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function VideoSlide({ topic }: { topic: CourseTopic }) {
  const caption = g<string>(topic, 'caption');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <div style={{ aspectRatio: '16/9', background: '#111', borderRadius: 'var(--slide-radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(18px,4cqw,40px)' }}>
        <span style={{ opacity: 0.6 }}>▶</span>
      </div>
      {caption && <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.7, textAlign: 'center' }}>{caption}</p>}
    </div>
  );
}

function AudioSlide({ topic }: { topic: CourseTopic }) {
  const transcript = g<string>(topic, 'transcript') || topic.audioScript;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2cqw,12px)' }}>
      <div style={{ padding: 'clamp(10px,1.5cqw,16px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.2cqw,12px)' }}>
        <span style={{ fontSize: 'clamp(16px,3cqw,28px)' }}>🎵</span>
        <div style={{ flex: 1, height: 'clamp(4px,0.6cqw,6px)', background: 'color-mix(in srgb,var(--slide-text) 15%,transparent)', borderRadius: 3 }}><div style={{ width: '30%', height: '100%', background: 'var(--slide-primary)', borderRadius: 3 }} /></div>
        <span style={{ fontSize: fs.sm, opacity: 0.6 }}>0:00</span>
      </div>
      {transcript && <p style={{ margin: 0, fontSize: fs.sm, lineHeight: 1.6, opacity: 0.75 }}><em>Transcript: </em>{transcript}</p>}
    </div>
  );
}

function Spokesperson({ topic }: { topic: CourseTopic }) {
  const script = g<string>(topic, 'script') || topic.script;
  return (
    <div style={{ display: 'flex', gap: 'clamp(10px,1.5cqw,16px)', alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, width: 'clamp(36px,7cqw,70px)', height: 'clamp(36px,7cqw,70px)', borderRadius: '50%', background: 'var(--slide-panel)', border: '2px solid var(--slide-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(14px,3cqw,28px)' }}>👤</div>
      <div>
        <p style={{ margin: '0 0 clamp(3px,0.5cqw,6px)', fontSize: fs.sm, fontWeight: 700, color: 'var(--slide-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Presenter · {g<string>(topic, 'avatar') || 'Maya'}</p>
        <p style={{ margin: 0, fontSize: fs.md, lineHeight: 1.65 }}>{empty(script) ? <Dim>Enter script in Slide Settings</Dim> : script}</p>
      </div>
    </div>
  );
}

function Hotspot({ topic }: { topic: CourseTopic }) {
  const spots = g<HotspotItem[]>(topic, 'hotspots') || [];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', background: 'color-mix(in srgb,var(--slide-primary) 10%,var(--slide-panel))', borderRadius: 'var(--slide-radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fs.sm, opacity: 0.6 }}>Base image</div>
      {spots.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(4px,0.6cqw,7px)' }}>
          {spots.map((s, i) => (
            <button key={s.id || i} onClick={() => setOpen(open === i ? null : i)}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 'clamp(4px,0.6cqw,6px) clamp(8px,1.1cqw,11px)', background: open === i ? 'var(--slide-primary)' : 'var(--slide-panel)', color: open === i ? '#fff' : 'var(--slide-text)', border: '1px solid var(--slide-primary)', borderRadius: 'var(--slide-radius)', cursor: 'pointer', fontSize: fs.sm, fontWeight: 500 }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', background: open === i ? '#fff' : 'var(--slide-primary)', color: open === i ? 'var(--slide-primary)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10 }}>{i + 1}</span>
              {s.title || `Hotspot ${i + 1}`}
            </button>
          ))}
        </div>
      )}
      {open !== null && spots[open] && (
        <div style={{ padding: 'clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid var(--slide-primary)', fontSize: fs.sm, lineHeight: 1.6 }}>
          {spots[open].content || <Dim>Add content in Slide Settings</Dim>}
        </div>
      )}
    </div>
  );
}

function ClickReveal({ topic }: { topic: CourseTopic }) {
  const cards = g<RevealCard[]>(topic, 'revealCards') || [];
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  if (!cards.length) return <p style={{ fontSize: fs.md }}><Dim>Add reveal cards in Slide Settings</Dim></p>;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px,1cqw,10px)' }}>
      {cards.map((card, i) => (
        <div key={card.id || i} onClick={() => setRevealed(r => ({ ...r, [i]: !r[i] }))}
          style={{ flex: '1 1 clamp(100px,28%,180px)', padding: 'clamp(8px,1.3cqw,14px)', background: revealed[i] ? 'var(--slide-primary)' : 'var(--slide-panel)', color: revealed[i] ? '#fff' : 'var(--slide-text)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: revealed[i] ? 'var(--slide-primary)' : 'color-mix(in srgb,var(--slide-text) 15%,transparent)', cursor: 'pointer', transition: 'all 0.18s', fontSize: fs.sm, lineHeight: 1.55, minHeight: 'clamp(44px,8cqw,80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const }}>
          {revealed[i] ? (card.back || <span style={{ opacity: 0.7, fontStyle: 'italic' }}>Add back text</span>) : (card.front || <span style={{ opacity: 0.6, fontStyle: 'italic' }}>{`Card ${i + 1}`}</span>)}
        </div>
      ))}
    </div>
  );
}

function SliderSlide({ topic }: { topic: CourseTopic }) {
  const beforeLabel = g<string>(topic, 'beforeLabel') || 'Before';
  const afterLabel  = g<string>(topic, 'afterLabel') || 'After';
  const [pos, setPos] = useState(50);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 'var(--slide-radius)', overflow: 'hidden', background: '#111', cursor: 'ew-resize' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          <div style={{ flex: pos, background: 'color-mix(in srgb,var(--slide-primary) 30%,#222)', display: 'flex', alignItems: 'flex-end', padding: 8 }}><span style={{ fontSize: fs.sm, color: '#fff', fontWeight: 600 }}>{beforeLabel}</span></div>
          <div style={{ position: 'absolute', left: `${pos}%`, top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)' }} />
          <div style={{ flex: 100 - pos, background: 'color-mix(in srgb,var(--slide-accent) 30%,#222)', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 8 }}><span style={{ fontSize: fs.sm, color: '#fff', fontWeight: 600 }}>{afterLabel}</span></div>
        </div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={e => setPos(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--slide-primary)' }} />
    </div>
  );
}

function DragDrop({ topic }: { topic: CourseTopic }) {
  const items = g<DragItem[]>(topic, 'dragItems') || [];
  const zones = g<DropZone[]>(topic, 'dropZones') || [];
  const instr = g<string>(topic, 'instructions');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      {instr && <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.8 }}>{instr}</p>}
      <div style={{ display: 'flex', gap: 'clamp(8px,1.2cqw,14px)' }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 clamp(4px,0.6cqw,6px)', fontSize: fs.sm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.6 }}>Items</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {items.length ? items.map((item, i) => (
              <div key={item.id || i} style={{ padding: 'clamp(5px,0.8cqw,8px) clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 6, border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)', fontSize: fs.sm, cursor: 'grab' }}>
                {item.label || <Dim>{`Item ${i + 1}`}</Dim>}
              </div>
            )) : <p style={{ fontSize: fs.sm }}><Dim>No items</Dim></p>}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: '0 0 clamp(4px,0.6cqw,6px)', fontSize: fs.sm, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.6 }}>Zones</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {zones.length ? zones.map((zone, i) => (
              <div key={zone.id || i} style={{ padding: 'clamp(5px,0.8cqw,8px) clamp(8px,1.2cqw,12px)', background: 'transparent', borderRadius: 6, border: '2px dashed', borderColor: 'color-mix(in srgb,var(--slide-primary) 40%,transparent)', fontSize: fs.sm, minHeight: 'clamp(28px,4cqw,40px)', display: 'flex', alignItems: 'center' }}>
                {zone.label || <Dim>{`Zone ${i + 1}`}</Dim>}
              </div>
            )) : <p style={{ fontSize: fs.sm }}><Dim>No zones</Dim></p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Matching({ topic }: { topic: CourseTopic }) {
  const pairs = g<MatchPair[]>(topic, 'matchPairs') || [];
  const instr = g<string>(topic, 'instructions');
  const [selected, setSelected] = useState<string | null>(null);

  const rights = [...pairs];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      {instr && <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.8 }}>{instr}</p>}
      {pairs.length ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(4px,0.6cqw,8px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {pairs.map((pair, i) => (
              <div key={pair.id || i} style={{ padding: 'clamp(6px,0.9cqw,9px) clamp(8px,1.2cqw,12px)', background: selected === `L${i}` ? 'var(--slide-primary)' : 'var(--slide-panel)', color: selected === `L${i}` ? '#fff' : 'var(--slide-text)', borderRadius: 6, border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)', fontSize: fs.sm, cursor: 'pointer', transition: 'all 0.12s' }}
                onClick={() => setSelected(selected === `L${i}` ? null : `L${i}`)}>
                {pair.left || <Dim>{`Left ${i + 1}`}</Dim>}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {rights.map((pair, i) => (
              <div key={(pair.id || i) + 'r'} style={{ padding: 'clamp(6px,0.9cqw,9px) clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 6, border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)', fontSize: fs.sm }}>
                {pair.right || <Dim>{`Right ${i + 1}`}</Dim>}
              </div>
            ))}
          </div>
        </div>
      ) : <p style={{ fontSize: fs.md }}><Dim>Add pairs in Slide Settings</Dim></p>}
    </div>
  );
}

function Sequencing({ topic }: { topic: CourseTopic }) {
  const steps = g<Step[]>(topic, 'steps') || [];
  const instr = g<string>(topic, 'instructions');
  if (!steps.length) return <p style={{ fontSize: fs.md }}><Dim>Add steps in Slide Settings</Dim></p>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      {instr && <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.8 }}>{instr}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.6cqw,7px)' }}>
        {steps.map((step, i) => (
          <div key={step.id || i} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px,1cqw,10px)', padding: 'clamp(6px,0.9cqw,9px) clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)' }}>
            <span style={{ width: 'clamp(18px,2.5cqw,26px)', height: 'clamp(18px,2.5cqw,26px)', borderRadius: '50%', background: 'var(--slide-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: fs.sm, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontSize: fs.md }}>{step.text || <Dim>{`Step ${i + 1}`}</Dim>}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlashCards({ topic }: { topic: CourseTopic }) {
  const cards = g<FlashCard[]>(topic, 'flashCards') || [];
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  if (!cards.length) return <p style={{ fontSize: fs.md }}><Dim>Add flash cards in Slide Settings</Dim></p>;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(6px,1cqw,10px)' }}>
      {cards.map((card, i) => (
        <div key={card.id || i} onClick={() => setFlipped(f => ({ ...f, [i]: !f[i] }))}
          style={{ flex: '1 1 clamp(100px,28%,180px)', minHeight: 'clamp(50px,8cqw,80px)', padding: 'clamp(8px,1.3cqw,14px)', background: flipped[i] ? 'var(--slide-primary)' : 'var(--slide-panel)', color: flipped[i] ? '#fff' : 'var(--slide-text)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)', cursor: 'pointer', transition: 'all 0.22s', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' as const, fontSize: fs.sm, lineHeight: 1.55 }}>
          {flipped[i] ? (card.back || <span style={{ opacity: 0.7, fontStyle: 'italic' }}>Back</span>) : (card.front || <Dim>{`Card ${i + 1} — click to flip`}</Dim>)}
        </div>
      ))}
    </div>
  );
}

function Branching({ topic }: { topic: CourseTopic }) {
  const scenario = g<string>(topic, 'scenarioText');
  const choices  = g<Choice[]>(topic, 'choices') || [];
  const [chosen, setChosen] = useState<number | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2cqw,12px)' }}>
      <div style={{ padding: 'clamp(8px,1.2cqw,12px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'color-mix(in srgb,var(--slide-text) 15%,transparent)' }}>
        <p style={{ margin: 0, fontSize: fs.md, lineHeight: 1.65 }}>{empty(scenario) ? <Dim>Add scenario text in Slide Settings</Dim> : scenario}</p>
      </div>
      {choices.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.6cqw,7px)' }}>
          {choices.map((c, i) => (
            <button key={c.id || i} onClick={() => setChosen(chosen === i ? null : i)}
              style={{ padding: 'clamp(7px,1.1cqw,11px) clamp(10px,1.5cqw,15px)', background: chosen === i ? 'var(--slide-primary)' : 'transparent', color: chosen === i ? '#fff' : 'var(--slide-text)', border: '1px solid', borderColor: chosen === i ? 'var(--slide-primary)' : 'color-mix(in srgb,var(--slide-text) 20%,transparent)', borderRadius: 'var(--slide-radius)', cursor: 'pointer', textAlign: 'left', fontSize: fs.md, transition: 'all 0.12s' }}>
              {c.text || <Dim>{`Choice ${i + 1}`}</Dim>}
            </button>
          ))}
          {chosen !== null && choices[chosen].outcome && (
            <div style={{ padding: 'clamp(6px,1cqw,10px)', background: 'color-mix(in srgb,var(--slide-primary) 10%,var(--slide-panel))', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: 'var(--slide-primary)', fontSize: fs.sm, lineHeight: 1.6 }}>
              Outcome: {choices[chosen].outcome}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Simulation({ topic }: { topic: CourseTopic }) {
  type SStep = { id: string; action: string; expected: string };
  const steps = g<SStep[]>(topic, 'simSteps') || [];
  const instr = g<string>(topic, 'instructions');
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1cqw,10px)' }}>
      {instr && <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.8 }}>{instr}</p>}
      {steps.length ? steps.map((step, i) => (
        <div key={step.id || i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(8px,1.2cqw,12px)', padding: 'clamp(7px,1.1cqw,11px) clamp(10px,1.5cqw,15px)', background: done[i] ? 'color-mix(in srgb,var(--slide-primary) 8%,var(--slide-panel))' : 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: done[i] ? 'var(--slide-primary)' : 'color-mix(in srgb,var(--slide-text) 15%,transparent)', cursor: 'pointer', transition: 'all 0.12s' }}
          onClick={() => setDone(d => ({ ...d, [i]: !d[i] }))}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${done[i] ? 'var(--slide-primary)' : 'color-mix(in srgb,var(--slide-text) 30%,transparent)'}`, background: done[i] ? 'var(--slide-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontSize: 10, fontWeight: 800, marginTop: 1 }}>{done[i] ? '✓' : ''}</span>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: fs.md, fontWeight: 500 }}>{step.action || <Dim>{`Action ${i + 1}`}</Dim>}</p>
            {step.expected && <p style={{ margin: 0, fontSize: fs.sm, opacity: 0.65 }}>Expected: {step.expected}</p>}
          </div>
        </div>
      )) : <p style={{ fontSize: fs.md }}><Dim>Add steps in Slide Settings</Dim></p>}
    </div>
  );
}

function Quiz({ topic }: { topic: CourseTopic }) {
  const question = g<string>(topic, 'question') || topic.content;
  const options  = g<QuizOption[]>(topic, 'quizOptions') || topic.questions?.[0]?.options?.map((o, i) => ({ id: String(i), text: o.text, correct: o.correct })) || [];
  const feedback = g<string>(topic, 'feedback');
  const [chosen, setChosen] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2cqw,12px)' }}>
      <p style={{ margin: 0, fontSize: fs.lg, fontWeight: 600, lineHeight: 1.55 }}>
        {empty(question) ? <Dim>Enter question in Slide Settings</Dim> : question}
      </p>
      {options.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px,0.6cqw,7px)' }}>
          {options.map((opt, i) => {
            const isChosen = chosen === i;
            const showResult = isChosen;
            return (
              <label key={opt.id || i}
                style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px,1cqw,10px)', padding: 'clamp(7px,1.1cqw,11px) clamp(10px,1.5cqw,15px)', background: showResult ? (opt.correct ? 'color-mix(in srgb,#059669 10%,var(--slide-panel))' : 'color-mix(in srgb,#DC2626 8%,var(--slide-panel))') : 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', border: '1px solid', borderColor: showResult ? (opt.correct ? '#059669' : '#DC2626') : 'color-mix(in srgb,var(--slide-text) 15%,transparent)', cursor: 'pointer', transition: 'all 0.12s' }}>
                <input type="radio" name={'q-' + topic.id} checked={isChosen} onChange={() => setChosen(i)} style={{ accentColor: 'var(--slide-primary)', flexShrink: 0 }} />
                <span style={{ fontSize: fs.md }}>{opt.text || <Dim>{`Option ${i + 1}`}</Dim>}</span>
              </label>
            );
          })}
        </div>
      )}
      {chosen !== null && feedback && (
        <p style={{ margin: 0, fontSize: fs.sm, padding: 'clamp(6px,1cqw,10px)', background: 'var(--slide-panel)', borderRadius: 'var(--slide-radius)', lineHeight: 1.6 }}>{feedback}</p>
      )}
    </div>
  );
}

// ── Main dispatcher ───────────────────────────────────────────────────────────

export default function CourseSlideContent({ topic }: { topic: CourseTopic }) {
  const st = topic.slideType || 'title-text';

  switch (st) {
    case 'title-text':          return <TitleText topic={topic} />;
    case 'title-bullets':
    case 'summary':             return <TitleBullets topic={topic} />;
    case 'horizontal-series':   return <Series topic={topic} dir="h" />;
    case 'vertical-series':     return <Series topic={topic} dir="v" />;
    case 'expandable-list':     return <ExpandableList topic={topic} />;
    case 'table':               return <Table topic={topic} />;
    case 'image-horizontal':
    case 'image-vertical':
    case 'media-collection':    return <ImageCards topic={topic} />;
    case 'video':               return <VideoSlide topic={topic} />;
    case 'audio':               return <AudioSlide topic={topic} />;
    case 'spokesperson':        return <Spokesperson topic={topic} />;
    case 'hotspot':             return <Hotspot topic={topic} />;
    case 'click-reveal':        return <ClickReveal topic={topic} />;
    case 'slider':              return <SliderSlide topic={topic} />;
    case 'drag-drop':           return <DragDrop topic={topic} />;
    case 'matching':            return <Matching topic={topic} />;
    case 'scenario':            return <Sequencing topic={topic} />;
    case 'flash-card':          return <FlashCards topic={topic} />;
    case 'branching-scenario':  return <Branching topic={topic} />;
    case 'simulation':          return <Simulation topic={topic} />;
    case 'knowledge-check':
    case 'quiz':                return <Quiz topic={topic} />;
    default:                    return <TitleText topic={topic} />;
  }
}
