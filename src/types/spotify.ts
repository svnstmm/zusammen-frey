export interface SpotifyEmbedController {
  play: () => void;
  pause: () => void;
  togglePlay?: () => void;
  loadUri?: (uri: string) => void;
  loadEntity?: (uriOrUrl: string) => void;
  destroy?: () => void;
  addListener: (
    event: string,
    callback: (event?: { data?: Record<string, unknown> }) => void,
  ) => void;
  removeListener: (
    event: string,
    callback?: (event?: { data?: Record<string, unknown> }) => void,
  ) => void;
}

export interface SpotifyIFrameAPI {
  createController: (
    element: HTMLElement,
    options: {
      uri?: string;
      url?: string;
      width?: number | string;
      height?: number | string;
    },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

export {};
