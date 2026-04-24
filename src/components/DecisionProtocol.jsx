import { C } from '../design.js';

const DECISION_LOG = {
  manufacturing: {
    exec: [
      { date: 'OCT 10', trigger: 'FPY aggregate −0.1pp Q3→Q4', decision: 'Launch cross-functional quality improvement initiative', actions: '3 new QC inspectors · daily 30-min quality standups · external process audit', cost: 385000, costLabel: 'annualized', outcome: 'No measurable FPY improvement — nothing was broken. Complex line remains bottleneck because no targeted investment there. QC team morale drops under audit posture.' },
      { date: 'NOV 08', trigger: 'OTIF weeks 19, 22 below 95% target', decision: 'Switch primary freight carrier; add air-freight surcharge for at-risk orders', actions: 'Contract termination fee · air-freight premium +$12K/mo', cost: 190000, costLabel: 'over 12 mo', outcome: 'OTIF continues same pattern — it is process variation, not carrier. New carrier delivers slightly worse service. Margin hit for no gain.' },
      { date: 'SEP 20', trigger: '"Average 9.4 days" communicated as standard quote', decision: 'Quote all customers 10-day delivery regardless of product complexity', actions: 'CRM updated with flat SLA', cost: 1420000, costLabel: 'penalties + lost ARR', outcome: 'Complex orders (P95 22d) routinely fail SLA. ~$220K in late-penalty credits. Two enterprise accounts lost (~$1.2M ARR). Trust damaged with large buyers.' },
      { date: 'NOV 15', trigger: 'Aug 4 incidents → Nov 3 incidents read as "trending up"', decision: 'Mandatory weekly 2-hour safety stand-down across all shifts', actions: '~240 production hours forfeited over 8 weeks', cost: 600000, costLabel: 'lost margin', outcome: 'Zero safety improvement — process was already under statistical control. One supervisor departs citing micromanagement. Floor operators disengaged.' },
      { date: 'DEC 01', trigger: 'Scrap aggregate +0.2pp Q3→Q4', decision: 'Hold shift supervisors accountable — cut Q4 bonuses 50%', actions: 'Bonus adjustment ·  performance notices', cost: 180000, costLabel: 'replacement cost', outcome: '2 senior supervisors leave for competitor within 60 days. Floor execution degrades. Knowledge loss compounds. Remaining supervisors defensive in reporting.' },
    ],
    execTotal: 2775000,
    execSummary: 'The executive team spent $2.77M solving phantom problems, damaged morale across two functions, lost two enterprise accounts, and missed the real opportunity: a growing Complex product mix that needed targeted investment, not aggregate-level reactions.',
    analyst: [
      { date: 'OCT 10', trigger: 'FPY stratified · all product lines improving · Complex mix grew 10%→40%', decision: 'Targeted investment in Complex process capability', actions: 'DoE on Complex fixturing · 1 process engineer reassigned · upgraded tooling', cost: 45000, costLabel: 'incremental', outcome: 'Complex FPY reaches 92% (from 88%). Capacity for Complex grows 35%. Win 2 new enterprise accounts specifically because "we can do Complex at quality" — $2.8M new ARR.' },
      { date: 'NOV 03', trigger: 'OTIF control chart · only Oct 28 – Nov 3 is a real signal', decision: 'Single-supplier investigation → dual-source agreement', actions: 'Supplier development program · dual-source contract with alternate', cost: 20000, costLabel: 'one-time', outcome: 'Supplier root cause isolated. OTIF variance decreases. No carrier change needed — $190K of counterfactual spend avoided.' },
      { date: 'SEP 20', trigger: 'Lead time log-normal · product-specific distributions', decision: 'Tiered quotes: Simple 7d · Standard 10d · Complex 14d (all at P80)', actions: 'CRM quote workflow update', cost: 8000, costLabel: 'integration', outcome: 'SLA hit rate 92% → 97%. No enterprise account losses. Customer satisfaction rises, especially on Complex where expectations now match reality.' },
      { date: 'NOV 15', trigger: 'Safety counts within Poisson variance (λ≈0.6/mo, σ≈0.8)', decision: 'Continue existing safety program. Shift metrics to leading indicators.', actions: 'Track near-misses, safety observations. No operational disruption.', cost: 0, costLabel: 'no spend', outcome: 'Production uninterrupted. $600K margin retained. Operator trust preserved. Leading indicators catch a real near-miss cluster in December.' },
      { date: 'DEC 01', trigger: 'Per-product scrap rates all declining', decision: 'Retention bonuses for supervisors driving improvement', actions: 'Recognition program · retention pool', cost: 35000, costLabel: 'one-time', outcome: 'Zero senior supervisor departures. Floor execution stable. Tribal knowledge retained. Culture of honest reporting reinforced.' },
    ],
    analystTotal: 108000,
    analystNewValue: 2800000,
    analystSummary: 'Targeted $108K spend · $2.8M new ARR won · zero morale damage · real problem (Complex capacity) solved.',
    delta: 5467000,
    deltaLabel: 'Swing between paths on the same underlying business',
  },
  ecommerce: {
    exec: [
      { date: 'OCT 15', trigger: 'CVR aggregate 3.45% → 3.27%', decision: 'Emergency UX overhaul — rebuild checkout, redesign PDP', actions: 'Agency retainer · 6-week internal team sprint · delayed roadmap features', cost: 270000, costLabel: 'spend + opportunity', outcome: 'New checkout ships Q1. CVR unchanged because the "problem" was always Paid-channel mix shift. Team morale hit ("we spent Q4 on the wrong thing").' },
      { date: 'NOV 01', trigger: 'Blended CAC $31 vs mean AOV $88 looks healthy', decision: 'Scale Paid spend +40% for BFCM', actions: '+$420K incremental Paid budget', cost: 420000, costLabel: 'over-spend', outcome: 'New Paid customers each underwater day-1 (CAC $46 on median AOV $78 × 44% margin = negative contribution). Mix shift accelerates further — aggregate CVR drops more. Vicious loop.' },
      { date: 'DEC 10', trigger: 'Aggregate returns 9.5% below industry benchmark', decision: 'No category-level investigation', actions: 'Nothing. Metric marked "healthy" on dashboard.', cost: 920000, costLabel: 'hidden', outcome: 'Apparel returns continue at 18.6%. ~$380K reverse logistics + ~$540K lost goodwill (returned-from Apparel customers don\'t repurchase). Problem compounds into Q1.' },
      { date: 'NOV 20', trigger: 'AOV mean $88 fed into LTV model', decision: 'Raise bid ceilings in Paid campaigns to match "strong" projected LTV', actions: 'CPM caps lifted across accounts', cost: 95000, costLabel: 'overspend', outcome: 'Contribution margin erodes through December. Mid-Dec the CFO flags cash burn. Marketing defensive. CMO–CFO relationship strained.' },
    ],
    execTotal: 1705000,
    execSummary: 'The executive team spent $1.7M + opportunity cost responding to phantom CVR decline while ignoring a real supplier crisis in Apparel and overspending on a channel with negative day-1 unit economics.',
    analyst: [
      { date: 'OCT 15', trigger: 'CVR by channel · every channel up · Paid mix grew 25%→45%', decision: 'No UX project. Audit paid-budget allocation.', actions: '1 analyst week · discover agency shifted to "new-customer-acquisition" KPI without a CAC payback guardrail', cost: 0, costLabel: 'internal', outcome: 'Root cause identified and communicated. UX team continues planned roadmap without disruption.' },
      { date: 'NOV 01', trigger: 'Paid CAC $46 vs median AOV $78 — underwater day-1', decision: 'Cut Paid 25%; reallocate to email (CAC $4) and lifecycle', actions: '−$180K Paid · +$40K email/lifecycle', cost: -140000, costLabel: 'net savings', outcome: 'ROAS improves. Mix shifts back toward Organic+Email (higher CVR). Aggregate CVR recovers. Contribution margin up.' },
      { date: 'DEC 10', trigger: 'Apparel return rate 18.6% — 5× other categories', decision: 'Emergency supplier audit · rebuild sizing chart', actions: 'Supplier audit · customer-facing sizing tool · returned-item analysis', cost: 80000, costLabel: 'targeted', outcome: 'Apparel returns drop to 11%. ~$280K reverse-logistics saved over 6 months. Apparel repeat-purchase rate recovers.' },
      { date: 'NOV 20', trigger: 'AOV median $78 · B2C median $62 · B2B median $340', decision: 'LTV model segmented; bid ceilings by channel AND segment', actions: 'Analytics rebuild of bid model', cost: 20000, costLabel: 'one-time', outcome: 'Paid spend allocated to positive-payback audiences only. Margin protected through holidays. CFO confidence maintained.' },
    ],
    analystTotal: -40000,
    analystNewValue: 460000,
    analystSummary: 'Net savings of $40K · $460K+ reverse-logistics recovered · real Apparel problem solved · Paid discipline restored.',
    delta: 2165000,
    deltaLabel: 'Q4 P&L swing between the two paths',
  },
  saas: {
    exec: [
      { date: 'AUG 15', trigger: '"MRR up, net new positive" → growth investment phase', decision: 'Hire +8 AEs, +4 SDRs over next 2 quarters', actions: '~$1.4M annualized comp commitment', cost: 700000, costLabel: '6-mo run-rate', outcome: 'By Q1 next year: gross new acquisition increases, but new cohorts continue churning at 29% annualized. More headcount burns cash faster than leaky bucket can fill.' },
      { date: 'OCT 01', trigger: 'Blended gross churn 1.2% "best-in-class"', decision: 'No retention team investment; no onboarding redesign', actions: 'Nothing. Churn labeled "solved" on dashboard.', cost: 3900000, costLabel: 'continued churn', outcome: '$3.9M churned MRR over 180d continues the same pattern. Old-cohort drag-down is compounding silently. Board deck still shows healthy churn.' },
      { date: 'SEP 25', trigger: 'Ticket mean 1.96h above 1h SLA target', decision: 'Hire 5 additional CS reps', actions: '$350K annualized · new training cohort', cost: 175000, costLabel: '6-mo cost', outcome: 'Median ticket time barely moves — wasn\'t the problem. P95 tail unchanged — that was an escalation issue, not capacity. CS team grows without becoming more effective per ticket.' },
      { date: 'OCT 15', trigger: 'Trial conversion "volatile 15%-45% weekly"', decision: 'Growth team on 6-week sprint — daily experiments', actions: 'Full growth team roadmap paused · daily tests with no power analysis', cost: 120000, costLabel: 'opportunity cost', outcome: 'No statistical significance found — weekly n=15 CI is ±25pp. Team burned out chasing noise. Planned product experiments delayed into Q1.' },
      { date: 'NOV 30', trigger: 'Team avg utilization 78% "good"', decision: 'No action on individual-level dispersion', actions: 'Nothing. Per-person utilization never reported.', cost: 900000, costLabel: 'replacement cost', outcome: '3 senior IC departures by Q1 (seniors were running 95-120%). Knowledge walks out. Customer-facing quality degrades on accounts those seniors owned.' },
    ],
    execTotal: 5795000,
    execSummary: 'The executive team spent or lost $5.8M hiring into the front of a leaky bucket, ignoring the real problem (new-cohort churn acceleration) and burning out both growth and senior IC teams.',
    analyst: [
      { date: 'AUG 15', trigger: 'Gross-new / gross-churn ratio = 1.03 — barely out-pacing churn', decision: 'Freeze sales hiring; reallocate to retention', actions: 'Hire 2 CSMs · build onboarding team', cost: 280000, costLabel: '6-mo cost', outcome: 'New-cohort churn drops from 2.4% to 1.1% monthly by Q2. LTV begins to recover. Leaky bucket repaired before adding acquisition pressure.' },
      { date: 'OCT 01', trigger: 'New cohort gross churn 3× old cohort', decision: 'ICP analysis · onboarding redesign', actions: 'Product team 4-week focused sprint', cost: 180000, costLabel: 'one-time', outcome: 'Identified two ICP segments acquired through paid that were not fit. Paused those campaigns. New-cohort quality improves. Product-led onboarding launches in Nov.' },
      { date: 'SEP 25', trigger: 'P95 ticket time is "stuck" tickets needing eng escalation', decision: 'Build formal L3 escalation path · redesign ticket categorization', actions: '2-week engineering sprint · new triage playbook', cost: 45000, costLabel: 'one-time', outcome: 'P95 resolution drops from 6.7h to 3.2h. No new CS hires needed — $350K/yr avoided. CS team satisfaction up.' },
      { date: 'OCT 15', trigger: 'Weekly trial-conversion 95% CI is ±25pp — all weekly signal is noise', decision: 'Shift to monthly reporting. Run proper A/B with power analysis.', actions: 'Growth team returns to planned roadmap', cost: 0, costLabel: 'no spend', outcome: 'Team morale recovers. First properly-powered A/B (n=400 per variant) in Nov identifies a real 3.2pp lift — actionable result that compounds.' },
      { date: 'NOV 30', trigger: 'Senior IC utilization 95-120% (burnout risk), juniors 40-60% (bench)', decision: 'Rebalance workload · pair juniors with seniors · senior retention bonuses', actions: 'Workflow redesign · $85K retention pool', cost: 85000, costLabel: 'one-time', outcome: 'Zero senior departures. Juniors grow faster through pairing. Team delivers more output with same headcount. σ of utilization drops.' },
    ],
    analystTotal: 590000,
    analystNewValue: 1250000,
    analystSummary: '$590K invested · $350K CS hiring avoided · $900K senior-replacement avoided · fundamental trajectory corrected.',
    delta: 5205000,
    deltaLabel: 'First-year impact between the two paths',
  },
};

