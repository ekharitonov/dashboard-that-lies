import { useState, useEffect } from 'react';
import { C } from '../design.js';

export function Card({ children, title, subtitle, trap, headerRight, style }) {
  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`,
      borderRadius: 6, padding: '18px 20px', position: 'relative',
      ...style
    }}>
      {title && (
        <div style={{ marginBottom: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, fontWeight: 500, letterSpacing: '0.01em', color: C.text }}>{title}</div>
            {subtitle && <div style={{ fontFamily: 'IBM Plex Sans, system-ui, sans-serif', fontSize: 11, color: C.textDim, marginTop: 2 }}>{subtitle}</div>}
          </div>
          {headerRight ? headerRight : trap ? (
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.brick, border: `1px solid ${C.brickDim}`, padding: '3px 8px', borderRadius: 3, whiteSpace: 'nowrap' }}>◆ TRAP</div>
          ) : null}
        </div>
      )}
      {children}
    </div>
  );
}

export function MiniToggle({ value, onChange }) {
  return (
    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 3, overflow: 'hidden', fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, letterSpacing: '0.12em', fontWeight: 500 }}>
      <button onClick={() => onChange('executive')}
        style={{
          padding: '5px 10px',
          background: value === 'executive' ? C.amber : 'transparent',
          color: value === 'executive' ? '#1A1410' : C.textDim,
          border: 'none', cursor: 'pointer',
          borderRight: `1px solid ${C.border}`,
        }}>◆ TRAP</button>
      <button onClick={() => onChange('analyst')}
        style={{
          padding: '5px 10px',
          background: value === 'analyst' ? C.teal : 'transparent',
          color: value === 'analyst' ? '#0E1814' : C.textDim,
          border: 'none', cursor: 'pointer',
        }}>✓ TRUTH</button>
    </div>
  );
}

export function ChartWithFlip({ globalView, title, subtitle, renderExec, renderAnalyst }) {
  const [mode, setMode] = useState(globalView);
  useEffect(() => { setMode(globalView); }, [globalView]);
  return (
    <Card title={title} subtitle={subtitle} headerRight={<MiniToggle value={mode} onChange={setMode} />}>
      {mode === 'executive' ? renderExec() : renderAnalyst()}
    </Card>
  );
}

export function KPI({ label, value, unit, delta, deltaLabel, caption, bold }) {
  const deltaColor = delta == null ? C.textDim : delta > 0 ? C.green : delta < 0 ? C.brick : C.textDim;
  const deltaSign = delta > 0 ? '+' : '';
  return (
    <div style={{ padding: '14px 16px', background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4 }}>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.textMuted, marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: bold ? 28 : 24, fontWeight: 500, color: C.text, letterSpacing: '-0.01em' }}>{value}</span>
        {unit && <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: C.textDim }}>{unit}</span>}
      </div>
      {(delta != null || deltaLabel) && (
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: deltaColor, marginTop: 6 }}>
          {delta != null && <span>{deltaSign}{delta}{typeof delta === 'number' && Math.abs(delta) < 100 ? ' pp' : ''}</span>}
          {deltaLabel && <span style={{ color: C.textDim, marginLeft: delta != null ? 6 : 0 }}>{deltaLabel}</span>}
        </div>
      )}
      {caption && <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10.5, color: C.textDim, marginTop: 8, lineHeight: 1.4 }}>{caption}</div>}
    </div>
  );
}

export function TrapBox({ title, what, how, fix }) {
  return (
    <div style={{ background: 'rgba(217, 75, 58, 0.06)', border: `1px solid ${C.brickDim}`, borderLeft: `3px solid ${C.brick}`, borderRadius: 4, padding: '14px 16px', marginTop: 12 }}>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.brick, marginBottom: 8 }}>◆ trap identified</div>
      <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 15, color: C.text, marginBottom: 8, fontWeight: 500 }}>{title}</div>
      <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: C.text, lineHeight: 1.55, opacity: 0.88 }}>
        <div style={{ marginBottom: 6 }}><span style={{ color: C.textDim, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, marginRight: 8 }}>WHAT</span>{what}</div>
        <div style={{ marginBottom: 6 }}><span style={{ color: C.textDim, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, marginRight: 8 }}>HOW</span>{how}</div>
        <div><span style={{ color: C.textDim, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, marginRight: 8 }}>FIX</span>{fix}</div>
      </div>
    </div>
  );
}
