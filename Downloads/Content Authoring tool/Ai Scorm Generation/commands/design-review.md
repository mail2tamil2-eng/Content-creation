# /design-review

Review and report only. Never edit application source, CSS, theme, or router.
Allowed writes: review tooling, documentation and `design-review/` evidence.

1. Read `DESIGN_SYSTEM.md` and the shared components it names. Run
   `npm install` if dependencies are absent, then `npx playwright install chromium`
   before the review if the browser is missing. Never install browsers mid-capture.
2. Run `npm run design-review` with no arguments for the router's home destination
   (Dashboard here). A named page maps to `--page=<route-or-name>`. Only an explicit
   review-all request authorizes `--pages=all`. Never expand scope for a demo.
3. The runner verifies exact checkout identity via a nonce/HMAC identity endpoint,
   or starts its own Vite process using the existing Vite config. A responding
   port, package name, or `/@fs/` result alone is not identity proof. Unknown
   servers are left alone. Occupied ports are replaced with OS-bound free ports.
4. Discover routes by importing the actual router in the rendered browser. Exclude
   gallery routes from audit targets. If a gallery is present, visit it only as a
   baseline. Resolve dynamic routes from real links; report unresolved paths as
   skipped, never guess an entity ID. Capture at 1440x1000 only.
5. Inspect the fresh page screenshot and `measurements.json` like a designer.
   Compare repeated cards, badges, controls and row edges by meaning and shape,
   not only equal markup. Evaluate colors, radius, shadow, overflow, clipping,
   contrast, semantic colors, component overrides and exact adjacent gaps.
6. Automatic findings are candidates. Inspect evidence and adjudicate in
   `design-review/adjudications.json` (key => {status,reason}); use `dismissed`
   for false positives. Add visually confirmed findings in
   `design-review/manual-findings.json` as {page,selector,category,severity,
   description,expected,actual,file,line,key}. Selectors must match live targets.
   Re-run the SAME scope to capture these from a fresh page. Never fabricate
   occurrences, pixels, locations or a nonzero issue count.
7. Spacing classifications: on-rhythm, drifting, broken, too-tight, deliberate.
   All measured pairs are saved; problematic pairs include arithmetic and named
   rhythm proposals. Each finding screenshot has exactly one live annotation,
   cropped around its measured bounds. Source findings resolve via exact classes,
   text or component source ownership; unlocatable targets explain their fallback.
8. `issues.json` is the report source of truth. Repeated causes share one issue
   object with occurrence records and distinct screenshots. HTML groups by page,
   sorts by severity, and has uncropped height-sized thumbnail strips. Verify
   its modal opens and closes by close button, backdrop and Escape.
9. Open `review-report.html`, show real crops and a grouped card, report annotated
   occurrence/issue fractions, and disclose missing baselines and skipped checks.
   Do not claim completed gallery comparison if the gallery does not exist.
