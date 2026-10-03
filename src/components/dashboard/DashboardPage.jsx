import { useAuth } from '../../auth/useAuth';
import Header from '../Header';
import BarList from './BarList';
import ChartPlaceholder from './ChartPlaceholder';
import LivePlayersCard from './LivePlayersCard';
import MatchesTable from './MatchesTable';
import Panel from './Panel';
import StatCard from './StatCard';

const KPI_CARDS = ['K/D nisbəti', 'Qazanma faizi', 'Headshot faizi', 'Oynanma vaxtı'];
const WEAPONS = ['AK-47', 'M4A1-S', 'AWP', 'Desert Eagle', 'USP-S'];
const MAPS = ['Dust II', 'Mirage', 'Inferno', 'Nuke', 'Ancient', 'Anubis'];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="dash">
      <Header variant="solid" />

      <main className="dash-main">
        <section className="dash-intro" aria-label="Profil">
          {user.avatarUrl && (
            <img className="dash-avatar" src={user.avatarUrl} alt="" width="72" height="72" />
          )}
          <div>
            <p className="dash-eyebrow">Counter-Strike 2</p>
            <h1 className="dash-title">{user.name}</h1>
            <p className="dash-sub">SteamID {user.steamId}</p>
          </div>
          <p className="dash-note">Statistikalar hazırlanır. Hazır olduqca bu səhifədə görünəcək.</p>
        </section>

        <section className="kpi-grid" aria-label="Ümumi göstəricilər">
          {KPI_CARDS.map((label) => (
            <StatCard key={label} label={label} />
          ))}
        </section>

        <div className="dash-grid">
          <Panel title="Performans" tag="Tezliklə" className="span-8">
            <ChartPlaceholder message="Zaman üzrə performans qrafiki üçün data gözlənilir." />
          </Panel>

          <Panel title="Hazırda oyunda" className="span-4">
            <LivePlayersCard />
          </Panel>

          <Panel title="Silahlar üzrə" tag="Tezliklə" className="span-6">
            <BarList rows={WEAPONS} />
          </Panel>

          <Panel title="Xəritələr üzrə" tag="Tezliklə" className="span-6">
            <BarList rows={MAPS} />
          </Panel>

          <Panel title="Son oyunlar" tag="Tezliklə" className="span-8">
            <MatchesTable />
          </Panel>

          <Panel title="Achievement-lər" tag="Tezliklə" className="span-4">
            <div className="ring" aria-hidden="true">—</div>
            <p className="panel-note">Açılmış və qalan achievement-lərin sayı burada göstəriləcək.</p>
          </Panel>
        </div>
      </main>
    </div>
  );
}