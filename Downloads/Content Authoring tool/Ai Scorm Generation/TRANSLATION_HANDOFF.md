# Translation prototype handoff

Live prototype: https://content-authoring-prototype.vercel.app

## Review flow
Open My Courses and select a published course's Translate action. Draft courses display a disabled action. Translation is also available immediately after publishing from the AI course editor.

Select one target language at a time: Tamil, Hindi, Malayalam, Telugu or French. Switching languages retains prior edits and approvals. Start translation, edit each language copy, preview it, then review and approve. The selected language must be approved before generating its package. Each ZIP has its own language code and revision in its filename.

Editing or regenerating removes approval and invalidates that language's download. Regeneration asks before replacing edits. Re-publishing creates a new source version with its own translation workspace. Browser storage retains source courses and translations on the same browser and origin.

## Prototype boundaries
This is a design-review prototype with local demo translation, not an AI translation service. Known headings have example translations; arbitrary text is retained beside a localized demo label. There is no server-side reviewer identity or authorization.

The translation overlay changes only approved text fields. The exported source.json is unchanged; course.json preserves section/topic IDs, slide types, answer correctness, scores and captured settings. Seeded dashboard courses use sample content because the original export has course metadata only. The AI editor snapshot captures the section/topic data and available settings exposed by that prototype; it does not add missing authoring data or media storage.

ZIPs contain a SCORM 1.2 manifest, a navigable demo player, source data, localized data and approval metadata. The demo player supports navigation, basic answer feedback and LMS initialization/bookmarking. It does not implement the full original slide renderer, uploaded media, all interactions, narration, assessment scoring/completion rules or all player settings. Production must reuse the complete course renderer and SCORM exporter with text overlays and validate exports in the target LMS.

## Implementation
- src/app/translation/model.ts: text overlay, revisions, sample translations, preview and ZIP export.
- src/app/components/TranslationWorkspace.tsx: language selection, editing, approval and download.
- src/app/pages/TranslationsPage.tsx: published-course guard and saved source versions.
- src/app/components/PublishModal.tsx: post-publication integration.

## Verification
Run the app on port 5181, then run:
`npx playwright test tests/translation.spec.ts --reporter=line`

Tests use installed Chrome. Build: `npm run build`.
