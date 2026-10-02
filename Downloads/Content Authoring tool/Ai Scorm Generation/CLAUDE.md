# Project: AI SCORM Generation (Content Authoring Tool)

AI-assisted course authoring module of the Axle KORP B2B LMS. Course creators
generate a course outline with AI, edit slides, preview the SCORM player,
publish (consumes a licence), translate, and download a SCORM 1.2 ZIP.
Each client company is a **tenant**; courses are filtered by `tenantId`.

This is a front-end prototype exported from Figma Make. There is no backend:
state is mock data + `localStorage`, and AI/translation are local demos.

## Tech stack
- React 18 + TypeScript, Vite 6 (`@vitejs/plugin-react`)
- Tailwind CSS 4 (`@tailwindcss/vite`, `tw-animate-css`) — utility classes plus inline styles
- Radix UI primitives wrapped as shadcn/ui in `src/app/components/ui/`
- `lucide-react` icons, `motion` (Framer Motion) animations, `sonner` toasts
- React Router 7 (`createBrowserRouter`), React Context for state
- `jszip` for SCORM package export
- Storybook 10 (`@storybook/react-vite`) with `@storybook/addon-a11y` and `@storybook/addon-docs`
- Playwright for end-to-end tests
- Font: **Nunito Sans** (UI), slide templates may use Inter/Roboto/Montserrat etc.
- Backend and auth: not built yet (`AuthContext` is a mock)

## Commands
```bash
npm i                    # install
npm run dev              # app on http://localhost:5173
npm run build            # production build (vite)
npm run storybook        # Storybook on http://localhost:6006
npm run build-storybook  # static Storybook → storybook-static/
npm run design-review    # see commands/design-review.md and AGENTS.md

# e2e: start the app on port 5181 first, then
npx vite --port 5181 --host 127.0.0.1
npx playwright test tests/translation.spec.ts --reporter=line
```
There is no `tsconfig.json`, linter or unit-test runner. To type-check new files:
`npx tsc --noEmit --jsx react-jsx --module esnext --moduleResolution bundler --target es2022 --skipLibCheck --strict --esModuleInterop --allowImportingTsExtensions --types vite/client <files>`

## Project structure
```
src/
  main.tsx                     # mounts <App/>, imports styles/index.css
  app/
    App.tsx                    # CourseProvider + RouterProvider + Toaster
    routes.tsx                 # /dashboard, /courses, /ai-create-course, /courses/:courseId/translations
    courseContent.ts           # CourseTopic types, generateSlideContent()
    context/
      CourseContext.tsx        # courses, licences, publish/republish/download (localStorage 'authoring-courses-v1')
      AuthContext.tsx          # mock users: site_admin, course_creator (not wired into routes yet)
    translation/model.ts       # text overlay, revisions, demo translation, SCORM ZIP build
    pages/                     # route screens; AICreateCoursePage.tsx is the main wizard + editor
    components/
      saas/                    # ★ reusable product components (use these for new UI)
      ui/                      # shadcn/Radix primitives (theme.css tokens, mostly neutral black)
      *.tsx                    # app-specific: Layout, Sidebar, Header, CourseTable, editor panels…
  stories/                     # Foundations stories (tokens, icon library) + fixtures
  styles/                      # index.css → fonts, globals, tailwind, theme.css (shadcn tokens)
  imports/                     # Figma-exported assets/frames (don't edit by hand)
.storybook/                    # main.ts, preview.tsx (theme toggle, a11y), decorators.tsx
tests/                         # Playwright specs (expect app on :5181, installed Chrome)
```
- Import alias: `@` → `src`. Figma assets resolve via `figma:asset/<file>` → `src/assets/`.
- Don't remove the React or Tailwind plugins from `vite.config.ts` (required by Figma Make).
- `pages/CreateCoursePage.tsx.backup` and `src/imports/**` are generated; leave them.

## User roles
- **Site Admin** (`site_admin`) — manages all tenants, licences, e-commerce, coupons
- **Course Creator** (`course_creator`) — belongs to one tenant; creates, publishes and translates courses

## Domain rules
- First publish of a course consumes one licence; republishing an edited course is free.
- `canPublish()` is false when no licences remain — disable the action and say why.
- Download is only available for published courses (`canDownload`).
- Editing a published course sets `isEdited`; it must be republished to update the package.
- Translations: one language at a time (Tamil, Hindi, Malayalam, Telugu, French); a language
  must be approved before its ZIP can be generated; editing removes approval.
- See `TRANSLATION_HANDOFF.md` for prototype limits of translation/export.

---

