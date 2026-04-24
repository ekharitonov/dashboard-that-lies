import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart,
  ComposedChart, Scatter, ScatterChart, ZAxis, Cell, ReferenceArea
} from 'recharts';
import { DATA } from '../data.js';
import { C, fmt, axisProps, tooltipStyle } from '../design.js';
import { Card, KPI, TrapBox, ChartWithFlip } from '../components/Primitives.jsx';

// ================================================================
// MANUFACTURING
// ================================================================
export default function ManufacturingView({ globalView }) {
  const k = DATA.exec_kpis.manufacturing;
  const weekly = DATA.manufacturing.weekly;
  const otifDaily = DATA.manufacturing.otif_daily;
  const leadHist = DATA.manufacturing.lead_time_hist;
  const fpyDelta = +(k.fpy_q4 - k.fpy_q3).toFixed(2);
  const scrapDelta = +(k.scrap_q4 - k.scrap_q3).toFixed(2);
  const safetyDelta = k.safety_q4 - k.safety_q3;

  const fpyStratified = weekly.map(w => ({
    week: w.week,
    simple: w.fpy_simple_pct,
    standard: w.fpy_standard_pct,
    complex: w.fpy_complex_pct,
    aggregate: w.fpy_aggregate_pct,
    mix_complex: w.product_mix_complex * 100,
  }));

  const execReadout = (text) => (
    <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11.5, color: C.text, marginTop: 10, lineHeight: 1.55, padding: '10px 12px', background: 'rgba(212, 165, 116, 0.06)', borderLeft: `2px solid ${C.amberDim}`, borderRadius: 3 }}>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: C.amber, letterSpacing: '0.12em', marginRight: 8 }}>EXEC READOUT</span>
      {text}
    </div>
  );

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
        <KPI label="Revenue · Q3+Q4" value={fmt.usd(k.revenue_total)} delta={-16.8} deltaLabel="QoQ Q4 vs Q3" />
        <KPI label="First Pass Yield" value={fmt.pct(k.fpy_avg, 1)} delta={fpyDelta} deltaLabel="Q4 vs Q3" bold />
        <KPI label="OTIF · latest week" value={fmt.pct(k.otif_latest_week, 1)} delta={-0.2} deltaLabel="vs avg" />
        <KPI label="Avg Lead Time" value={k.lead_time_mean} unit="days" caption="customer-quoted" bold />
        <KPI label="Scrap rate" value={fmt.pct(k.scrap_avg, 2)} delta={scrapDelta} deltaLabel="Q4 vs Q3" />
        <KPI label="Safety incidents Q4" value={k.safety_q4} delta={safetyDelta} deltaLabel="Q4 vs Q3" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <ChartWithFlip
          globalView={globalView}
          title="First Pass Yield"
          subtitle="Weekly quality metric"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[94.5, 96.8]} {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="fpy_aggregate_pct" stroke={C.brick} strokeWidth={2} dot={false} name="FPY %" />
                </LineChart>
              </ResponsiveContainer>
              {execReadout(<>Q3 avg <strong style={{color: C.text}}>{k.fpy_q3}%</strong> → Q4 avg <strong style={{color: C.brick}}>{k.fpy_q4}%</strong>. Quality eroding. Conclusion: escalate to production floor, launch quality improvement project.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={fpyStratified} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis yAxisId="left" domain={[85, 100]} {...axisProps} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 50]} {...axisProps} tickFormatter={(v)=>v+'%'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: C.textDim }} />
                  <Line yAxisId="left" type="monotone" dataKey="simple" stroke={C.teal} strokeWidth={2} dot={false} name="Simple ↑" />
                  <Line yAxisId="left" type="monotone" dataKey="standard" stroke={C.blue} strokeWidth={2} dot={false} name="Standard ↑" />
                  <Line yAxisId="left" type="monotone" dataKey="complex" stroke={C.plum} strokeWidth={2} dot={false} name="Complex ↑" />
                  <Line yAxisId="left" type="monotone" dataKey="aggregate" stroke={C.brick} strokeWidth={1.2} strokeDasharray="4 4" dot={false} name="Aggregate (trap)" />
                  <Line yAxisId="right" type="monotone" dataKey="mix_complex" stroke={C.amber} strokeWidth={1.2} strokeDasharray="1 3" dot={false} name="Complex mix %" />
                </LineChart>
              </ResponsiveContainer>
              <TrapBox
                title="Simpson's Paradox · mix-driven aggregate"
                what="Simple +1.0pp, Standard +1.5pp, Complex +2.4pp — every product line improved. Aggregate falls because Complex mix grew 10% → 40%."
                how="Weighted average over a shifting product mix moves aggregate independently of underlying performance."
                fix="Stratify by SKU. Report weighted AND per-line. Cochran–Mantel–Haenszel for adjusted single-number comparisons."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="OTIF · delivery reliability"
          subtitle="On-Time-In-Full performance"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[80, 98]} {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="otif_pct" stroke={C.amber} strokeWidth={2} dot={{ r: 3, fill: C.amber }} name="OTIF %" />
                  <ReferenceLine y={95} stroke={C.teal} strokeDasharray="4 4" label={{ value: 'target 95%', fill: C.teal, fontSize: 10, position: 'insideTopRight' }} />
                </LineChart>
              </ResponsiveContainer>
              {execReadout(<>Multiple weeks below 95% target. Conclusion: logistics underperforming — switch carrier, add air-freight surcharge for at-risk orders.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={otifDaily} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="date" tickFormatter={(d) => d.slice(5,10)} interval={20} {...axisProps} />
                  <YAxis domain={[75, 105]} {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <ReferenceArea x1={otifDaily[118].date} x2={otifDaily[124].date} fill={C.brick} fillOpacity={0.12} />
                  <Line type="monotone" dataKey="otif" stroke={C.amber} strokeWidth={1.2} dot={false} name="OTIF daily" />
                  <ReferenceLine y={k.otif_mean} stroke={C.teal} strokeDasharray="4 4" label={{ value: `μ=${k.otif_mean}`, fill: C.teal, fontSize: 9, position: 'insideTopRight' }} />
                  <ReferenceLine y={k.otif_ucl} stroke={C.textMuted} strokeDasharray="2 4" label={{ value: `UCL=${k.otif_ucl}`, fill: C.textMuted, fontSize: 9, position: 'insideTopRight' }} />
                  <ReferenceLine y={k.otif_lcl} stroke={C.textMuted} strokeDasharray="2 4" label={{ value: `LCL=${k.otif_lcl}`, fill: C.textMuted, fontSize: 9, position: 'insideBottomRight' }} />
                </LineChart>
              </ResponsiveContainer>
              <TrapBox
                title="Common-cause variation mistaken for signal"
                what={`μ=${k.otif_mean}% with natural variation spanning ${k.otif_lcl}%–${k.otif_ucl}%. Only Oct 28–Nov 3 is a real special cause (6 consecutive days below μ−2σ, supplier B issue).`}
                how="Naked line chart. No control limits, no Nelson rules. Every dip looks actionable when it's within 3σ of the mean."
                fix="I-MR or p-chart with 3σ limits. Nelson rules. The 95% target is unreachable for this process — redesign or renegotiate specs."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Lead Time"
          subtitle="Order-to-ship duration"
          renderExec={() => (
            <>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', padding: '32px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 52, color: C.text, fontWeight: 300 }}>{k.lead_time_mean}<span style={{ fontSize: 22, color: C.textDim, marginLeft: 6 }}>days</span></div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 8, letterSpacing: '0.1em' }}>AVERAGE · 180 DAYS</div>
              </div>
              {execReadout(<>Quoted to customers as typical delivery. Industry benchmark ~10d. Conclusion: <strong style={{color: C.teal}}>we are slightly ahead of benchmark</strong>, competitive position strong.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={leadHist} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="bin" {...axisProps} angle={-20} textAnchor="end" height={50} />
                  <YAxis {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill={C.amber} name="count" />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 8 }}>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>MEDIAN</div>
                  <div style={{ fontSize: 16, color: C.teal }}>{k.lead_time_median}d</div>
                </div>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>MEAN</div>
                  <div style={{ fontSize: 16, color: C.amber }}>{k.lead_time_mean}d</div>
                </div>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>P95</div>
                  <div style={{ fontSize: 16, color: C.brick }}>{k.lead_time_p95}d</div>
                </div>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>MAX</div>
                  <div style={{ fontSize: 16, color: C.brick }}>{k.lead_time_max}d</div>
                </div>
              </div>
              <TrapBox
                title="Mean on a right-skewed distribution"
                what="Half of all orders ship in ≤7.5 days. Long tail drags mean up. P95 is 22 days — triple the median. The 10d quote fails on ~20% of Complex orders."
                how="Log-normal distribution summarized with arithmetic mean. Standard for queue-based metrics."
                fix="Report median + P95 together. Quote P80 or P90, not mean. Shapiro-Wilk or Q-Q plot to check distribution before choosing summary stat."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Safety incidents"
          subtitle="OSHA-recordable events by month"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={DATA.manufacturing.safety_monthly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="month" {...axisProps} />
                  <YAxis {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="safety_incidents" fill={C.brick} name="incidents" />
                </BarChart>
              </ResponsiveContainer>
              {execReadout(<>Aug peaked at 4 incidents. Sep dropped to 1 after safety intervention. Oct-Nov ticking back up. Conclusion: stand-down program worked, need to refresh it weekly.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={DATA.manufacturing.safety_monthly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="month" {...axisProps} />
                  <YAxis {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="safety_incidents" fill={C.amber} />
                </BarChart>
              </ResponsiveContainer>
              <TrapBox
                title="Poisson base-rate / small counts as trends"
                what="λ≈0.6/month. σ=√λ≈0.8. Any count from 0 to 4 is within natural variation. 'Aug 4 → Sep 1' is noise dressed as narrative."
                how="Rare-event counts treated as continuous measurements. Percentage-language applied to ±1 events."
                fix="c-chart with Poisson limits UCL=λ+3√λ. Switch to leading indicators (near-misses, observations) for actual signal. No conclusions from monthly counts under ~10."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Scrap rate"
          subtitle="Material waste per production run"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[1.5, 3.5]} {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="scrap_aggregate_pct" stroke={C.brick} strokeWidth={2} dot={false} name="Scrap %" />
                </LineChart>
              </ResponsiveContainer>
              {execReadout(<>Aggregate scrap Q3 {k.scrap_q3}% → Q4 {k.scrap_q4}%. Material discipline slipping. Conclusion: hold supervisors accountable, cut Q4 bonuses.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: C.textDim }} />
                  <Line type="monotone" dataKey="scrap_simple_pct" stroke={C.teal} strokeWidth={1.5} dot={false} name="Simple ↓" />
                  <Line type="monotone" dataKey="scrap_standard_pct" stroke={C.blue} strokeWidth={1.5} dot={false} name="Standard ↓" />
                  <Line type="monotone" dataKey="scrap_complex_pct" stroke={C.plum} strokeWidth={1.5} dot={false} name="Complex ↓" />
                  <Line type="monotone" dataKey="scrap_aggregate_pct" stroke={C.brick} strokeWidth={1.2} strokeDasharray="4 4" dot={false} name="Aggregate (trap)" />
                </LineChart>
              </ResponsiveContainer>
              <TrapBox
                title="Same Simpson's Paradox as FPY"
                what={`Aggregate ${k.scrap_q3}% → ${k.scrap_q4}%. But every product line: scrap is falling. Mix shift toward Complex (higher base scrap) makes aggregate look worse.`}
                how="Same mechanism as FPY — weighted average over shifting mix."
                fix="Stratify. Reward supervisors for per-line improvement. Invest in Complex-specific process capability — that is where the real opportunity sits."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Customer NPS"
          subtitle="Net Promoter Score — weekly"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={DATA.manufacturing.nps_weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[-20, 100]} {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="nps" stroke={C.amber} strokeWidth={2} dot={{ r: 3, fill: C.amber }} name="NPS" />
                </LineChart>
              </ResponsiveContainer>
              {execReadout(<>NPS highly volatile. Drops in weeks 8, 13, 21. Conclusion: customer experience shifting — stand up CX project, launch win-back campaign.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={DATA.manufacturing.nps_weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[-20, 100]} {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="ci_high" stroke="none" fill={C.amber} fillOpacity={0.12} />
                  <Area type="monotone" dataKey="ci_low" stroke="none" fill={C.bg} fillOpacity={1} />
                  <Line type="monotone" dataKey="nps" stroke={C.amber} strokeWidth={2} dot={{ r: 3, fill: C.amber }} name="NPS" />
                  <Line type="monotone" dataKey="ci_high" stroke={C.amberDim} strokeWidth={0.8} strokeDasharray="3 3" dot={false} name="95% CI upper" />
                  <Line type="monotone" dataKey="ci_low" stroke={C.amberDim} strokeWidth={0.8} strokeDasharray="3 3" dot={false} name="95% CI lower" />
                </ComposedChart>
              </ResponsiveContainer>
              <TrapBox
                title="Small-sample percentages plotted as trends"
                what={`${k.nps_responses_total} responses over 26 weeks ≈ 8/week. 95% CI is ±20 NPS points. The 'trend' is sampling noise, not sentiment.`}
                how="Weekly NPS with n≈8 treated as real signal. CI never shown. Any week-over-week movement is within sampling noise."
                fix="Wilson score CIs. Aggregate to monthly (n≥100 for ±10 NPS). Run sample-size calculators before committing to reporting cadence."
              />
            </>
          )}
        />
      </div>
    </div>
  );
}
