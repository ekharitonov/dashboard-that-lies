import { useState } from 'react';
import { C } from './design.js';
import ManufacturingView from './views/ManufacturingView.jsx';
import EcommerceView from './views/EcommerceView.jsx';
import SaasView from './views/SaasView.jsx';
import DecisionProtocol from './components/DecisionProtocol.jsx';

// ================================================================
// MAIN APP
// ================================================================
export default function Dashboard() {
  const [variant, setVariant] = useState('manufacturing');
  const [view, setView] = useState('executive');
  const [showProtocol, setShowProtocol] = useState(false);

  const variants = [
    { id: 'manufacturing', label: 'Manufacturing', sub: 'Mid-size metalworking · $40M+ rev' },
    { id: 'ecommerce', label: 'E-commerce', sub: 'D2C + B2B retail · $25M+ rev' },
    { id: 'saas', label: 'B2B SaaS', sub: 'Managed services · $20M+ ARR' },
  ];

  const renderView = () => {
    if (variant === 'manufacturing') return <ManufacturingView globalView={view} />;
    if (variant === 'ecommerce') return <EcommerceView globalView={view} />;
    if (variant === 'saas') return <SaasView globalView={view} />;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bg,
      color: C.text,
      fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
      fontSize: 13,
      padding: '24px 32px 60px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .recharts-default-tooltip { background: ${C.bgCard} !important; border-color: ${C.borderHi} !important; }
        .recharts-tooltip-label { color: ${C.text} !important; font-family: 'IBM Plex Mono', monospace !important; }
        .recharts-tooltip-item { color: ${C.text} !important; font-family: 'IBM Plex Mono', monospace !important; }
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 20, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.16em', color: C.amber, marginBottom: 6 }}>OPERATIONS ANALYTICS · PROOF OF CONCEPT</div>
          <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 28, fontWeight: 500, margin: 0, letterSpacing: '-0.01em', color: C.text }}>
            The Dashboard That Lies
          </h1>
          <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: C.textDim, marginTop: 6, maxWidth: 720, lineHeight: 1.5 }}>
            Three mid-size companies. 180 days of synthetic operational data. Every executive KPI card hides a statistical trap. Toggle into <span style={{ color: C.teal }}>Analyst View</span> to see the same data, honestly.
          </div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: C.textMuted, marginTop: 10, letterSpacing: '0.08em' }}>
            A case study by <a href="https://kharitonov.expert" target="_blank" rel="noopener noreferrer" style={{ color: C.amber, textDecoration: 'none', borderBottom: `1px dotted ${C.amberDim}`, paddingBottom: 1 }}>BME Expert · kharitonov.expert ↗</a>
          </div>
        </div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: C.textMuted, textAlign: 'right' }}>
          <div>2024-07-01 → 2024-12-27</div>
          <div>Q3 + Q4 · n=180 days</div>
          <a href="https://kharitonov.expert" target="_blank" rel="noopener noreferrer"
             style={{ color: C.amber, textDecoration: 'none', marginTop: 8, display: 'inline-block', letterSpacing: '0.08em', borderBottom: `1px dotted ${C.amberDim}`, paddingBottom: 1 }}>
            kharitonov.expert ↗
          </a>
        </div>
      </div>

      {/* CONTROLS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, marginBottom: 24, alignItems: 'end' }}>
        {/* Variant selector */}
        <div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: C.textMuted, marginBottom: 10 }}>COMPANY PROFILE</div>
          <div style={{ display: 'flex', gap: 0, border: `1px solid ${C.border}`, borderRadius: 4, overflow: 'hidden' }}>
            {variants.map(v => (
              <button key={v.id} onClick={() => setVariant(v.id)}
                style={{
                  flex: 1, padding: '14px 18px', background: variant === v.id ? C.bgCard2 : 'transparent',
                  border: 'none', borderRight: v.id !== 'saas' ? `1px solid ${C.border}` : 'none',
                  color: variant === v.id ? C.text : C.textDim,
                  textAlign: 'left', cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}>
                <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.01em' }}>{v.label}</div>
                <div style={{ fontSize: 10.5, color: C.textMuted, fontFamily: 'IBM Plex Mono, monospace', marginTop: 3 }}>{v.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* View toggle */}
        <div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: C.textMuted, marginBottom: 10, textAlign: 'right' }}>VIEW MODE</div>
          <div style={{ display: 'flex', gap: 0, border: `1px solid ${C.border}`, borderRadius: 4, overflow: 'hidden' }}>
            <button onClick={() => setView('executive')}
              style={{
                padding: '14px 22px',
                background: view === 'executive' ? C.amber : 'transparent',
                color: view === 'executive' ? '#1A1410' : C.textDim,
                border: 'none', borderRight: `1px solid ${C.border}`, cursor: 'pointer',
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em',
                textTransform: 'uppercase', fontWeight: 500,
              }}>
              ◆ Executive
            </button>
            <button onClick={() => setView('analyst')}
              style={{
                padding: '14px 22px',
                background: view === 'analyst' ? C.teal : 'transparent',
                color: view === 'analyst' ? '#0E1814' : C.textDim,
                border: 'none', cursor: 'pointer',
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em',
                textTransform: 'uppercase', fontWeight: 500,
              }}>
              ✓ Analyst
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE VIEW DESCRIPTION */}
      <div style={{
        background: view === 'executive' ? 'rgba(212, 165, 116, 0.06)' : 'rgba(107, 162, 146, 0.06)',
        border: `1px solid ${view === 'executive' ? C.amberDim : C.tealDim}`,
        borderLeft: `3px solid ${view === 'executive' ? C.amber : C.teal}`,
        padding: '12px 16px',
        marginBottom: 22,
        borderRadius: 4,
      }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: view === 'executive' ? C.amber : C.teal, marginBottom: 4 }}>
          {view === 'executive' ? '◆ EXECUTIVE VIEW' : '✓ ANALYST VIEW'}
        </div>
        <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12.5, color: C.text, lineHeight: 1.5 }}>
          {view === 'executive'
            ? 'Big KPI numbers. Headline trends. Status-quo comfort. Every decision driven from this view will be slightly — or very — wrong. What do you see that needs "action"?'
            : 'Same data. Now stratified, windowed, and plotted against its own distribution. Control limits replace gut reactions. Distributions replace single numbers. Traps are annotated below each chart.'}
        </div>
      </div>

      {/* CONTENT */}
      {renderView()}

      {/* DECISION PROTOCOL TRIGGER (only on Executive view) */}
      {view === 'executive' && (
        <div style={{ marginTop: 32, padding: '24px 28px', background: C.bgCard, border: `1px solid ${C.borderHi}`, borderLeft: `3px solid ${C.brick}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.16em', color: C.brick, marginBottom: 6 }}>◆ 90 DAYS LATER · WHAT HAPPENED NEXT</div>
            <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 19, fontWeight: 500, color: C.text, marginBottom: 6, letterSpacing: '-0.01em' }}>
              Leadership acted on this dashboard. Here is the decision protocol.
            </div>
            <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12.5, color: C.textDim, lineHeight: 1.55, maxWidth: 720 }}>
              Every KPI above triggered a decision. Each decision had a cost and a consequence. Compare the executive team's actual path against what a statistically-literate analyst team would have done on the same data, same week.
            </div>
          </div>
          <button onClick={() => setShowProtocol(true)}
            style={{
              background: C.brick, color: '#FDF8F3', border: 'none',
              fontFamily: 'IBM Plex Mono, monospace', fontSize: 11.5, letterSpacing: '0.14em',
              padding: '14px 22px', borderRadius: 4, cursor: 'pointer',
              fontWeight: 500, textTransform: 'uppercase', whiteSpace: 'nowrap',
              boxShadow: '0 2px 12px rgba(217, 75, 58, 0.25)',
              transition: 'transform 0.12s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            Open Decision Protocol →
          </button>
        </div>
      )}

      {/* PROTOCOL MODAL */}
      {showProtocol && <DecisionProtocol variant={variant} onClose={() => setShowProtocol(false)} />}

      {/* FOOTER */}
      <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: C.textMuted, letterSpacing: '0.05em' }}>
        <div>Synthetic data · seed 42 · reproducible</div>
        <a href="https://kharitonov.expert" target="_blank" rel="noopener noreferrer"
           style={{ color: C.amber, textDecoration: 'none', letterSpacing: '0.08em', borderBottom: `1px dotted ${C.amberDim}`, paddingBottom: 1 }}>
          BME EXPERT · kharitonov.expert ↗
        </a>
      </div>
    </div>
  );
}
