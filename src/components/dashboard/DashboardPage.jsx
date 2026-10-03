import { useAuth } from '../../auth/useAuth';
import { useUserStats } from '../../hooks/useUserStats';
import Header from '../Header';
import BarList from './BarList';
import KpiGrid from './KpiGrid';
import LastMatch from './LastMatch';
import LivePlayersCard from './LivePlayersCard';
import Panel from './Panel';
import WeaponBars from './WeaponBars';
import WinRate from './WinRate';

const WEAPON_PLACEHOLDERS = ['AK-47', 'M4A1', 'AWP'];
const MAP_PLACEHOLDERS = ['Dust II', 'Mirage', 'Inferno', 'Nuke', 'Ancient', 'Anubis'];

function describeError(error) {
  if (error?.status === 403) {
    return 'Steam profilin və ya oyun məlumatların gizlidir. Steam-də profilin "Game details" ayarını Public et və yenidən cəhd et.';
  }
  return 'Statistika hazırda alınmadı. Bir az sonra yenidən cəhd et.';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { status, data: stats, error, retry } = useUserStats(user.steamId);
  const ready = status === 'success';

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
        </section>

        {status === 'error' && (
          <div className="notice" role="alert">
            <p>{describeError(error)}</p>
            <button type="button" className="retry" onClick={retry}>
              Yenidən cəhd et
            </button>
          </div>
        )}

        <KpiGrid status={status} stats={stats} />

        <div className="dash-grid">
          <Panel title="Silahlar üzrə öldürmələr" tone="gold" className="span-8">
            {ready ? <WeaponBars weapons={stats.topWeaponsByKills} /> : <BarList rows={WEAPON_PLACEHOLDERS} />}
          </Panel>

          <Panel title="Oyunlar" tone="blue" className="span-4">
            <WinRate stats={ready ? stats : null} />
          </Panel>

          <Panel title="Son oyun" tone="red" className="span-8">
            <LastMatch status={status} lastMatch={stats?.lastMatch} />
          </Panel>

          <Panel title="Hazırda oyunda" tone="green" className="span-4">
            <LivePlayersCard />
          </Panel>

          <Panel title="Xəritələr üzrə" tag="Tezliklə" className="span-6">
            <BarList rows={MAP_PLACEHOLDERS} />
          </Panel>

          <Panel title="Achievement-lər" tag="Tezliklə" className="span-6">
            <div className="ring" aria-hidden="true">—</div>
            <p className="panel-note">Açılmış və qalan achievement-lərin sayı burada göstəriləcək.</p>
          </Panel>
        </div>
      </main>
    </div>
  );
}