import { useEffect, useState } from 'react';
import styles from './ClaimRequest.module.css';

type ClaimState = 'idle' | 'submitting' | 'done' | 'error';

interface ClaimRequestProps {
  slug: string;
  chapterLabel: string;
}

const storageKey = (slug: string) => `zf-claim:${slug}`;

export function ClaimRequest({ slug, chapterLabel }: ClaimRequestProps) {
  const [state, setState] = useState<ClaimState>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey(slug)) === '1') {
        setState('done');
      }
    } catch {
      // Private mode / blocked storage — ignore.
    }
  }, [slug]);

  const requestVoucher = async () => {
    if (state === 'submitting' || state === 'done') return;
    setState('submitting');
    setError(null);

    try {
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? 'Request failed');
      }

      try {
        localStorage.setItem(storageKey(slug), '1');
      } catch {
        // ignore
      }

      setState('done');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Request failed');
    }
  };

  if (state === 'done') {
    return (
      <div className={styles.root}>
        <p className={styles.confirm} aria-live="polite">
          Request received.
          <br />
          The voucher for {chapterLabel} will arrive by email.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.action}
        onClick={requestVoucher}
        disabled={state === 'submitting'}
      >
        <span className={styles.label}>
          {state === 'submitting' ? 'Sending request…' : 'Request voucher →'}
        </span>
        <span className={styles.rule} aria-hidden="true" />
      </button>

      <p className={styles.privacy}>
        Requesting notifies Sven and includes approximate location.
      </p>

      {state === 'error' && error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
