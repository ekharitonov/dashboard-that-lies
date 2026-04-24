# The Dashboard That Lies

An executive dashboard case study on statistical traps in operational reporting.

**Live demo:** [dashboard.kharitonov.expert](https://dashboard.kharitonov.expert)
**Author:** Eugene Kharitonov · [BME Expert](https://kharitonov.expert)

Three mid-size companies. 180 days of synthetic operational data. Every executive KPI hides a statistical trap — Simpson's paradox, common-cause variation treated as signal, mean reported on heavy-tailed distributions, small-sample percentages plotted as trends, Poisson counting errors. Toggle each chart into Analyst View to see the truth, the trap mechanics, and what it costs to miss them.

## Stack

- React 18
- Recharts 2
- Vite 5

## Local development

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## License

Dashboard code: MIT. Data is synthetic (seed 42, reproducible) — illustrative of patterns observed in real consulting engagements.
