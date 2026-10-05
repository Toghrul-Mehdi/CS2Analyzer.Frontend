import { formatNumber, formatPercent } from '../../../lib/format';
import { mapModeLabel } from '../../../lib/labels';
import MapBadge, { MapBanner } from '../icons/MapBadge';
import { Card, SplitBar, StatRows } from '../ui';

const MIN_ROUNDS_FOR_RANKING = 50;

export default function MapsTab({ stats }) {
  const { maps } = stats;

  if (maps.length === 0) {
    return (
      <Card title="Xəritələr">
        <p className="empty">Xəritə statistikası tapılmadı.</p>
      </Card>
    );
  }

  const totalRounds = maps.reduce((sum, map) => sum + map.roundsPlayed, 0);
  const ranked = maps.filter((map) => map.roundsPlayed >= MIN_ROUNDS_FOR_RANKING);
  const best = ranked.reduce((top, map) => (!top || map.roundWinRate > top.roundWinRate ? map : top), null);
  const worst = ranked.reduce((low, map) => (!low || map.roundWinRate < low.roundWinRate ? map : low), null);

  return (
    <div className="grid">
      <Card className="span-12">
        <div className="summary-strip">
          <Summary label="Xəritə sayı" value={formatNumber(maps.length)} />
          <Summary label="Xəritələrdə raund" value={formatNumber(totalRounds)} />
          <Summary label="Ən çox oynanan" map={maps[0]} value={`${formatNumber(maps[0].roundsPlayed)} raund`} />
          {best && <Summary label="Ən yüksək qələbə" map={best} value={formatPercent(best.roundWinRate)} tone="green" />}
          {worst && worst !== best && (
            <Summary label="Ən aşağı qələbə" map={worst} value={formatPercent(worst.roundWinRate)} tone="red" />
          )}
        </div>
      </Card>

      {maps.map((map) => (
        <section key={map.key} className="card map-card span-4">
          <MapBanner mapKey={map.key}>
            <MapBadge mapKey={map.key} name={map.name} size="lg" />
            <div>
              <h3 className="map-name">{map.name}</h3>
              <p className="map-meta">
                {map.key} · {mapModeLabel(map.mode)}
              </p>
            </div>
          </MapBanner>

          <div className="map-body">
            <div className="map-rate">
              <span className={`map-rate-value ${map.roundWinRate >= 50 ? 'tone-green' : 'tone-red'}`}>
                {formatPercent(map.roundWinRate)}
              </span>
              <span className="map-rate-label">raund qələbəsi</span>
            </div>
            <SplitBar fraction={map.roundWinRate / 100} />
            <p className="split-legend">
              <span className="tone-green">{formatNumber(map.roundsWon)} qələbə</span>
              <span className="tone-red">{formatNumber(map.roundsLost)} məğlubiyyət</span>
            </p>
            <StatRows
              rows={[
                { label: 'Oynanılan raund', value: formatNumber(map.roundsPlayed) },
                { label: 'Raund payı', value: formatPercent(map.roundShare) },
                ...(map.matchesWon != null ? [{ label: 'Qazanılan matç', value: formatNumber(map.matchesWon) }] : []),
              ]}
            />
          </div>
        </section>
      ))}

      <p className="footnote span-12">
        Steam xəritələr üzrə yalnız raund sayını saxlayır, ona görə qələbə faizi raund əsasında hesablanır.
        "Ən yüksək / aşağı" üçün ən azı {MIN_ROUNDS_FOR_RANKING} raund oynanılmış xəritələr nəzərə alınır.
      </p>
    </div>
  );
}

function Summary({ label, value, map, tone }) {
  return (
    <div className="summary">
      <p className="summary-label">{label}</p>
      <p className="summary-value">
        {map && <MapBadge mapKey={map.key} name={map.name} />}
        {map && <span className="summary-map">{map.name}</span>}
        <span className={tone ? `tone-${tone}` : undefined}>{value}</span>
      </p>
    </div>
  );
}
