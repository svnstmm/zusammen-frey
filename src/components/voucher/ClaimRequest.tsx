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
    if (state === 'submitting') return;
    setState('submitting');
    setError(null);

    try {
      const response = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      const raw = await response.text();
      let data: { error?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as { error?: string }) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.error ?? `Request failed (${response.status})`,
        );
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

  const requestAgain = () => {
    setError(null);
    setState('idle');
  };

  if (state === 'done') {
    return (
      <div className={styles.root}>
        <p className={styles.confirm} aria-live="polite">
          Request received.
          <br />
          The voucher for {chapterLabel} will arrive by email.
        </p>
        <button
          type="button"
          className={styles.secondary}
          onClick={requestAgain}
        >
          Request again
        </button>
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
        {state === 'submitting' ? 'Sending request…' : 'Request voucher →'}
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
