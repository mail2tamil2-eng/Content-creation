/**
 * Scrolls the Slide Settings panel to the field for `key`, flashes it and (optionally) focuses it.
 * Opens a collapsed Slide Content (or Quiz Settings) group first. Used by click-to-edit on the slide.
 */
export function focusSlideField(key: string, focus = true, attempt = 0): void {
  const panel = document.querySelector<HTMLElement>('[data-slide-settings]');
  const retry = () => { if (attempt < 6) requestAnimationFrame(() => focusSlideField(key, focus, attempt + 1)); };
  if (!panel) return retry();

  const el = key === 'slide-content'
    ? panel.querySelector<HTMLElement>('[data-group-body="Slide Content"], [data-group-body="Quiz Settings"]')
    : panel.querySelector<HTMLElement>(`[data-field="${CSS.escape(key)}"]`);

  if (!el) {
    // Field may sit in a collapsed group: open the content group and try again
    panel.querySelectorAll<HTMLButtonElement>('[data-group-toggle][aria-expanded="false"]').forEach(b => {
      const g = b.dataset.groupToggle;
      if (g === 'Slide Content' || g === 'Quiz Settings') b.click();
    });
    return retry();
  }

  // Field inside a closed card (e.g. Image Gallery): open that card first
  const closed = el.closest<HTMLElement>('[data-collapsible][data-open="false"]');
  if (closed) { closed.querySelector<HTMLButtonElement>('[data-collapsible-toggle]')?.click(); return retry(); }

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
  el.classList.remove('se-flash');
  void el.offsetWidth; // restart the animation
  el.classList.add('se-flash');
  window.setTimeout(() => el.classList.remove('se-flash'), 1900);

  if (focus && key !== 'slide-content') {
    el.focus({ preventScroll: true });
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      const end = el.value.length;
      el.setSelectionRange(end, end);
    }
  }
}
