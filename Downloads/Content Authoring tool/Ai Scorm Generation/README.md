
  # Ai Scorm Generation

  This is a code bundle for Ai Scorm Generation. The original project is available at https://www.figma.com/design/X7IO02g2eXmoC3dNnmgcJ2/Ai-Scorm-Generation.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Design review

Invoke `/design-review` in this project's agent chat, or run the capture pipeline:

```bash
npm run design-review
```

The no-argument default reviews only the router's home destination (Dashboard).
The agent workflow is defined in `commands/design-review.md`; it includes visual
inspection and adjudication after automated measurement. Application source is
never changed. `/design-fix` is not implemented.

Install the browser before the first review with `npx playwright install chromium`.
An already-installed Chrome is supported if bundled Chromium is unavailable.
Only an explicit request to review all pages permits `--pages=all`; a named page
uses `--page=<router-path-or-component-name>`.

Outputs: `design-review/issues.json`, `design-review/review-report.html`, individual
screenshots, measured gaps and run provenance. Open the report URL printed by the
command. The server is kept running for report viewing and reused only after an
exact-checkout challenge check. `node scripts/design-review/verify.mjs` verifies
the initial Dashboard evidence and report interactions.

The current design baseline is provisional because this checkout has no gallery
route. See `DESIGN_SYSTEM.md` and `design-review/review-notes.md`.
  
