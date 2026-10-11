import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getChapterBySlug } from '../src/data/chapters';
import { isChapterUnlocked } from '../src/lib/chapterAccess';

interface ClaimBody {
  slug?: string;
  note?: string;
}

function header(req: VercelRequest, name: string): string | undefined {
  const value = req.headers[name];
  if (Array.isArray(value)) return value[0];
  return value;
}

function clientIp(req: VercelRequest): string {
  const forwarded = header(req, 'x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  const realIp = header(req, 'x-real-ip');
  if (realIp) return realIp;
  return req.socket?.remoteAddress ?? 'unknown';
}

function decodeHeader(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

async function notifyEmail(payload: {
  subject: string;
  text: string;
}): Promise<boolean> {
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
      subject: payload.subject,
      text: payload.text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend error', response.status, detail);
    throw new Error('Email notification failed');
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
    throw new Error('Webhook notification failed');
  }

  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as
    | ClaimBody
    | undefined;

  const slug = body?.slug?.trim();
  if (!slug) {
    return res.status(400).json({ error: 'Missing chapter slug' });
  }

  const chapter = getChapterBySlug(slug);
  if (!chapter) {
    return res.status(404).json({ error: 'Chapter not found' });
  }

  if (!isChapterUnlocked(chapter)) {
    return res.status(403).json({ error: 'Chapter is still locked' });
  }

  if (chapter.reveal?.claimable === false) {
    return res.status(403).json({ error: 'This chapter is not claimable' });
  }

  const hasEmail = Boolean(process.env.RESEND_API_KEY && process.env.CLAIM_NOTIFY_TO);
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
  const note = body?.note?.trim().slice(0, 280);

  const location = [city, region, country].filter(Boolean).join(', ') || 'Unknown';
  const coords =
    latitude && longitude ? `${latitude}, ${longitude}` : 'Unavailable';
  const when = new Date().toISOString();

  const subject = `Voucher request — ${chapter.number} ${chapter.title}`;
  const text = [
    'A voucher was requested on Zusammen Frey.',
    '',
    `Chapter: ${chapter.number} — ${chapter.title}`,
    `Slug: ${chapter.slug}`,
    `Category: ${chapter.reveal?.category ?? '—'}`,
    `Venue: ${chapter.reveal?.venue ?? '—'}`,
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

  try {
    const results = await Promise.all([
      hasEmail ? notifyEmail({ subject, text }) : Promise.resolve(false),
      hasWebhook ? notifyWebhook(`**${subject}**\n\`\`\`\n${text}\n\`\`\``) : Promise.resolve(false),
    ]);

    if (!results.some(Boolean)) {
      return res.status(503).json({ error: 'No notification channel succeeded' });
    }
  } catch (error) {
    console.error(error);
    return res.status(502).json({ error: 'Failed to send notification' });
  }

  return res.status(200).json({ ok: true });
}
