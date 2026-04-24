// ========= DESIGN TOKENS =========
const C = {
  bg:        '#0A0C11',
  bgCard:    '#12151C',
  bgCard2:   '#171A22',
  border:    '#242832',
  borderHi:  '#343843',
  text:      '#E8E6E0',
  textDim:   '#8A8A8A',
  textMuted: '#5A5D66',
  amber:     '#D4A574',
  amberDim:  '#8A6E4D',
  brick:     '#D94B3A',
  brickDim:  '#6B2A23',
  teal:      '#6BA292',
  tealDim:   '#3E615A',
  blue:      '#6B8EB2',
  plum:      '#9B6B8E',
  gold:      '#C9A66B',
  green:     '#7FA669',
  // chart series
  s1: '#D4A574', s2: '#6BA292', s3: '#6B8EB2', s4: '#9B6B8E',
  s5: '#C9A66B', s6: '#7FA669', s7: '#B2736B',
};

const fmt = {
  usd: (v) => '$' + (v >= 1e6 ? (v/1e6).toFixed(2)+'M' : v >= 1e3 ? (v/1e3).toFixed(1)+'K' : Math.round(v)),
  usdFull: (v) => '$' + Math.round(v).toLocaleString(),
  pct: (v, d=1) => (v==null ? '—' : v.toFixed(d) + '%'),
  num: (v, d=0) => (v==null ? '—' : Number(v).toLocaleString(undefined, {maximumFractionDigits: d, minimumFractionDigits: d})),
  days: (v, d=1) => v.toFixed(d) + 'd',
  hrs: (v, d=2) => v.toFixed(d) + 'h',
  short: (s) => s.slice(5),
};


export const tooltipStyle = {
  background: C.bgCard, border: `1px solid ${C.borderHi}`, borderRadius: 4,
  fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: C.text, padding: '6px 10px'
};

export const axisProps = {
  tick: { fill: C.textDim, fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' },
  stroke: C.border,
};

// Export C and fmt at bottom so they're named exports
export { C, fmt };
