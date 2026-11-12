/** WCAG contrast helpers for slide colours. */


const hexRe = /^#([0-9a-f]{6})$/i;
function rgb(hex: string): [number, number, number] | null {
  const m = hexRe.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lum([r, g, b]: [number, number, number]) {
  const c = (v: number) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
}
export function contrast(a: string, b: string) {
  const x = rgb(a), y = rgb(b);
  if (!x || !y) return 21;
  const [l1, l2] = [lum(x), lum(y)].sort((p, q) => q - p);
  return (l1 + 0.05) / (l2 + 0.05);
}
function mix(a: string, b: string, t: number) {
  const x = rgb(a)!, y = rgb(b)!;
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

/**
 * Returns a colour for brand-coloured text (numbers, ticks, arrows) that reads on `bg`:
 * the primary colour if it already has 4.5:1, else the accent, else primary tinted toward `fg`.
 */
export function readableAccent(primary: string, accent: string, bg: string, fg: string) {
  if (!rgb(bg)) return primary;
  if (rgb(primary) && contrast(primary, bg) >= 4.5) return primary;
  if (rgb(accent) && contrast(accent, bg) >= 4.5) return accent;
  if (rgb(primary) && rgb(fg)) {
    for (let t = 0.2; t < 1; t += 0.1) { const c = mix(primary, fg, t); if (contrast(c, bg) >= 4.5) return c; }
  }
  return fg;
}
