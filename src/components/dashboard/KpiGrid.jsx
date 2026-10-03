import { formatDecimal, formatNumber } from '../../lib/format';
import StatCard from './StatCard';

const HOURS_PER_DAY = 24;

/** status: "loading" | "success" | "error". Data yoxdursa kartlar "—" göstərir. */
export default function KpiGrid({ status, stats }) {
  const ready = status === 'success' && stats;
  const hint = (text) => (ready ? text : status === 'loading' ? 'Yüklənir…' : '');

  return (
    <section className="kpi-grid" aria-label="Ümumi göstəricilər">
      <StatCard
        label="K/D nisbəti"
        tone="gold"
        value={ready ? formatDecimal(stats.killDeathRatio, 2) : undefined}
        hint={hint(`${formatNumber(stats?.totalKills ?? 0)} öldürmə, ${formatNumber(stats?.totalDeaths ?? 0)} ölüm`)}
      />
      <StatCard
        label="Qazanma faizi"
        tone="blue"
        value={ready ? formatDecimal(stats.winRatePercentage, 1) : undefined}
        unit={ready ? '%' : undefined}
        hint={hint(`${formatNumber(stats?.totalMatchesPlayed ?? 0)} oyun oynanılıb`)}
      />
      <StatCard
        label="Headshot faizi"
        tone="red"
        value={ready ? formatDecimal(stats.headshotPercentage, 1) : undefined}
        unit={ready ? '%' : undefined}
        hint={hint('Öldürmələr içində baş atışı')}
      />
      <StatCard
        label="Oynanma vaxtı"
        tone="steel"
        value={ready ? formatDecimal(stats.playTimeHours, 1) : undefined}
        unit={ready ? 'saat' : undefined}
        hint={hint(`≈ ${formatDecimal((stats?.playTimeHours ?? 0) / HOURS_PER_DAY, 1)} gün`)}
      />
    </section>
  );
}