import coralCover from '../../assets/templates/coral-cover.webp';
import coralFeature from '../../assets/templates/coral-feature.webp';
import corporateCover from '../../assets/templates/corporate-cover.webp';
import corporateFeature from '../../assets/templates/corporate-feature.webp';
import executiveFeature from '../../assets/templates/executive-feature.webp';
import forestCover from '../../assets/templates/forest-cover.webp';
import forestFeature from '../../assets/templates/forest-feature.webp';
import mintCover from '../../assets/templates/mint-cover.webp';
import mintFeature from '../../assets/templates/mint-feature.webp';
import monoFeature from '../../assets/templates/mono-feature.webp';
import oceanCover from '../../assets/templates/ocean-cover.webp';
import oceanFeature from '../../assets/templates/ocean-feature.webp';
import plumCover from '../../assets/templates/plum-cover.webp';
import plumFeature from '../../assets/templates/plum-feature.webp';
import sandCover from '../../assets/templates/sand-cover.webp';
import sandFeature from '../../assets/templates/sand-feature.webp';
import techCover from '../../assets/templates/tech-cover.webp';
import techFeature from '../../assets/templates/tech-feature.webp';

export type AssetCategory = 'People' | 'Workplace' | 'Technology' | 'Nature';
export interface Asset { id: string; src: string; name: string; category: AssetCategory }

/**
 * Asset Library: bundled, licence-free photos (Unsplash, see docs/templates/PHOTO_CREDITS.md)
 * authors can place on image slides. Replace with the organisation's media library API later.
 */
export const ASSET_LIBRARY: Asset[] = [
  { id: 'team-high-five', src: coralCover, name: 'Team high five', category: 'People' },
  { id: 'smiling-professional', src: coralFeature, name: 'Smiling professional', category: 'People' },
  { id: 'business-suit', src: executiveFeature, name: 'Business suit portrait', category: 'People' },
  { id: 'colleagues-laptop', src: mintCover, name: 'Colleagues at a laptop', category: 'People' },
  { id: 'group-at-screen', src: oceanFeature, name: 'Group around a laptop', category: 'People' },
  { id: 'doctor-phone', src: oceanCover, name: 'Doctor using a phone', category: 'People' },
  { id: 'smiling-woman', src: plumFeature, name: 'Smiling woman', category: 'People' },
  { id: 'meeting-room', src: corporateCover, name: 'Meeting room', category: 'Workplace' },
  { id: 'sticky-notes', src: corporateFeature, name: 'Sticky-note workshop', category: 'Workplace' },
  { id: 'casual-meeting', src: plumCover, name: 'Casual team meeting', category: 'Workplace' },
  { id: 'lounge', src: mintFeature, name: 'Office lounge', category: 'Workplace' },
  { id: 'open-office', src: sandFeature, name: 'Open-plan office', category: 'Workplace' },
  { id: 'typing-laptop', src: sandCover, name: 'Typing on a laptop', category: 'Technology' },
  { id: 'dashboard', src: techFeature, name: 'Data dashboard', category: 'Technology' },
  { id: 'circuit-board', src: techCover, name: 'Circuit board', category: 'Technology' },
  { id: 'skyscrapers', src: monoFeature, name: 'Skyscrapers', category: 'Workplace' },
  { id: 'forest', src: forestCover, name: 'Forest path', category: 'Nature' },
  { id: 'mountains', src: forestFeature, name: 'Mountain sunrise', category: 'Nature' },
];

export const ASSET_CATEGORIES: AssetCategory[] = ['People', 'Workplace', 'Technology', 'Nature'];
