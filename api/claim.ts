import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Minimal chapter index for claim gating.
 * Keep unlock dates in sync with src/data/chapters.ts.
 */
const CHAPTERS = [
  {
    slug: 'fade-in',
    number: '01',
    title: 'Fade In',
    unlockDate: '2026-09-01',
    category: 'Breakfast / Brunch',
    venue: 'Chez Bernard',
  },
  {
    slug: 'meet-cute',
    number: '02',
    title: 'Meet Cute',
    unlockDate: '2026-10-01',
    category: 'Specialty Coffee',
    venue: 'Balthasar Kaffee Bar',
  },
  {
    slug: 'montage',
    number: '03',
    title: 'Montage',
    unlockDate: '2026-11-01',
    category: 'Travel',
    venue: 'ÖBB / DB',
  },
  {
    slug: 'mise-en-scene',
    number: '04',
    title: 'Mise-en-scène',
    unlockDate: '2026-12-01',
    category: 'Museum',
    venue: 'Albertina Modern',
  },
  {
    slug: 'close-up',
    number: '05',
    title: 'Close-Up',
    unlockDate: '2027-01-01',
    category: 'Patisserie',
    venue: 'Crème de la Crème',
  },
  {
    slug: 'intermission',
    number: '06',
    title: 'Intermission',
    unlockDate: '2027-02-01',
    category: 'Ice Cream',
    venue: 'Your choice',
  },
  {
    slug: 'double-feature',
    number: '07',
    title: 'Double Feature',
    unlockDate: '2027-03-01',
    category: 'Cinema',
    venue: 'Filmcasino',
  },
  {
    slug: 'costume-change',
    number: '08',
    title: 'Costume Change',
    unlockDate: '2027-04-01',
    category: 'Fashion',
    venue: 'Luv the Shop',
  },
  {
    slug: 'golden-hour',
    number: '09',
    title: 'Golden Hour',
    unlockDate: '2027-05-01',
    category: 'Bar',
    venue: 'TBD',
  },
  {
    slug: 'dinner-scene',
    number: '10',
    title: 'Dinner Scene',
    unlockDate: '2027-06-01',
    category: 'Restaurant',
    venue: 'TBD',
  },
  {
    slug: 'fade-out',
    number: '11',
    title: 'Fade Out',
    unlockDate: '2027-07-01',
    category: 'Spa / Relax',
    venue: 'Therme Wien',
  },
  {
    slug: 'to-be-continued',
    number: '12',
    title: 'To Be Continued...',
    unlockDate: '2027-08-01',
    category: 'Child / Family',
    venue: 'Herr und Frau Klein',
  },
] as const;

function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function isUnlocked(unlockDate: string, now = new Date()): boolean {
  const unlockDay = parseLocalDate(unlockDate);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today >= unlockDay;
}

function header(req: VercelRequest, name: string): string | undefined {
  const value = req.headers[name];
  if (Array.isArray(value)) return value[0];
  return typeof value === 'string' ? value : undefined;
}

function clientIp(req: VercelRequest): string {
  const forwarded = header(req, 'x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return header(req, 'x-real-ip') ?? 'unknown';
}

function decodeHeader(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function readBody(req: VercelRequest): { slug?: string; note?: string } {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as { slug?: string; note?: string };
    } catch {
      return {};
    }
  }
  return req.body as { slug?: string; note?: string };
}

async function notifyEmail(subject: string, text: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CLAIM_NOTIFY_TO;
  if (!apiKey || !to) return false;

  const from =
    process.env.CLAIM_NOTIFY_FROM ?? 'Zusammen Frey <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend error', response.status, detail);
    throw new Error(`Email notification failed (${response.status})`);
  }

  return true;
}

async function notifyWebhook(text: string): Promise<boolean> {
  const url = process.env.CLAIM_WEBHOOK_URL;
  if (!url) return false;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: text.slice(0, 1900),
      text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Webhook error', response.status, detail);
    throw new Error(`Webhook notification failed (${response.status})`);
  }

  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = readBody(req);
    const slug = body.slug?.trim();
    if (!slug) {
      return res.status(400).json({ error: 'Missing chapter slug' });
    }

    const chapter = CHAPTERS.find((item) => item.slug === slug);
    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    if (!isUnlocked(chapter.unlockDate)) {
      return res.status(403).json({ error: 'Chapter is still locked' });
    }

    const hasEmail = Boolean(
      process.env.RESEND_API_KEY && process.env.CLAIM_NOTIFY_TO,
    );
    const hasWebhook = Boolean(process.env.CLAIM_WEBHOOK_URL);
    if (!hasEmail && !hasWebhook) {
      return res.status(503).json({
        error: 'Claim notifications are not configured',
      });
    }

    const ip = clientIp(req);
    const city = decodeHeader(header(req, 'x-vercel-ip-city'));
    const region = decodeHeader(header(req, 'x-vercel-ip-country-region'));
    const country = header(req, 'x-vercel-ip-country');
    const latitude = header(req, 'x-vercel-ip-latitude');
    const longitude = header(req, 'x-vercel-ip-longitude');
    const userAgent = header(req, 'user-agent') ?? 'unknown';
    const note = body.note?.trim().slice(0, 280);

    const location =
      [city, region, country].filter(Boolean).join(', ') || 'Unknown';
    const coords =
      latitude && longitude ? `${latitude}, ${longitude}` : 'Unavailable';
    const when = new Date().toISOString();

    const subject = `Voucher request — ${chapter.number} ${chapter.title}`;
    const text = [
      'A voucher was requested on Zusammen Frey.',
      '',
      `Chapter: ${chapter.number} — ${chapter.title}`,
      `Slug: ${chapter.slug}`,
      `Category: ${chapter.category}`,
      `Venue: ${chapter.venue}`,
      '',
      `When: ${when}`,
      `IP: ${ip}`,
      `Location: ${location}`,
      `Coordinates: ${coords}`,
      `User-Agent: ${userAgent}`,
      note ? `Note: ${note}` : null,
      '',
      'Send the voucher manually by email when ready.',
    ]
      .filter((line) => line !== null)
      .join('\n');

    const results = await Promise.all([
      hasEmail ? notifyEmail(subject, text) : Promise.resolve(false),
      hasWebhook
        ? notifyWebhook(`**${subject}**\n\`\`\`\n${text}\n\`\`\``)
        : Promise.resolve(false),
    ]);

    if (!results.some(Boolean)) {
      return res.status(503).json({
        error: 'No notification channel succeeded',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('claim handler error', error);
    return res.status(502).json({
      error:
        error instanceof Error ? error.message : 'Failed to send notification',
    });
  }
}
