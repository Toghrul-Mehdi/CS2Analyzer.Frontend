import { formatDecimal, formatMoney, formatNumber, formatPercent } from '../../../lib/format';
import WeaponIcon from '../icons/WeaponIcon';
import { Card, Delta, Meter, RingGauge, SplitBar } from '../ui';

function outcome(match) {
  if (match.roundsWon > match.roundsLost) return { label: 'Qələbə', tone: 'green' };
  if (match.roundsWon < match.roundsLost) return { label: 'Məğlubiyyət', tone: 'red' };
  return { label: 'Heç-heçə', tone: 'gold' };
}

export default function LastMatchTab({ stats }) {
  const { lastMatch: match, overview, weapons } = stats;

  if (!match) {
    return (
      <Card title="Son oyun">
        <p className="empty">Steam son oyun haqqında məlumat qaytarmadı.</p>
      </Card>
    );
  }

  const result = outcome(match);
  const favorite = match.favoriteWeapon;
  const careerWeapon = favorite && weapons.find((weapon) => weapon.key === favorite.key);
  const sideTotal = match.tRoundWins + match.ctRoundWins;

  const figures = [
    {
      label: 'K/D',
      value: formatDecimal(match.killDeathRatio, 2),
      delta: <Delta value={match.killDeathRatio - overview.killDeathRatio} />,
    },
    {
      label: 'ADR',
      value: formatDecimal(match.averageDamagePerRound, 1),
      delta: <Delta value={match.averageDamagePerRound - overview.averageDamagePerRound} format={(v) => formatDecimal(v, 1)} />,
    },
    {
      label: 'Raund başına öldürmə',
      value: formatDecimal(match.kills / match.rounds, 2),
      delta: <Delta value={match.kills / match.rounds - overview.killsPerRound} />,
    },
    { label: 'Öldürmə', value: formatNumber(match.kills), tone: 'green' },
    { label: 'Ölüm', value: formatNumber(match.deaths), tone: 'red' },
    { label: 'MVP', value: formatNumber(match.mvps), tone: 'gold' },
    { label: 'Zərər', value: formatNumber(match.damage) },
    { label: 'Töhfə xalı', value: formatNumber(match.contributionScore) },
    { label: 'Xərclənən pul', value: formatMoney(match.moneySpent) },
  ];

  return (
    <div className="grid">
      <Card title="Nəticə" className="span-4">
        <p className="score score--lg">
          <span className={`tone-${result.tone}`}>{match.roundsWon}</span>
          <span className="score-sep">:</span>
          <span>{match.roundsLost}</span>
        </p>
        <p className={`badge badge--${result.tone}`}>{result.label}</p>
        <p className="muted-line">
          {formatNumber(match.rounds)} raund · {formatNumber(match.maxPlayers)} oyunçu
        </p>

        {sideTotal > 0 && (
          <div className="sides">
            <p className="sides-legend">
              <span className="tone-gold">T: {match.tRoundWins}</span>
              <span className="tone-blue">CT: {match.ctRoundWins}</span>
            </p>
            <span className="side-bar" aria-hidden="true">
              <span className="side-bar-t" style={{ width: `${(match.tRoundWins / sideTotal) * 100}%` }} />
            </span>
            <p className="sides-note">Hər tərəfin qazandığı raund sayı</p>
          </div>
        )}
      </Card>

      <Card title="Göstəricilər" className="span-8" aside={<span className="card-aside">karyera ortalaması ilə müqayisə</span>}>
        <dl className="figure-grid">
          {figures.map((figure) => (
            <div key={figure.label} className="figure">
              <dt>{figure.label}</dt>
              <dd className={figure.tone ? `tone-${figure.tone}` : undefined}>{figure.value}</dd>
              {figure.delta}
            </div>
          ))}
        </dl>
      </Card>

      {favorite && (
        <Card title="Ən çox istifadə olunan silah" className="span-8">
          <div className="favorite">
            <div className="favorite-art">
              <WeaponIcon weaponKey={favorite.key} className="favorite-icon" title={favorite.name} />
              <p className="favorite-name">{favorite.name}</p>
            </div>
            <dl className="figure-grid figure-grid--compact">
              <div className="figure">
                <dt>Öldürmə</dt>
                <dd className="tone-green">{formatNumber(favorite.kills)}</dd>
              </div>
              <div className="figure">
                <dt>Atəş</dt>
                <dd>{formatNumber(favorite.shots)}</dd>
              </div>
              <div className="figure">
                <dt>İsabət</dt>
                <dd>{formatNumber(favorite.hits)}</dd>
              </div>
            </dl>
          </div>
          {careerWeapon?.accuracy != null && (
            <div className="compare">
              <CompareRow label="Bu oyunda dəqiqlik" value={favorite.accuracy} />
              <CompareRow label="Karyera dəqiqliyi" value={careerWeapon.accuracy} muted />
            </div>
          )}
        </Card>
      )}

      <Card title="Dəqiqlik" className={favorite ? 'span-4' : 'span-12'}>
        {favorite ? (
          <RingGauge
            fraction={favorite.accuracy / 100}
            value={formatPercent(favorite.accuracy)}
            caption={`${favorite.hits} / ${favorite.shots}`}
            label={`${favorite.name} dəqiqliyi ${formatPercent(favorite.accuracy)}`}
          />
        ) : (
          <p className="empty">Silah məlumatı yoxdur.</p>
        )}
      </Card>

      <Card title="Raundlar" className="span-12">
        <SplitBar fraction={match.roundsWon / match.rounds} />
        <p className="split-legend">
          <span className="tone-green">{match.roundsWon} qazanılıb</span>
          <span className="tone-red">{match.roundsLost} uduzulub</span>
        </p>
      </Card>
    </div>
  );
}

function CompareRow({ label, value, muted }) {
  return (
    <div className="compare-row">
      <span className="compare-label">{label}</span>
      <Meter fraction={value / 100} tone={muted ? 'muted' : 'green'} />
      <span className="compare-value">{formatPercent(value)}</span>
    </div>
  );
}
