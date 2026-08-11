import { useEffect, useRef, useState } from 'react';
import { getSpotifyEmbedUri, soundtrack } from '../../data/soundtrack';
import type { SpotifyEmbedController, SpotifyIFrameAPI } from '../../types/spotify';
import styles from './SoundtrackPlayer.module.css';

const IFRAME_API_SRC = 'https://open.spotify.com/embed/iframe-api/v1';

let apiPromise: Promise<SpotifyIFrameAPI> | null = null;

function loadSpotifyIFrameAPI(): Promise<SpotifyIFrameAPI> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${IFRAME_API_SRC}"]`,
    );

    const previous = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      previous?.(api);
      resolve(api);
    };

    if (existing) return;

    const script = document.createElement('script');
    script.src = IFRAME_API_SRC;
    script.async = true;
    script.onerror = () => reject(new Error('Failed to load Spotify iFrame API'));
    document.body.appendChild(script);
  });

  return apiPromise;
}

function splitTitle(title: string): [string, string] {
  const words = title.trim().split(/\s+/);
  if (words.length <= 2) return [title, ''];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

export function SoundtrackPlayer() {
  const embedRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const uri = getSpotifyEmbedUri(soundtrack.spotifyUrl);
  const [titleLine1, titleLine2] = splitTitle(soundtrack.title);
  const openUrl = uri
    ? soundtrack.spotifyUrl.replace(/^TODO:\s*/, '')
    : null;

  useEffect(() => {
    return () => {
      controllerRef.current?.destroy?.();
      controllerRef.current = null;
    };
  }, []);

  const ensureController = async () => {
    if (!uri || !embedRef.current) {
      setError('Soundtrack forthcoming.');
      return null;
    }

    if (controllerRef.current) return controllerRef.current;

    try {
      const api = await loadSpotifyIFrameAPI();
      return await new Promise<SpotifyEmbedController>((resolve) => {
        api.createController(
          embedRef.current!,
          { uri, height: 152, width: '100%' },
          (controller) => {
            controllerRef.current = controller;
            controller.addListener('ready', () => setReady(true));
            controller.addListener('playback_update', (event) => {
              const paused = Boolean(event?.data?.isPaused);
              setPlaying(!paused);
            });
            setReady(true);
            resolve(controller);
          },
        );
      });
    } catch {
      setError('Unable to load soundtrack.');
      return null;
    }
  };

  const handlePlay = async () => {
    setError(null);
    setExpanded(true);

    if (!uri) {
      setError('Soundtrack forthcoming.');
      return;
    }

    const controller = await ensureController();
    if (!controller) return;

    // User gesture — start playback where the browser allows it.
    controller.play();
    setPlaying(true);
  };

  const handlePause = () => {
    controllerRef.current?.pause();
    setPlaying(false);
  };

  return (
    <section
      className={`${styles.root} ${expanded ? styles.rootExpanded : ''}`}
      aria-label="Original soundtrack"
    >
      <p className={styles.kicker}>Original Soundtrack</p>

      <h2 className={styles.title}>
        <span>{titleLine1}</span>
        {titleLine2 ? <span>{titleLine2}</span> : null}
      </h2>

      {!expanded ? (
        <button
          type="button"
          className={styles.play}
          onClick={handlePlay}
          aria-label="Play soundtrack"
        >
          <span className={styles.playMark} aria-hidden="true">
            ▶
          </span>
          <span className={styles.playLabel}>Play</span>
          <span className={styles.rule} aria-hidden="true" />
        </button>
      ) : (
        <div
          className={`${styles.expanded} ${reduceMotion ? styles.noMotion : ''}`}
        >
          <div className={styles.embedShell}>
            <div ref={embedRef} className={styles.embedHost} />
            {!ready && !error ? (
              <p className={styles.status}>Loading soundtrack…</p>
            ) : null}
          </div>

          <div className={styles.controls}>
            {playing ? (
              <button
                type="button"
                className={styles.control}
                onClick={handlePause}
                aria-label="Pause soundtrack"
              >
                Pause
              </button>
            ) : (
              <button
                type="button"
                className={styles.control}
                onClick={handlePlay}
                aria-label="Play soundtrack"
              >
                Play
              </button>
            )}

            {openUrl ? (
              <a
                className={styles.control}
                href={openUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open playlist in Spotify"
              >
                Open in Spotify
              </a>
            ) : null}
          </div>
        </div>
      )}

      <p className={styles.subtitle}>{soundtrack.subtitle}</p>
      {error ? <p className={styles.error}>{error}</p> : null}
    </section>
  );
}
