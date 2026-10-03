/** tone: "gold" | "blue" | "red" | "steel" (kartın üst xətti və rəqəmin rəngi). */
export default function StatCard({ label, value = '—', unit, hint, tone = 'steel' }) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">
        {value}
        {unit && <span className="stat-unit">{unit}</span>}
      </p>
      {hint && <p className="stat-hint">{hint}</p>}
    </div>
  );
}