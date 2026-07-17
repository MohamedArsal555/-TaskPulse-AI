// ── DESIGN TOKENS ────────────────────────────────────────────
// Editorial paper background, violet/purple brand accent throughout
// (sidebar, buttons, focus states, hero) — one consistent gradient family.
export const C = {
  p50:  '#f3edfc',
  p100: '#e4d6f7',
  p200: '#cbb0ef',
  p300: '#ab82e3',
  p400: '#8f5cd9',
  p500: '#7c3aed', // primary accent (violet)
  p600: '#6425c9',
  p700: '#4c1d95',

  grad:    'linear-gradient(160deg, #3c1a78 0%, #5b21b6 45%, #2a1259 100%)', // sidebar — purple, subtly animated
  gradBtn: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)', // primary buttons — purple gradient sheen

  // Vivid hero accent — dashboard banner + predictor tiles, brighter than the
  // sidebar/button gradient so the hero still reads as the "high energy" spot.
  heroGrad: 'linear-gradient(120deg, #5b21b6 0%, #8b3fd6 45%, #c026d3 100%)',

  border:      '#e5ddd0',
  borderLight: '#eee7da',

  txt:    '#242119',
  txtSub: '#6b6255',
  txtMut: '#948b7c',

  bg:      '#f6f2ea',
  surface: '#fffdf9',
};

// Shared semantic risk/level colors — muted rather than neon.
// `tier` buckets the many level strings the three predictors use (Low/Healthy/
// Balanced/Underloaded, Medium/At Risk, High/Critical/Overloaded) into one
// good/watch/risk axis so cross-tool KPIs can group them consistently.
export const RISK = {
  Low:         { tier: 'good',  c: '#3d6b4a', bg: '#e9efe8', dot: '#4c8058', bd: '#cddecd' },
  Healthy:     { tier: 'good',  c: '#3d6b4a', bg: '#e9efe8', dot: '#4c8058', bd: '#cddecd' },
  Balanced:    { tier: 'good',  c: '#3d6b4a', bg: '#e9efe8', dot: '#4c8058', bd: '#cddecd' },
  Underloaded: { tier: 'good',  c: '#3c5b72', bg: '#e7edf1', dot: '#4e7793', bd: '#c9d8e0' },
  Medium:      { tier: 'watch', c: '#8a5a1f', bg: '#f3ead9', dot: '#b0832f', bd: '#e4d1a3' },
  'At Risk':   { tier: 'watch', c: '#8a5a1f', bg: '#f3ead9', dot: '#b0832f', bd: '#e4d1a3' },
  High:        { tier: 'risk',  c: '#9c3f2c', bg: '#f5e5e0', dot: '#b1502f', bd: '#e6c6ba' },
  Critical:    { tier: 'risk',  c: '#9c3f2c', bg: '#f5e5e0', dot: '#b1502f', bd: '#e6c6ba' },
  Overloaded:  { tier: 'risk',  c: '#9c3f2c', bg: '#f5e5e0', dot: '#b1502f', bd: '#e6c6ba' },
};

export const riskColor = (level) => RISK[level] || { c: C.txtSub, bg: C.p50, dot: C.p400, bd: C.border };

// Coarse good/watch/risk bucket for a level string, for cross-predictor KPIs.
export const riskTier = (level) => RISK[level]?.tier || 'watch';
