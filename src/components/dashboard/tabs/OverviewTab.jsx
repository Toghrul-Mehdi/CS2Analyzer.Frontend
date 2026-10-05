import { formatCompact, formatDecimal, formatMoney, formatNumber, formatPercent } from '../../../lib/format';
import { categoryLabel } from '../../../lib/labels';
import LivePlayersCard from '../LivePlayersCard';
import MapBadge from '../icons/MapBadge';
import UiIcon from '../icons/UiIcon';
import WeaponIcon from '../icons/WeaponIcon';
import { Card, Meter, MetricCard, MiniPie, RingGauge, SplitBar, StatRows } from '../ui';

const TOP_LIST_SIZE = 4;
// Az atəşlə yüksək dəqiqlik təsadüfi ola bilər, ona görə "ən dəqiq" siyahısına minimum atəş şərti qoyulur.
const MIN_SHOTS_FOR_ACCURACY = 500;
// Bir neçə raundluq xəritə "ən uğurlu" siyahısını tutmasın.
const MIN_ROUNDS_FOR_SUCCESS = 50;
const FIREARM_CATEGORIES = ['pistol', 'smg', 'rifle', 'sniper', 'shotgun', 'heavy'];

export default function OverviewTab({ stats, onOpenTab }) {
  const { overview, combat, objectives, economy, gunGame, achievements, lastMatch } = stats;

  return (
    <div className="grid">
      <Card title="K/D" className="span-3 ring-card">
        <RingGauge
          fraction={overview.kills / Math.max(overview.kills + overview.deaths, 1)}
          value={formatDecimal(overview.killDeathRatio, 2)}
          caption={`${formatNumber(overview.kills)} / ${formatNumber(overview.deaths)}`}
          label={`K/D nisbəti ${formatDecimal(overview.killDeathRatio, 2)}`}
        />
      </Card>

      <Card title="Raund qələbəsi" className="span-3 ring-card">
        <RingGauge
          fraction={overview.roundWinRate / 100}
          value={formatPercent(overview.roundWinRate)}
          caption={`${formatNumber(overview.roundsWon)} / ${formatNumber(overview.roundsPlayed)}`}
          label={`Raundların ${formatPercent(overview.roundWinRate)} qazanılıb`}
        />
      </Card>

      <AccuracyCard combat={combat} categories={stats.weaponCategories} className="span-6" />

      <MetricCard
        title="Qələbə faizi"
        icon="trophy"
        className="span-3"
        value={formatDecimal(overview.matchWinRate, 1)}
        unit="%"
        fraction={overview.matchWinRate / 100}
        rows={[
          { label: 'Oynanılıb', value: formatNumber(overview.matchesPlayed) },
          { label: 'Qazanılıb', value: formatNumber(overview.matchesWon) },
        ]}
      />
      <MetricCard
        title="Headshot faizi"
        icon="target"
        className="span-3"
        value={formatDecimal(overview.headshotPercentage, 1)}
        unit="%"
        fraction={overview.headshotPercentage / 100}
        rows={[
          { label: 'Headshot', value: formatNumber(overview.headshotKills) },
          { label: 'Öldürmə', value: formatNumber(overview.kills) },
        ]}
      />
      <MetricCard
        title="ADR"
        icon="burst"
        className="span-3"
        value={formatDecimal(overview.averageDamagePerRound, 1)}
        rows={[
          { label: 'Ümumi zərər', value: formatNumber(overview.damageDone) },
          { label: 'Raund başına öldürmə', value: formatDecimal(overview.killsPerRound, 2) },
        ]}
      />
      <LastMatchPreview lastMatch={lastMatch} className="span-3" onOpen={() => onOpenTab('match')} />

      <TopWeaponsCard
        title="Ən çox öldürmə"
        className="span-3"
        weapons={stats.weapons.slice(0, TOP_LIST_SIZE)}
        metric={(weapon) => weapon.kills}
        display={(weapon) => formatNumber(weapon.kills)}
      />
      <TopWeaponsCard
        title="Ən dəqiq silahlar"
        className="span-3"
        weapons={stats.weapons
          .filter((weapon) => (weapon.shots ?? 0) >= MIN_SHOTS_FOR_ACCURACY)
          .sort((a, b) => b.accuracy - a.accuracy)
          .slice(0, TOP_LIST_SIZE)}
        metric={(weapon) => weapon.accuracy}
        display={(weapon) => formatPercent(weapon.accuracy)}
        scaleToMax={false}
      />
      <TopMapsCard
        title="Ən çox oynanan"
        className="span-3"
        maps={stats.maps.slice(0, TOP_LIST_SIZE)}
        display={(map) => formatNumber(map.roundsPlayed)}
        bar={(map, max) => <Meter fraction={map.roundsPlayed / max} />}
      />
      <TopMapsCard
        title="Ən uğurlu"
        className="span-3"
        maps={stats.maps
          .filter((map) => map.roundsPlayed >= MIN_ROUNDS_FOR_SUCCESS)
          .sort((a, b) => b.roundWinRate - a.roundWinRate)
          .slice(0, TOP_LIST_SIZE)}
        display={(map) => formatPercent(map.roundWinRate, 0)}
        bar={(map) => <SplitBar fraction={map.roundWinRate / 100} />}
      />

      <Card title="Obyektivlər" className="span-4">
        <div className="duo">
          <div className="duo-item">
            <UiIcon name="bomb" className="duo-icon tone-gold" />
            <p className="duo-value">{formatNumber(objectives.bombsPlanted)}</p>
            <p className="duo-label">Bomba qoyulub</p>
          </div>
          <div className="duo-item">
            <UiIcon name="shield" className="duo-icon tone-blue" />
            <p className="duo-value">{formatNumber(objectives.bombsDefused)}</p>
            <p className="duo-label">Bomba zərərsizləşdirilib</p>
          </div>
        </div>
        <StatRows
          rows={[
            { label: 'Raundların neçəsində bomba qoyub', value: formatPercent(objectives.plantRate) },
            { label: 'Raundların neçəsində zərərsizləşdirib', value: formatPercent(objectives.defuseRate) },
            { label: 'Qazanılan pistol raundu', value: formatNumber(objectives.pistolRoundsWon) },
            { label: 'Xilas edilən girov', value: formatNumber(objectives.hostagesRescued) },
          ]}
        />
      </Card>

      <Card title="İqtisadiyyat" className="span-4">
        <div className="metric-main">
          <UiIcon name="money" className="metric-icon tone-green" />
          <div className="metric-figure">
            <p className="metric-value" title={formatMoney(economy.moneyEarned)}>
              ${formatCompact(economy.moneyEarned)}
            </p>
            <p className="metric-caption">ümumi qazanılan pul</p>
          </div>
        </div>
        <StatRows
          rows={[
            { label: 'Raund başına', value: formatMoney(economy.moneyPerRound) },
            { label: 'Matç başına', value: formatMoney(economy.moneyPerMatch) },
            { label: 'Komandaya verilən silah', value: formatNumber(economy.weaponsDonated) },
          ]}
        />
      </Card>

      <Card title="Xüsusi öldürmələr" className="span-4">
        <ul className="icon-list">
          <IconRow icon="swap" label="Düşmən silahı ilə" value={combat.enemyWeaponKills} share={combat.enemyWeaponKillShare} />
          <IconRow icon="eye" label="Kor olmuş düşmənə" value={combat.blindedEnemyKills} share={combat.blindedEnemyKillShare} />
          <IconRow weapon="knife" label="Bıçaqla" value={combat.knifeKills} />
          <IconRow weapon="hegrenade" label="Qumbara ilə" value={combat.grenadeKills} />
          <IconRow weapon="taser" label="Zeus ilə" value={combat.zeusKills} />
        </ul>
      </Card>

      <Card title="Profil" className="span-8">
        <div className="tiles">
          <Tile icon="clock" label="Oynanma vaxtı" value={`${formatDecimal(overview.playTimeHours, 1)} saat`} />
          <Tile icon="star" label="MVP" value={formatNumber(overview.mvps)} />
          <Tile icon="layers" label="Töhfə xalı" value={formatNumber(overview.contributionScore)} />
          <Tile
            icon="crosshair"
            label="Arms Race raundları"
            value={`${formatNumber(gunGame.roundsWon)} / ${formatNumber(gunGame.roundsPlayed)}`}
          />
          <Tile icon="user" label="Oynanılan raund" value={formatNumber(overview.roundsPlayed)} />
          <Tile icon="medal" label="Achievement" value={formatNumber(achievements.unlocked)} />
        </div>
      </Card>

      <Card title="Hazırda oyunda" className="span-4">
        <LivePlayersCard />
      </Card>
    </div>
  );
}