export default function DecisionProtocol({ variant, onClose }) {
  const log = DECISION_LOG[variant];
  const fmtUSD = (v) => {
    const sign = v < 0 ? '−' : '';
    const abs = Math.abs(v);
    if (abs >= 1e6) return `${sign}$${(abs/1e6).toFixed(2)}M`;
    if (abs >= 1e3) return `${sign}$${(abs/1e3).toFixed(0)}K`;
    return `${sign}$${abs}`;
  };

  const Column = ({ title, subtitle, badge, badgeColor, entries, totalLabel, total, totalColor, summary }) => (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, padding: 20, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: badgeColor }}>{badge}</div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: C.textMuted, letterSpacing: '0.1em' }}>{entries.length} DECISIONS</div>
      </div>
      <div style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20, fontWeight: 500, color: C.text, marginBottom: 4, letterSpacing: '-0.01em' }}>{title}</div>
      <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12, color: C.textDim, marginBottom: 18, lineHeight: 1.5 }}>{subtitle}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {entries.map((e, i) => (
          <div key={i} style={{ borderLeft: `2px solid ${badgeColor}`, paddingLeft: 14, paddingTop: 2, paddingBottom: 2 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: badgeColor }}>{e.date}</span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: C.textMuted }}>—</span>
              <span style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, color: C.textDim, fontStyle: 'italic' }}>{e.trigger}</span>
            </div>
            <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: C.text, fontWeight: 500, marginBottom: 4, lineHeight: 1.45 }}>{e.decision}</div>
            <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11.5, color: C.textDim, marginBottom: 8, lineHeight: 1.5 }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: C.textMuted, marginRight: 8, letterSpacing: '0.08em' }}>ACT</span>{e.actions}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 13, color: e.cost < 0 ? C.teal : e.cost === 0 ? C.textDim : badgeColor, fontWeight: 500 }}>{fmtUSD(e.cost)}</span>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{e.costLabel}</span>
            </div>
            <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11.5, color: C.text, opacity: 0.85, lineHeight: 1.55, background: C.bgCard2, borderRadius: 3, padding: '8px 10px' }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: C.textMuted, marginRight: 8, letterSpacing: '0.08em' }}>OUTCOME</span>{e.outcome}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: C.textDim, letterSpacing: '0.12em' }}>{totalLabel}</span>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 22, color: totalColor, fontWeight: 500 }}>{fmtUSD(total)}</span>
        </div>
        <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11.5, color: C.text, lineHeight: 1.55, opacity: 0.9, fontStyle: 'italic' }}>{summary}</div>
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(6, 8, 12, 0.85)', backdropFilter: 'blur(6px)',
      zIndex: 100, overflowY: 'auto', padding: '40px 32px',
    }} onClick={onClose}>
      <div style={{ maxWidth: 1400, margin: '0 auto', background: C.bg, border: `1px solid ${C.borderHi}`, borderRadius: 8, padding: '32px 36px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.16em', color: C.brick, marginBottom: 6 }}>◆ CONFIDENTIAL · DECISION PROTOCOL</div>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 30, fontWeight: 500, margin: 0, letterSpacing: '-0.015em', color: C.text }}>
              What happens next
            </h2>
            <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13.5, color: C.textDim, marginTop: 8, lineHeight: 1.5, maxWidth: 780 }}>
              The same 180 days of data. Two teams. Two sets of decisions. Two trajectories. The spread between these columns is not about intelligence — it is about <span style={{ color: C.teal }}>statistical literacy</span> embedded in the operating system.
            </div>
          </div>
          <button onClick={onClose}
            style={{ background: 'transparent', border: `1px solid ${C.border}`, color: C.textDim, fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, padding: '8px 14px', borderRadius: 4, cursor: 'pointer', letterSpacing: '0.1em' }}>
            ✕ CLOSE
          </button>
        </div>

        {/* Subheader delta summary */}
        <div style={{ marginTop: 24, marginBottom: 28, padding: '16px 20px', background: C.bgCard2, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.gold}`, borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: C.gold, marginBottom: 4 }}>SPREAD</div>
            <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, color: C.text, lineHeight: 1.5 }}>{log.deltaLabel}</div>
          </div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 32, color: C.gold, fontWeight: 500, letterSpacing: '-0.01em' }}>
            {fmtUSD(log.delta)}
          </div>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Column
            title="Executive Team"
            subtitle="Decisions made from the headline dashboard. Each action is reasonable given what leadership was shown."
            badge="◆ ACTUAL OUTCOME · TRAP VIEW"
            badgeColor={C.amber}
            entries={log.exec}
            totalLabel="EXEC TOTAL SPEND + LOSSES"
            total={log.execTotal}
            totalColor={C.brick}
            summary={log.execSummary}
          />
          <Column
            title="Analyst Team"
            subtitle="Decisions made from the stratified, distribution-aware view. Same data. Same time. Different interpretation."
            badge="✓ COUNTERFACTUAL · TRUTH VIEW"
            badgeColor={C.teal}
            entries={log.analyst}
            totalLabel="ANALYST NET INVESTMENT"
            total={log.analystTotal}
            totalColor={C.teal}
            summary={log.analystSummary}
          />
        </div>

        {/* Footer */}
        <div style={{ marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: C.textMuted, letterSpacing: '0.06em' }}>
          <div>PROTOCOL · Synthetic scenario · Illustrative of real patterns observed in consulting engagements</div>
          <a href="https://kharitonov.expert" target="_blank" rel="noopener noreferrer"
             style={{ color: C.amber, textDecoration: 'none', letterSpacing: '0.08em', borderBottom: `1px dotted ${C.amberDim}`, paddingBottom: 1 }}>
            BME EXPERT · kharitonov.expert ↗
          </a>
        </div>
      </div>
    </div>
  );
}
