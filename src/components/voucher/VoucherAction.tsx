import { useState } from 'react';
import type { ChapterVoucher } from '../../types/chapter';
import styles from './VoucherAction.module.css';

interface VoucherActionProps {
  voucher: ChapterVoucher;
}

const EXTERNAL_REL = 'noopener noreferrer';

function resolveHref(voucher: ChapterVoucher): string | null {
  if (voucher.type === 'pdf' || voucher.type === 'image') {
    const path = voucher.file ?? voucher.url;
    if (!path || path.startsWith('TODO:')) return null;
    return path;
  }
  if (
    voucher.type === 'external-link' ||
    voucher.type === 'paypal'
  ) {
    if (!voucher.url || voucher.url.startsWith('TODO:')) return null;
    return voucher.url;
  }
  return null;
}

function defaultLabel(voucher: ChapterVoucher): string {
  switch (voucher.type) {
    case 'pdf':
      return 'Open Voucher';
    case 'external-link':
      return 'Visit Venue';
    case 'paypal':
      return voucher.amount != null ? `Claim €${voucher.amount}` : 'Claim';
    case 'code':
      return 'Reveal Code';
    case 'image':
      return 'View Voucher';
    default:
      return '';
  }
}

export function VoucherAction({ voucher }: VoucherActionProps) {
  const [codeRevealed, setCodeRevealed] = useState(false);

  if (voucher.type === 'none') return null;

  const label = voucher.label ?? defaultLabel(voucher);
  const href = resolveHref(voucher);
  const isPlaceholder = href === null && voucher.type !== 'code';

  if (voucher.type === 'code') {
    const hasCode = Boolean(voucher.code) && !voucher.code?.startsWith('TODO:');
    return (
      <div className={styles.root}>
        {voucher.note ? <p className={styles.note}>{voucher.note}</p> : null}
        {!codeRevealed ? (
          <button
            type="button"
            className={styles.action}
            onClick={() => setCodeRevealed(true)}
            disabled={!hasCode}
          >
            <span className={styles.label}>{label}</span>
            <span className={styles.rule} aria-hidden="true" />
          </button>
        ) : (
          <p className={styles.code} aria-live="polite">
            {voucher.code}
          </p>
        )}
        {!hasCode ? (
          <p className={styles.placeholder}>Voucher code forthcoming.</p>
        ) : null}
      </div>
    );
  }

  if (isPlaceholder) {
    return (
      <div className={styles.root}>
        {voucher.note ? <p className={styles.note}>{voucher.note}</p> : null}
        <div className={`${styles.action} ${styles.pending}`} aria-disabled="true">
          <span className={styles.label}>{label}</span>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <p className={styles.placeholder}>Link forthcoming</p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {voucher.note ? <p className={styles.note}>{voucher.note}</p> : null}
      <a
        className={styles.action}
        href={href!}
        target="_blank"
        rel={EXTERNAL_REL}
      >
        <span className={styles.label}>{label}</span>
        <span className={styles.rule} aria-hidden="true" />
      </a>
    </div>
  );
}
