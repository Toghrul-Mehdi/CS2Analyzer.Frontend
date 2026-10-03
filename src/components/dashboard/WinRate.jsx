import { formatDecimal, formatNumber } from '../../lib/format';

export default function WinRate({ stats }) {
  const rate = stats?.winRatePercentage ?? 0;

  return (
    <>
      <div className="win-ring" style={{ '--value': rate }}>
        <span className="win-ring-value">{stats ? `${formatDecimal(rate, 1)}%` : '—'}</span>
      </div>
      <dl className="win-facts">
        <div>
          <dt>Oynanılan oyun</dt>
          <dd>{stats ? formatNumber(stats.totalMatchesPlayed) : '—'}</dd>
        </div>
        <div className="fact--blue">
          <dt>Qələbə</dt>
          <dd>{stats ? formatNumber(stats.totalMatchesWon) : '—'}</dd>
        </div>
      </dl>
    </>
  );
}