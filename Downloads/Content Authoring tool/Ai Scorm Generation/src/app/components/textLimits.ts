/**
 * Maximum characters for short slide text so it always fits its card design
 * (enforced in Slide Settings and when typing on the slide).
 */
export const TEXT_LIMITS = {
  seriesLabel: 40,
  seriesDescription: 140,
  cardHeading: 40,
  cardDescription: 110,
  /** Slide (topic) title. */
  title: 60,
  /** Body of a Title + Text slide. */
  body: 500,
  /** Body beside the picture on an Image + Text slide. */
  imageBody: 250,
  tableHeading: 25,
  tableCell: 40,
} as const;

/** Maximum number of items per slide so content always fits. */
export const ITEM_LIMITS = {
  seriesItems: 4,
  imageCards: 4,
  tableColumns: 5,
  tableRows: 5,
} as const;
