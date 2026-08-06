import type { Transition, Variants } from 'framer-motion';

/** Shared motion language — restrained, editorial, never playful. */

export const easeEditorial: Transition['ease'] = [0.22, 1, 0.36, 1];

export const fadeTransition: Transition = {
  duration: 1.2,
  ease: easeEditorial,
};

export const dissolveTransition: Transition = {
  duration: 1.8,
  ease: easeEditorial,
};

export const staggerChildren = (stagger = 0.18, delayChildren = 0.2) => ({
  staggerChildren: stagger,
  delayChildren,
});

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: fadeTransition,
  },
  exit: {
    opacity: 0,
    filter: 'blur(6px)',
    transition: dissolveTransition,
  },
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: fadeTransition,
  },
  exit: {
    opacity: 0,
    transition: dissolveTransition,
  },
};