## Accessibility standard: WCAG 2.2 Level AA (mandatory)
- Normal text (under 18.66px bold / 24px regular): contrast at least 4.5:1
- Large text (18.66px+ bold or 24px+ regular): contrast at least 3:1
- UI parts and meaningful graphics (input borders, focus rings, icons, progress bars,
  checkbox outlines): at least 3:1 against the adjacent background (WCAG 1.4.11)
- Never use colour alone to show meaning; pair it with text or an icon
- Every interactive element must have a visible focus indicator (`focus-visible:ring-2`)
- Touch/click targets at least 24x24px (aim for 40x40px)
- Icon-only buttons need `aria-label` (`<IconButton label="…">` enforces it)
- Form fields always have a visible label; errors are announced (`role="alert"`)
- Every component must work with keyboard only (Tab, Enter, Space, Esc, arrows)
- Respect `prefers-reduced-motion` (`motion-reduce:` variants / disable `motion` animations)
- The Storybook a11y panel must show zero violations before a component is approved.
  `preview.tsx` sets `a11y.test: 'todo'` (warn) until the known gaps below are fixed;
  switch to `'error'` afterwards.

### Known contrast gaps in the current UI (need a design decision)
| Where | Pair | Ratio | Fix |
|-------|------|-------|-----|
| `Button variant="accent"` / "Resume Editing" | white on orange-500 `#F97316` | 2.8:1 ✗ | text neutral-900 on `#F48120`, or white on accent-700 `#A93715` |
| Input / select borders | `#D1D5DB` on white | 1.5:1 ✗ (1.4.11) | neutral-500 `#64748B` (4.8:1) |
| Placeholder text | `#9CA3AF` on white | 2.5:1 ✗ | `#6B7280` (4.8:1) |
| Primary on soft blue (`soft` button, step pill) | `#1565F0` on `#EBF3FF` | 4.5:1 borderline | keep text ≥ 13px semibold or darken to `#1254C7` |

---

## Design system

### Current product palette (what the live UI and `saas/` components use)
Defined in `src/app/components/saas/tokens.ts` (`SAAS`). Use these; don't invent new hex values.

| Role | Value | Notes |
|------|-------|-------|
| Primary / AI action | `#1565F0` (hover `#1A63E8`) | white text 5.1:1 ✓ |
| Primary soft bg / border | `#EBF3FF` / `#93C5FD` | selected cards, step pill, soft buttons |
| Accent (nav, highlights) | orange-500 `#F97316`, active nav bg `#FFF3E5`, active label `#C2410C` | |
| Brand navy / orange (logo) | `#134780` / `#F48120` | slide "Corporate" design |
| Text strong / body / muted | `#111827` / `#374151` / `#6B7280` | muted 4.8:1 on white ✓ |
| Borders | cards `#E5E7EB`, fields `#D1D5DB` | see gaps above |
| Surfaces | card `#FFFFFF`, page `#F9FAFB`, chip `#F3F4F6` | |
| Danger | `#DC2626` (text `#B91C1C`) | |
| Disabled fill | `#C4C4C4` | disabled controls are exempt from contrast |
| Status badges | Published green-100/800, Draft amber-100/800 | always with text |

### Brand tokens (target scale — use for new token work)
Brand colours from the logo: Navy `#154880` (primary), Orange `#F48120`, Red-orange `#F05A28`.
Brand gradient `linear-gradient(135deg, #F48120 0%, #F05A28 100%)` is decorative only —
never white text on it; if text is placed on it use neutral-900.
Full scales, semantic colours and the contrast-checked **approved / forbidden pairs**
live in `src/stories/tokens.ts` and render in Storybook → *Foundations / Design tokens*.
Keep that file and this section in sync.

| Scale | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|-------|----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| Primary | #EEF4FB | #D6E4F4 | #ADC8E8 | #7EA6D6 | #4B7FBF | #2A62A3 | #1B5491 | **#154880** | #10375F | #0B2642 |
| Accent | #FEF3E9 | #FDE3CB | #FBC795 | #F8A65C | **#F48120** | **#F05A28** | #D4461A | #A93715 | #7F2A12 | #551D0D |
| Neutral | #F8FAFC | #F1F4F8 | #E2E8F0 | #CBD5E1 | #94A3B8 | #64748B | #475569 | #334155 | #1E293B | #0F172A |

Semantic (700 for text/buttons, tint for backgrounds): Success `#15803D`/`#F0FDF4`,
Warning `#B45309`/`#FFFBEB`, Error `#B91C1C`/`#FEF2F2`, Info `#154880`/`#EEF4FB`.

