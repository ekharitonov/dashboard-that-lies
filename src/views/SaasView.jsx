import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart,
  ComposedChart, Scatter, ScatterChart, ZAxis, Cell, ReferenceArea
} from 'recharts';
import { DATA } from '../data.js';
import { C, fmt, axisProps, tooltipStyle } from '../design.js';
import { Card, KPI, TrapBox, ChartWithFlip } from '../components/Primitives.jsx';


// ================================================================
// SAAS
// ================================================================
export default function SaasView({ globalView }) {
  const k = DATA.exec_kpis.saas;
  const weekly = DATA.saas.weekly;

  const mrrDecomp = weekly.map(w => ({
    week: w.week,
    new_mrr: w.new_mrr_usd,
    expansion: w.expansion_mrr_usd,
    churned: -w.churned_mrr_usd,
    net: w.net_new_mrr_usd,
  }));

  const cohortChurn = weekly.map(w => ({
    week: w.week,
    old: w.gross_churn_old_cohorts_pct,
    new: w.gross_churn_new_cohorts_pct,
    blended: w.gross_churn_blended_pct,
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
        <KPI label="MRR" value={fmt.usd(k.mrr_current)} delta={+((k.mrr_current - k.mrr_start)/k.mrr_start*100).toFixed(1)} deltaLabel="vs start" bold />
        <KPI label="Net new MRR · total" value={fmt.usd(k.net_new_mrr_total)} caption="positive every quarter" />
        <KPI label="Gross churn" value={fmt.pct(k.gross_churn_blended, 1)} caption="company-wide, blended" />
        <KPI label="Trial → Paid" value={fmt.pct(k.trial_to_paid_avg, 1)} caption="180-day average" />
        <KPI label="Ticket resolution" value={fmt.hrs(k.ticket_avg, 1)} caption="average hours" />
        <KPI label="Billable utilization" value={fmt.pct(k.utilization_avg, 1)} caption="team average" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <ChartWithFlip
          globalView={globalView}
          title="MRR"
          subtitle="Monthly Recurring Revenue"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis tickFormatter={(v) => '$' + (v/1e6).toFixed(1) + 'M'} {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => '$' + Number(v).toLocaleString()} />
                  <Area type="monotone" dataKey="mrr_usd" stroke={C.teal} fill={C.teal} fillOpacity={0.15} strokeWidth={2} name="MRR" />
                </AreaChart>
              </ResponsiveContainer>
              {execReadout(<>MRR grew {fmt.usd(k.mrr_start)} → {fmt.usd(k.mrr_current)}. Up and to the right. Conclusion: <strong style={{color: C.teal}}>growth engine working</strong> — raise funding round at premium multiple.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={mrrDecomp} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis tickFormatter={(v) => '$' + Math.abs(v/1000).toFixed(0) + 'K'} {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => '$' + Number(v).toLocaleString()} />
                  <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: C.textDim }} />
                  <Bar dataKey="new_mrr" stackId="a" fill={C.teal} name="New" />
                  <Bar dataKey="expansion" stackId="a" fill={C.blue} name="Expansion" />
                  <Bar dataKey="churned" stackId="a" fill={C.brick} name="Churned" />
                  <Line type="monotone" dataKey="net" stroke={C.amber} strokeWidth={2} dot={false} name="Net new" />
                </ComposedChart>
              </ResponsiveContainer>
              <TrapBox
                title="Net new MRR hides structural churn acceleration"
                what={`180-day churned MRR: $${k.churned_mrr_total.toLocaleString()} — 98% of new MRR ($${k.new_mrr_total.toLocaleString()}). Only expansion keeps net positive. One major-account loss flips the sign.`}
                how="Headlining net new MRR without decomposing. Expansion from existing accounts masks that the new/churn engine is barely breaking even."
                fix="Report gross new, gross churned, gross expansion as three separate lines on every deck. Gross-new-to-gross-churned ratio — if it falls below 2x you're in trouble."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Gross Churn"
          subtitle="Monthly gross revenue churn"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={cohortChurn} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[0, 2.5]} {...axisProps} tickFormatter={(v)=>v+'%'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="blended" stroke={C.teal} strokeWidth={2} dot={{r:3, fill: C.teal}} name="Gross churn %" />
                  <ReferenceLine y={1.5} stroke={C.textMuted} strokeDasharray="3 3" label={{ value: 'best-in-class 1.5%', fill: C.textMuted, fontSize: 9, position: 'insideTopRight' }} />
                </LineChart>
              </ResponsiveContainer>
              {execReadout(<>Blended gross churn {k.gross_churn_blended}%/month — <strong style={{color: C.teal}}>below best-in-class 1.5%</strong>. Conclusion: retention strong, no action needed.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={cohortChurn} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[0, 3.5]} {...axisProps} tickFormatter={(v)=>v+'%'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: C.textDim }} />
                  <Line type="monotone" dataKey="old" stroke={C.teal} strokeWidth={2} dot={false} name="12+ mo cohorts (healthy)" />
                  <Line type="monotone" dataKey="new" stroke={C.brick} strokeWidth={2} dot={false} name="<6 mo cohorts (bleeding)" />
                  <Line type="monotone" dataKey="blended" stroke={C.amberDim} strokeWidth={1.2} strokeDasharray="4 4" dot={false} name="Blended (trap)" />
                </LineChart>
              </ResponsiveContainer>
              <TrapBox
                title="Cohort mixing hides PMF decay"
                what={`Blended ${k.gross_churn_blended}%/mo looks fine. Legacy cohorts churn ${k.gross_churn_old}%/mo — best-in-class. New cohorts churn ${k.gross_churn_new}%/mo — 29% annualized. Acquisition is buying customers who don't retain.`}
                how="Weighting by customer count where old customers dominate. The new-cohort issue is diluted to invisibility."
                fix="Report by cohort vintage always. Kaplan-Meier retention curves, not aggregated rates. If new-cohort churn > old-cohort for 3+ months, pause acquisition and dig into ICP drift or onboarding."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Ticket Resolution Time"
          subtitle="Support SLA tracking"
          renderExec={() => (
            <>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', padding: '32px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 52, color: C.text, fontWeight: 300 }}>{k.ticket_avg}<span style={{ fontSize: 22, color: C.textDim, marginLeft: 6 }}>hrs</span></div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 8, letterSpacing: '0.1em' }}>AVERAGE · 180 DAYS</div>
              </div>
              {execReadout(<>Trending high vs SLA target ≤4h. Conclusion: CS team overloaded — hire 3 more agents, expand to 24/7.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={DATA.saas.ticket_hist} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="bin" {...axisProps} angle={-20} textAnchor="end" height={50} />
                  <YAxis {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill={C.amber} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 8 }}>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>MEDIAN</div>
                  <div style={{ fontSize: 16, color: C.teal }}>{k.ticket_median}h</div>
                </div>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>MEAN</div>
                  <div style={{ fontSize: 16, color: C.amber }}>{k.ticket_avg}h</div>
                </div>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>P95</div>
                  <div style={{ fontSize: 16, color: C.brick }}>{k.ticket_p95}h</div>
                </div>
              </div>
              <TrapBox
                title="Mean on a mixture distribution"
                what="Mean is 2.7× median. 80%+ of tickets resolve under 1h — CS is fast. The real problem is 5% of tickets stuck waiting for engineering. Hiring CS doesn't fix it."
                how="Mixture (fast + slow + stuck) summarized with arithmetic mean. Escalation gap misdiagnosed as capacity gap."
                fix="Replace 'average resolution' with P50/P95. Pareto on P95 contributors — usually 10-15 ticket types drive all tail. Build an engineering escalation queue separate from CS."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Trial → Paid Conversion"
          subtitle="Weekly funnel signal"
          renderExec={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={DATA.saas.trial_weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[0, 60]} {...axisProps} tickFormatter={(v)=>v+'%'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="conversion" stroke={C.amber} strokeWidth={2} dot={{r:3, fill: C.amber}} name="Conv %" />
                </LineChart>
              </ResponsiveContainer>
              {execReadout(<>Highly volatile week-over-week. Drops at weeks 8 and 22. Conclusion: something is broken in the funnel — stand up growth war-room, A/B test onboarding every week.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={DATA.saas.trial_weekly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="week" tickFormatter={fmt.short} {...axisProps} />
                  <YAxis domain={[-5, 80]} {...axisProps} tickFormatter={(v)=>v+'%'} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="ci_high" stroke="none" fill={C.amber} fillOpacity={0.15} />
                  <Area type="monotone" dataKey="ci_low" stroke="none" fill={C.bg} fillOpacity={1} />
                  <Line type="monotone" dataKey="conversion" stroke={C.amber} strokeWidth={2} dot={{r:3, fill: C.amber}} name="Conv %" />
                  <Line type="monotone" dataKey="ci_high" stroke={C.amberDim} strokeWidth={0.8} strokeDasharray="3 3" dot={false} name="95% CI upper" />
                  <Line type="monotone" dataKey="ci_low" stroke={C.amberDim} strokeWidth={0.8} strokeDasharray="3 3" dot={false} name="95% CI lower" />
                </ComposedChart>
              </ResponsiveContainer>
              <TrapBox
                title="Small-sample percentages as a time series"
                what="~15 trials/week. 95% CI is ±25pp on weekly conversion. Any movement under that is sampling noise. The 'trend' discussed at every QBR is zero signal."
                how="Percentage metric with small denominator plotted as continuous measurement. A/B tests set up to chase ghosts."
                fix="Wilson score CIs on every percentage. Need ~300 trials/week for ±5pp precision. Roll up to monthly. p-chart with 3σ limits for ongoing monitoring."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Billable Utilization"
          subtitle="Team capacity metric"
          renderExec={() => (
            <>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', padding: '32px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 52, color: C.text, fontWeight: 300 }}>{k.utilization_avg}<span style={{ fontSize: 22, color: C.textDim, marginLeft: 6 }}>%</span></div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 8, letterSpacing: '0.1em' }}>TEAM AVERAGE · 180 DAYS</div>
              </div>
              {execReadout(<>Team average 78% — <strong style={{color: C.teal}}>right in the healthy zone</strong> (target 70-85%). Conclusion: capacity well-managed, no hiring needed.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={240}>
                <ScatterChart margin={{ top: 8, right: 16, left: 0, bottom: 10 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="person" {...axisProps} interval={0} angle={-60} textAnchor="end" height={70} tick={{ fill: C.textDim, fontSize: 7.5, fontFamily: 'IBM Plex Mono, monospace' }} />
                  <YAxis dataKey="utilization" {...axisProps} domain={[20, 130]} tickFormatter={(v)=>v+'%'} />
                  <ZAxis range={[55, 55]} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <ReferenceLine y={100} stroke={C.brick} strokeDasharray="3 3" label={{ value: '100% burnout', fill: C.brick, fontSize: 8, position: 'insideTopLeft' }} />
                  <ReferenceLine y={78} stroke={C.amber} strokeDasharray="3 3" label={{ value: 'avg 78%', fill: C.amber, fontSize: 8, position: 'insideTopRight' }} />
                  <ReferenceLine y={60} stroke={C.textMuted} strokeDasharray="3 3" label={{ value: 'bench', fill: C.textMuted, fontSize: 8, position: 'insideBottomLeft' }} />
                  <Scatter data={DATA.saas.utilization_individuals} fill={C.amber}>
                    {DATA.saas.utilization_individuals.map((x, i) => (
                      <Cell key={i} fill={x.utilization > 100 ? C.brick : x.utilization < 60 ? C.textMuted : x.role === 'Senior' ? C.plum : x.role === 'Mid' ? C.teal : C.blue} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <TrapBox
                title="Average utilization masks severe dispersion"
                what="Average 78% reads healthy. Per person: seniors 95-120% (burnout, attrition risk), juniors 40-60% (under-utilized, skills stagnating). Reassigning work captures capacity without hiring."
                how="Mean over bimodal distribution. Executives optimize team-level; lived experience is individual-level."
                fix="P10/P50/P90 of utilization, not mean. Per-person scatter. Role as grouping variable. Track σ as KPI — rising σ is a leading indicator of attrition."
              />
            </>
          )}
        />

        <ChartWithFlip
          globalView={globalView}
          title="Deal Size"
          subtitle="Sales pipeline average"
          renderExec={() => (
            <>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', padding: '32px 0', textAlign: 'center' }}>
                <div style={{ fontSize: 52, color: C.text, fontWeight: 300 }}>${Math.round(k.deal_size_avg).toLocaleString()}</div>
                <div style={{ fontSize: 11, color: C.textDim, marginTop: 8, letterSpacing: '0.1em' }}>AVG DEAL ARR · PIPELINE INPUT</div>
              </div>
              {execReadout(<>Avg deal ${Math.round(k.deal_size_avg).toLocaleString()} ARR. Conclusion: each AE should close ~$1.3M ARR/yr at 10 deals/mo target — <strong style={{color: C.teal}}>on track</strong>.</>)}
            </>
          )}
          renderAnalyst={() => (
            <>
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={DATA.saas.deal_hist} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke={C.border} strokeDasharray="2 4" />
                  <XAxis dataKey="bin" {...axisProps} angle={-25} textAnchor="end" height={55} />
                  <YAxis {...axisProps} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" fill={C.blue} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 8 }}>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>MEAN</div>
                  <div style={{ fontSize: 16, color: C.amber }}>${Math.round(k.deal_size_avg).toLocaleString()}</div>
                </div>
                <div style={{ padding: '8px 10px', background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 3, fontFamily: 'IBM Plex Mono, monospace' }}>
                  <div style={{ fontSize: 10, color: C.textDim }}>MEDIAN</div>
                  <div style={{ fontSize: 16, color: C.teal }}>${Math.round(k.deal_size_median).toLocaleString()}</div>
                </div>
              </div>
              <TrapBox
                title="Pipeline planning from mean deal size"
                what={`Mean $${Math.round(k.deal_size_avg).toLocaleString()}. Median $${Math.round(k.deal_size_median).toLocaleString()}. Two whales distort the mean. Reps hit 'AE quota' via one lucky deal, then miss for 2 quarters.`}
                how="Mean on heavy-tailed deal distribution used as planning input."
                fix="Bi-modal pipeline: 'normal deals' (median-based capacity) + 'strategic deals' (tracked individually with probability weights). Pareto: if top-5 deals > 30% of ARR, the plan is whale-dependent and fragile."
              />
            </>
          )}
        />
      </div>
    </div>
  );
}
