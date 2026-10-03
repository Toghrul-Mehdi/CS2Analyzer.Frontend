import { formatDecimal, formatNumber } from '../../lib/format';

/** Ölüm sayı 0-dırsa K/D öldürmə sayına bərabər götürülür. */
const killDeathRatio = (kills, deaths) => (deaths === 0 ? kills : kills / deaths);

export default function LastMatch({ status, lastMatch }) {
  if (status === 'success' && !lastMatch) {
    return <p className="panel-note">Son oyun məlumatı mövcud deyil.</p>;
  }

  const match = status === 'success' ? lastMatch : null;
  const show = (getValue) => (match ? getValue(match) : '—');

  const items = [
    { label: 'Öldürmə', tone: 'gold', value: show((m) => formatNumber(m.kills)) },
    { label: 'Ölüm', tone: 'red', value: show((m) => formatNumber(m.deaths)) },
    { label: 'K/D', tone: 'blue', value: show((m) => formatDecimal(killDeathRatio(m.kills, m.deaths), 2)) },
    { label: 'MVP', value: show((m) => formatNumber(m.mvps)) },
    { label: 'Zərər', value: show((m) => formatNumber(m.damage)) },
  ];

  return (
    <>
      <dl className="match-stats">
        {items.map((item) => (
          <div key={item.label} className={`match-stat${item.tone ? ` match-stat--${item.tone}` : ''}`}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="panel-note">Bu oyun üzrə K/D öldürmə və ölüm saylarından hesablanıb.</p>
    </>
  );
}