function AccuracyCard({ combat, categories, className }) {
  const byCategory = new Map(categories.map((category) => [category.category, category]));
  const firearms = FIREARM_CATEGORIES.map((key) => byCategory.get(key)).filter((category) => category?.shots > 0);

  return (
    <Card title="Dəqiqlik" className={className}>
      <div className="headline">
        <span className="headline-label">Ümumi</span>
        <span className="headline-value">{formatPercent(combat.accuracy)}</span>
        <span className="headline-sub">
          {formatNumber(combat.trackedHits)} isabət / {formatNumber(combat.trackedShots)} atəş
        </span>
      </div>
      <ul className="pie-row">
        {firearms.map((category) => (
          <li key={category.category}>
            <span className="pie-label">{categoryLabel(category.category)}</span>
            <MiniPie fraction={category.accuracy / 100} />
            <span className="pie-value">{formatPercent(category.accuracy, 0)}</span>
            <span className="pie-sub">
              {formatCompact(category.hits)} / {formatCompact(category.shots)}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function LastMatchPreview({ lastMatch, className, onOpen }) {
  return (
    <Card
      title="Son oyun"
      className={className}
      aside={
        lastMatch && (
          <button type="button" className="link-button" onClick={onOpen}>
            Ətraflı
          </button>
        )
      }
    >
      {lastMatch ? (
        <>
          <p className="score">
            <span className={lastMatch.roundsWon > lastMatch.roundsLost ? 'tone-green' : 'tone-red'}>
              {lastMatch.roundsWon}
            </span>
            <span className="score-sep">:</span>
            <span>{lastMatch.roundsLost}</span>
          </p>
          <StatRows
            rows={[
              { label: 'Öldürmə / Ölüm', value: `${lastMatch.kills} / ${lastMatch.deaths}` },
              { label: 'K/D', value: formatDecimal(lastMatch.killDeathRatio, 2) },
              { label: 'MVP', value: formatNumber(lastMatch.mvps) },
            ]}
          />
        </>
      ) : (
        <p className="empty">Son oyun məlumatı yoxdur.</p>
      )}
    </Card>
  );
}

function TopWeaponsCard({ title, weapons, metric, display, scaleToMax = true, className }) {
  const max = scaleToMax ? Math.max(...weapons.map(metric), 1) : 100;

  return (
    <Card title={title} className={className}>
      {weapons.length === 0 ? (
        <p className="empty">Kifayət qədər məlumat yoxdur.</p>
      ) : (
        <ul className="rank-list">
          {weapons.map((weapon) => (
            <li key={weapon.key} title={weapon.name}>
              <WeaponIcon weaponKey={weapon.key} className="rank-weapon" />
              <span className="rank-name">{weapon.name}</span>
              <span className="rank-value">{display(weapon)}</span>
              <Meter fraction={metric(weapon) / max} className="rank-bar" />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function TopMapsCard({ title, maps, display, bar, className }) {
  const max = Math.max(...maps.map((map) => map.roundsPlayed), 1);

  return (
    <Card title={title} className={`maps-card ${className}`}>
      {maps.length === 0 ? (
        <p className="empty">Kifayət qədər məlumat yoxdur.</p>
      ) : (
        <ul className="rank-list">
          {maps.map((map) => (
            <li key={map.key}>
              <MapBadge mapKey={map.key} name={map.name} />
              <span className="rank-name">{map.key}</span>
              <span className="rank-value">{display(map)}</span>
              <span className="rank-bar">{bar(map, max)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function IconRow({ icon, weapon, label, value, share }) {
  return (
    <li>
      {weapon ? <WeaponIcon weaponKey={weapon} className="icon-list-weapon" /> : <UiIcon name={icon} />}
      <span className="icon-list-label">{label}</span>
      {share !== undefined && <span className="icon-list-share">{formatPercent(share)}</span>}
      <span className="icon-list-value">{formatNumber(value)}</span>
    </li>
  );
}

function Tile({ icon, label, value }) {
  return (
    <div className="tile">
      <UiIcon name={icon} className="tile-icon" />
      <div>
        <p className="tile-label">{label}</p>
        <p className="tile-value">{value}</p>
      </div>
    </div>
  );
}
