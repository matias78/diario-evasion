export type Section = 'intro' | 'lado-a' | 'lado-b' | 'bonus-track';

export const SECTIONS = {
  intro: { name: 'INTRO', slug: 'intro' },
  'lado-a': { name: 'LADO A: Los años borrados', slug: 'lado-a' },
  'lado-b': { name: 'LADO B: De otras vidas que la mía', slug: 'lado-b' },
  'bonus-track': { name: 'BONUS TRACK: Canciones perdidas', slug: 'bonus-track' },
} as const;
