export default function ChartPlaceholder({ message }) {
  return (
    <div className="chart-empty">
      <p className="chart-empty-message">{message}</p>
    </div>
  );
}