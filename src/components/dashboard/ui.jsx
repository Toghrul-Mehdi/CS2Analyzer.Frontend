import UiIcon from './icons/UiIcon';

const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

export function Card({ title, aside, className = '', children }) {
  return (
    <section className={`card ${className}`}>
      {(title || aside) && (
        <header className="card-head">
          {title && <h3 className="card-title">{title}</h3>}
          {aside}
        </header>
      )}
      {children}
    </section>
  );
}

/**
 * Referans dizayndakı kimi yaşıl/qırmızı halqa: yaşıl hissə "fraction" qədərdir.
 * value — halqanın ortasındakı əsas rəqəm, caption — altındakı kiçik mətn.
 */
export function RingGauge({ fraction, value, caption, label }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const share = clamp01(fraction);
  const gap = share > 0 && share < 1 ? 4 : 0;
  const green = Math.max(share * circumference - gap, 0);
  const red = Math.max((1 - share) * circumference - gap, 0);

  return (
    <div className="ring-gauge" role="img" aria-label={label}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle className="ring-track" cx="60" cy="60" r={radius} />
        <circle
          className="ring-arc ring-arc--bad"
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={`${red} ${circumference}`}
          strokeDashoffset={-(share * circumference + gap / 2)}
        />
        <circle
          className="ring-arc ring-arc--good"
          cx="60"
          cy="60"
          r={radius}
          strokeDasharray={`${green} ${circumference}`}
          strokeDashoffset={-gap / 2}
        />
      </svg>
      <div className="ring-center">
        <span className="ring-value">{value}</span>
        {caption && <span className="ring-caption">{caption}</span>}
      </div>
    </div>
  );
}

/** Kiçik dairəvi diaqram (referansdakı 1v1…1v5 kimi). */
export function MiniPie({ fraction, tone = 'blue' }) {
  return (
    <span
      className={`mini-pie mini-pie--${tone}`}
      style={{ '--fill': `${clamp01(fraction) * 100}%` }}
      aria-hidden="true"
    />
  );
}

/** Üfüqi zolaq. fraction 0–1. */
export function Meter({ fraction, tone = 'blue', className = '' }) {
  return (
    <span className={`meter meter--${tone} ${className}`} aria-hidden="true">
      <span className="meter-fill" style={{ width: `${clamp01(fraction) * 100}%` }} />
    </span>
  );
}

/** Qələbə/məğlubiyyət kimi iki hissəli zolaq: yaşıl sol, qırmızı sağ. */
export function SplitBar({ fraction }) {
  const share = clamp01(fraction) * 100;
  return (
    <span className="split-bar" aria-hidden="true">
      <span className="split-bar-good" style={{ width: `${share}%` }} />
      <span className="split-bar-bad" style={{ width: `${100 - share}%` }} />
    </span>
  );
}

/** Referansdakı rəqəmin altındakı nazik xətt və sarı nöqtə. */
export function ScaleDot({ fraction }) {
  return (
    <span className="scale-dot" aria-hidden="true">
      <span className="scale-dot-mark" style={{ left: `${clamp01(fraction) * 100}%` }} />
    </span>
  );
}

/** İkon + böyük rəqəm + şkala + altda "ad / dəyər" sətirləri. */
export function MetricCard({ title, icon, value, unit, fraction, rows = [], className = '' }) {
  return (
    <Card title={title} className={`metric-card ${className}`}>
      <div className="metric-main">
        {icon && <UiIcon name={icon} className="metric-icon" />}
        <div className="metric-figure">
          <p className="metric-value">
            {value}
            {unit && <span className="metric-unit">{unit}</span>}
          </p>
          {fraction !== undefined && <ScaleDot fraction={fraction} />}
        </div>
      </div>
      <StatRows rows={rows} />
    </Card>
  );
}

export function StatRows({ rows, className = '' }) {
  if (rows.length === 0) return null;
  return (
    <dl className={`stat-rows ${className}`}>
      {rows.map((row) => (
        <div key={row.label} className="stat-row">
          <dt>{row.label}</dt>
          <dd className={row.tone ? `tone-${row.tone}` : undefined}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Karyera ortalaması ilə müqayisə: ▲ / ▼ və fərq. higherIsBetter=false olarsa rənglər tərsinə. */
export function Delta({ value, digits = 2, format, higherIsBetter = true }) {
  if (!Number.isFinite(value) || value === 0) return <span className="delta">=</span>;
  const good = higherIsBetter ? value > 0 : value < 0;
  const text = format ? format(Math.abs(value)) : Math.abs(value).toFixed(digits);
  return (
    <span className={`delta ${good ? 'delta--good' : 'delta--bad'}`}>
      {value > 0 ? '▲' : '▼'} {text}
    </span>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid" aria-busy="true" aria-label="Statistika yüklənir">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={`card skeleton ${index < 2 ? 'span-3' : index < 3 ? 'span-6' : 'span-3'}`} />
      ))}
    </div>
  );
}
