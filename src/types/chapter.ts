export type ChapterStatus = 'locked' | 'unlocked' | 'revealed';

export interface ChapterVoucher {
  label: string;
  code?: string;
  qrImageSrc?: string;
  pdfSrc?: string;
}

export interface ChapterMedia {
  imageSrc?: string;
  imageAlt?: string;
  gallery?: string[];
}

export interface Chapter {
  id: number;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  venue?: string;
  unlockDate?: string;
  status: ChapterStatus;
  voucher?: ChapterVoucher;
  media?: ChapterMedia;
  personalMessage?: string;
}

export type ChapterPreview = Pick<
  Chapter,
  'id' | 'slug' | 'number' | 'title' | 'tagline' | 'status'
>;