**Forbidden in light mode:** accent-400 `#F48120` as text or progress fill on white; white text
on accent-400/500; `#16A34A` or `#D97706` as text on white (use the 700 shades); neutral-400
`#94A3B8` for readable text (disabled only); neutral-200 for input borders.

### Typography
Font **Nunito Sans**, fallback `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
Product UI is dense: body/controls 13px, labels 13px/600, card titles 14px/700, page title
20px/700, dashboard hero 36px/700. Weights 400/500/600/700/800. Minimum text size 12px
(11px only for uppercase micro-labels and counts).

### Spacing, radius, shadow
- 4px base, 8px rhythm: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80
- Card padding 20–24px; gap between form fields 14–16px; between page sections 24–32px
- Radius: chips/pills full; buttons 7–9px; inputs 8px; selection cards 10px; cards 12px;
  dashboard cards/tables 16px (`rounded-2xl`); hero 24px
- Shadows: cards `shadow-sm`; popovers/menus `0 12px 32px rgba(15,23,42,0.12)`; modals `shadow-2xl`

### Logo
`src/imports/AXLE-Korp-LOGO__2_.jpg`. Always `alt="Axle KORP"`. Don't recolour or stretch.

---

## Component rules (React)
- **New UI uses `src/app/components/saas/`** (import from `'../components/saas'`). Existing
  pages still use inline styles; migrate them to `saas/` components when you touch them.
- Available `saas/` components: Button, IconButton, StatusBadge, Chip, FormField +
  TextInput/TextArea/SelectInput, Checkbox, Toggle, SelectionCard, SectionCard, PageHeader,
  ActionBar, Avatar, SearchBar, Tabs, Accordion, DropdownMenu, Tooltip, Modal + ConfirmDialog,
  AppToaster + `notify`, DataTable, Pagination, AppHeader, AppSidebar, Widgets
  (StatWidget, ProgressWidget, ProgressBar, ActivityList, EmptyState).
- One component per file, named export, `PascalCase.tsx`, with a sibling `PascalCase.stories.tsx`.
- Props: explicit TypeScript interface (exported), string-union `variant` / `size` / `tone`,
  `className` passthrough merged with `cn()` from `ui/utils`. `forwardRef` for form controls/buttons.
- Use native elements first (`<button>`, `<input>`, `<label>`, `<table>`); use Radix
  (`@radix-ui/react-*`) for dialogs, menus, tabs, accordions, tooltips — they handle focus
  trapping, Esc and arrow keys. Add ARIA only where native HTML can't express it.
- Style with Tailwind classes (arbitrary values like `bg-[#1565F0]` are fine for palette colours);
  avoid new inline `style={{}}` and `onMouseEnter` hover hacks — use `hover:` / `focus-visible:`.
- Toasts: `notify.success/error/warning/info/loading/promise` from `saas/Toast`.
- Components must not read router or context directly unless they are app-specific
  (keep `saas/` pure and prop-driven so they work in Storybook without providers).

## Storybook rules
- Stories live next to components: `Foo.tsx` + `Foo.stories.tsx` (CSF3, `satisfies Meta<…>`, `tags: ['autodocs']`).
- Sidebar groups: `Foundations/*`, `SaaS/*` (reusable), `SaaS/Screens/*` (composed reference
  screens), `App (current)/*`, `Dashboard|Courses|Editor|Slides|Translation/*` (existing app
  components), `Primitives (shadcn)/*`.
- Each component's stories must show **all variants, sizes and states**: default, hover (interactive),
  focus (`play` with `userEvent.tab()`), disabled, loading, error, empty where relevant —
  plus an `AllVariants`/matrix story. Check dark mode with the toolbar Theme toggle.
- Use `fn()` from `storybook/test` for callbacks; keep stateful demos in `render` with `useState`.
- App components needing router/context: use `withRouter(path)` / `withCourses` from
  `.storybook/decorators.tsx`. Shared demo data: `src/stories/fixtures.ts`.
- Fixed-position app chrome (Header/Sidebar) needs a `transform: translateZ(0)` wrapper to render in the canvas.
- Before finishing: `npm run build-storybook` must succeed and the a11y panel must be clean
  for new components.

## Coding rules
- Keep components small and reusable; put helpers in their own files.
- Strict TypeScript types for all props and callbacks; no `any`.
- Ask before installing new packages.
- Don't change `CourseContext` / `translation/model.ts` data shapes without updating the
  Playwright tests in `tests/`.
- After UI changes run the relevant Playwright spec and `npm run build-storybook`.
- `/design-review` workflow: follow `AGENTS.md` and `commands/design-review.md`.
