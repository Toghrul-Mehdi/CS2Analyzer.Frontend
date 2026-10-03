import { formatNumber } from '../../lib/format';
import { weaponLabel } from '../../lib/weaponNames';

/** Silahları öldürmə sayına görə düzür; zolağın uzunluğu ən yüksək dəyərə nisbətindədir. */
export default function WeaponBars({ weapons }) {
  const rows = Object.entries(weapons ?? {})
    .map(([key, kills]) => ({ key, label: weaponLabel(key), kills }))
    .sort((a, b) => b.kills - a.kills);

  if (rows.length === 0) {
    return <p className="panel-note">Silah statistikası mövcud deyil.</p>;
  }

  const maxKills = rows[0].kills || 1;

  return (
    <ul className="bar-list">
      {rows.map((row) => (
        <li key={row.key}>
          <span className="bar-label">{row.label}</span>
          <span className="bar-track" aria-hidden="true">
            <span className="bar-fill" style={{ width: `${(row.kills / maxKills) * 100}%` }} />
          </span>
          <span className="bar-value">{formatNumber(row.kills)}</span>
        </li>
      ))}
    </ul>
  );
}