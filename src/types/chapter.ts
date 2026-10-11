export type ChapterStatus = 'available' | 'locked' | 'redeemed';

export type ReleaseDisplay = 'month' | 'date';

export interface ChapterAccess {
  locked: boolean;
  /** ISO date `YYYY-MM-DD` — compared in the visitor's local timezone. */
  unlockDate?: string;
  lockedMessage?: string;
  /** Manual early release without changing unlockDate. */
  forceUnlocked?: boolean;
  /** How to format unlockDate in UI. Defaults to `month`. */
  releaseDisplay?: ReleaseDisplay;
}

/**
 * Public gift framing shown after unlock.
 * Redeemable voucher details are never shipped to the client —
 * they are fulfilled manually after a claim request.
 */
export interface ChapterReveal {
  description?: string;
  venue?: string;
  category?: string;
  /** Soft public hint only (e.g. ice-cream budget). Not a redeemable. */
  value?: number;
  /** When false, hide the claim CTA. Defaults to true. */
  claimable?: boolean;
}

export interface Chapter {
  id: number;
  slug: string;
  number: string;
  title: string;
  /** Public overview teaser — keep gift mystery here. */
  subtitle: string;
  access: ChapterAccess;
  image?: string | null;
  status?: ChapterStatus;
  reveal?: ChapterReveal;
}

export type ChapterPreview = Pick<
  Chapter,
  'id' | 'slug' | 'number' | 'title' | 'subtitle' | 'access'
>;
