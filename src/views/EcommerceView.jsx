import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart,
  ComposedChart, Scatter, ScatterChart, ZAxis, Cell, ReferenceArea
} from 'recharts';
import { DATA } from '../data.js';
import { C, fmt, axisProps, tooltipStyle } from '../design.js';
import { Card, KPI, TrapBox, ChartWithFlip } from '../components/Primitives.jsx';


// ================================================================
// E-COMMERCE
// ================================================================
export default function EcommerceView({ globalView }) {
  const k = DATA.exec_kpis.ecommerce;
  const quarters = DATA.ecommerce.conv_by_quarter;
  const weekly = DATA.ecommerce.weekly;
  const aovHist = DATA.ecommerce.aov_hist;
  const returnsCat = DATA.ecommerce.returns_by_category;
  const convDelta = +(k.conv_aggregate_q4 - k.conv_aggregate_q3).toFixed(2);
  const revDelta = ((k.revenue_q4 - k.revenue_q3) / k.revenue_q3 * 100).toFixed(1);

  const simpsonData = [
    { channel: 'Organic', q3: quarters[0].organic_conv, q4: quarters[1].organic_conv, mixQ3: quarters[0].mix_organic, mixQ4: quarters[1].mix_organic },
    { channel: 'Email',   q3: quarters[0].email_conv,   q4: quarters[1].email_conv,   mixQ3: quarters[0].mix_email,   mixQ4: quarters[1].mix_email },
    { channel: 'Social',  q3: quarters[0].social_conv,  q4: quarters[1].social_conv,  mixQ3: quarters[0].mix_social,  mixQ4: quarters[1].mix_social },
    { channel: 'Paid',    q3: quarters[0].paid_conv,    q4: quarters[1].paid_conv,    mixQ3: quarters[0].mix_paid,    mixQ4: quarters[1].mix_paid },
  ];

  const returnsData = [
    { category: 'Apparel', return: returnsCat.Apparel },
    { category: 'Electronics', return: returnsCat.Electronics },
    { category: 'Home', return: returnsCat.Home },
    { category: 'Aggregate', return: returnsCat.Aggregate },
  ];

  const execReadout = (text) => (
    <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11.5, color: C.text, marginTop: 10, lineHeight: 1.55, padding: '10px 12px', background: 'rgba(212, 165, 116, 0.06)', borderLeft: `2px solid ${C.amberDim}`, borderRadius: 3 }}>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: C.amber, letterSpacing: '0.12em', marginRight: 8 }}>EXEC READOUT</span>
      {text}
    </div>
  );

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
        <KPI label="Revenue · Q3+Q4" value={fmt.usd(k.revenue_total)} delta={+revDelta} deltaLabel="QoQ" />
        <KPI label="Conversion rate" value={fmt.pct(k.conv_aggregate_q4, 2)} delta={convDelta} deltaLabel="Q4 vs Q3" bold />
        <KPI label="AOV" value={fmt.usd(k.aov_mean)} caption="average order value" bold />
        <KPI label="Return rate" value={fmt.pct(k.return_aggregate, 1)} caption="all categories" />
        <KPI label="Blended CAC" value={fmt.usd(k.cac_blended)} caption="all paid channels" />
        <KPI label="Stock-out days" value={k.stock_outs_total} caption="Q3+Q4 total" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <ChartWithFlip
          globalView={globalView}
          title="Conversion Rate"
          subtitle="Site-wide CVR"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[2.4, 4.5]} {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <ReferenceLine x="2024-09-30" stroke={C.textMuted} strokeDasharray="2 4" label={{ value: 'Q4 starts', fill: C.textMuted, fontSize: 10, position: 'insideTopLeft' }} />
                  <Line type="monotone" dataKey="conv_aggregate_pct" stroke={C.brick} strokeWidth={2} dot={{r:3, fill: C.brick}} name="CVR %" />
                </LineChart>
              </ResponsiveContainer>
              {execReadout(<>Q3 avg <strong style={{color: C.text}}>{k.conv_aggregate_q3}%</strong> → Q4 avg <strong style={{color: C.brick}}>{k.conv_aggregate_q4}%</strong>. Conclusion: site UX broken — emergency checkout redesign, PDP rebuild.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={simpsonData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="channel" {...axisProps} />
                  <YAxis {...axisProps} tickFormatter={(v)=>v+'%'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: C.textDim }} />
                  <Bar dataKey="q3" fill={C.tealDim} name="Q3 CVR %" />
                  <Bar dataKey="q4" fill={C.teal} name="Q4 CVR %" />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: 10, padding: '10px 12px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, color: C.textDim }}>
                <div style={{ marginBottom: 6, color: C.amber, letterSpacing: '0.1em' }}>TRAFFIC MIX SHIFT Q3 → Q4</div>
                {simpsonData.map(r => (
                  <div key={r.channel} style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
                    <span style={{ width: 70 }}>{r.channel}</span>
                    <span style={{ color: C.text, width: 38 }}>{r.mixQ3}%</span>
                    <span>→</span>
                    <span style={{ color: r.channel === 'Paid' ? C.brick : C.teal, width: 38 }}>{r.mixQ4}%</span>
                  </div>
                ))}
              </div>
              <TrapBox
                title="Simpson's Paradox via channel mix"
                what={`Aggregate ${k.conv_aggregate_q3}% → ${k.conv_aggregate_q4}%. Organic +0.5pp, Paid +0.25pp, Email +0.4pp, Social +0.3pp — every channel rose. Paid grew 25%→45% of traffic and has the lowest CVR.`}
                how="Weighted average over shifted channel mix. Nothing broke in the funnel."
                fix="Stratify funnel metrics by source always. Report channel-level first, aggregate last. The causal question is: why did Paid volume grow so much?"
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Average Order Value"
          subtitle="Revenue-per-order input for LTV model"
          renderExec={() => (
            <>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', padding: '32px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 52, color: C.text, fontWeight: 300 }}>${k.aov_mean.toFixed(0)}</div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 8, letterSpacing: '0.1em' }}>AVERAGE · 180 DAYS</div>
              </div>
              {execReadout(<>AOV ${k.aov_mean.toFixed(0)} feeds LTV model. Conclusion: <strong style={{color: C.teal}}>solid per-order value</strong> — raise paid bid ceilings to match projected LTV.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={aovHist} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="bin" {...axisProps} angle={-25} textAnchor="end" height={55} />
                  <YAxis {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill={C.amber} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8 }}>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>MEDIAN</div>
                  <div style={{ fontSize: 16, color: C.teal }}>${k.aov_median}</div>
                </div>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>MEAN</div>
                  <div style={{ fontSize: 16, color: C.amber }}>${k.aov_mean.toFixed(0)}</div>
                </div>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>P95</div>
                  <div style={{ fontSize: 16, color: C.brick }}>${k.aov_p95.toFixed(0)}</div>
                </div>
              </div>
              <TrapBox
                title="Mean AOV on log-normal distribution"
                what={`Mean $${k.aov_mean.toFixed(0)} vs median $${k.aov_median}. LTV models built on mean overstate per-customer value by ~13%. Bid ceilings raised on inflated LTV lose money.`}
                how="Log-normal AOV. BFCM bulk + B2B purchases pull mean up."
                fix="Median for unit economics. Segment B2C vs B2B (different distributions). Check distribution shape before picking a summary statistic."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Return Rate"
          subtitle="Returns as % of shipments"
          renderExec={() => (
            <>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', padding: '32px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 52, color: C.text, fontWeight: 300 }}>{k.return_aggregate}<span style={{ fontSize: 20, color: C.textDim, marginLeft: 6 }}>%</span></div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 8, letterSpacing: '0.1em' }}>COMPANY-WIDE · 180 DAYS</div>
              </div>
              {execReadout(<>Industry benchmark 10-15%. We're under. Conclusion: <strong style={{color: C.teal}}>healthy — no action needed</strong>, reallocate attention to acquisition.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={returnsData} layout="vertical" margin={{ top: 8, right: 16, left: 20, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" horizontal={false} />
                  <XAxis type="number" {...axisProps} tickFormatter={(v)=>v+'%'} />
                  <YAxis dataKey="category" type="category" {...axisProps} width={80} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="return" fill={C.amber}>
                    {returnsData.map((e, i) => (
                      <Cell key={i} fill={e.category === 'Apparel' ? C.brick : e.category === 'Aggregate' ? C.amberDim : C.teal} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <TrapBox
                title="Aggregation hides a category in crisis"
                what={`Aggregate ${returnsCat.Aggregate}% looks fine. Electronics ${returnsCat.Electronics}%, Home ${returnsCat.Home}%, Apparel ${returnsCat.Apparel}% — a supplier/sizing crisis hidden inside the average.`}
                how="Weighting by revenue share masks a high-return category."
                fix="Pareto decomposition. Stratify quality/returns always. SPC per category. Alerts on P90 per segment, not aggregate."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Customer Acquisition Cost"
          subtitle="Paid marketing efficiency"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="cac_blended_usd" stroke={C.amber} strokeWidth={2} dot={false} name="CAC $" />
                </LineChart>
              </ResponsiveContainer>
              {execReadout(<>Blended CAC ${k.cac_blended} vs AOV ${k.aov_mean.toFixed(0)}. Conclusion: <strong style={{color: C.teal}}>healthy economics</strong>, scale Paid spend for BFCM.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 20, marginBottom: 12 }}>
                {[
                  { label: 'EMAIL', cac: k.cac_email, color: C.teal, payback: 'strong · pays in 1 order' },
                  { label: 'SOCIAL', cac: 28, color: C.blue, payback: 'ok' },
                  { label: 'PAID', cac: k.cac_paid, color: C.brick, payback: 'underwater day-1' },
                  { label: 'BLENDED', cac: k.cac_blended, color: C.amberDim, payback: 'average of unlike' },
                ].map(x => (
                  <div key={x.label} style={{ padding: '12px 12px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3 }}>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: C.textDim }}>{x.label}</div>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 22, color: x.color, marginTop: 4 }}>${x.cac.toFixed(0)}</div>
                    <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 10, color: C.textDim, marginTop: 4, lineHeight: 1.35 }}>{x.payback}</div>
                  </div>
                ))}
              </div>
              <TrapBox
                title="Weighted averages across dissimilar populations"
                what={`Blended CAC $${k.cac_blended} vs median AOV $${k.aov_median}. Email pays back in 1 order. Paid needs ~2.4 repeat orders at 44% margin — underwater on day-1. Growing Paid mix makes P&L worse, not better.`}
                how="Volume-weighted blended CAC hides that Paid is a loss leader."
                fix="Never use blended CAC for decisions. CAC payback period per channel. Decisions happen at channel level — stop aggregating."
              />
            </>
          )}
        />
      </div>
    </div>
  );
}
