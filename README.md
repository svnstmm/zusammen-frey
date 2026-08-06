# ZUSAMMEN FREY — Director's Cut

A cinematic wedding gift site. Special edition. Twelve chapters. One year.

## Stack

- React + Vite + TypeScript
- Framer Motion
- CSS Modules
- Deployable to Vercel

## Develop

```bash
npm install
npm run dev
```

## Architecture

```
src/
  components/
    atmosphere/     Film grain, paper texture, ambient field
    landing/        Entry title card
    experience/     Post-enter shell (chapters next)
    chapter/        Reserved for editorial chapter cards
    ui/             Shared controls (Enter, …)
  context/          Experience flow + audio (no autoplay)
  data/             chapters.ts + site meta (single source of truth)
  hooks/            Unlock stubs for future gates
  lib/              Shared motion language
  styles/           Design tokens, fonts, global base
  types/            Chapter + experience contracts
```

## Next

- Editorial chapter cards
- Unlock schedule / passwords
- Vouchers, galleries, personal messages
- Optional ambience (projector / room tone)
