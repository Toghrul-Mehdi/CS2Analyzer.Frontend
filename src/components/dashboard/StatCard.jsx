export default function StatCard({ label, value = '—', hint = 'Tezliklə' }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      <p className="stat-hint">{hint}</p>
    </div>
  );
}