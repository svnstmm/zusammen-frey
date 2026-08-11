export type ChapterStatus = 'available' | 'locked' | 'redeemed';

export type VoucherType =
  | 'pdf'
  | 'external-link'
  | 'paypal'
  | 'code'
  | 'image'
  | 'none';

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

export interface ChapterVoucher {
  type: VoucherType;
  /** Credits-style action label; falls back by type when omitted. */
  label?: string;
  url?: string;
  file?: string;
  code?: string;
  amount?: number;
  note?: string;
}

/**
 * Gift / venue payload.
 * Only render when the chapter is unlocked.
 * Structured for a later move to a protected source (API / gated JSON).
 */
export interface ChapterReveal {
  description?: string;
  venue?: string;
  category?: string;
  value?: number;
  voucher?: ChapterVoucher;
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
