import { useRef, useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { useUserStats } from '../../hooks/useUserStats';
import { formatDecimal } from '../../lib/format';
import Header from '../Header';
import './dashboard.css';
import LastMatchTab from './tabs/LastMatchTab';
import MapsTab from './tabs/MapsTab';
import OverviewTab from './tabs/OverviewTab';
import WeaponsTab from './tabs/WeaponsTab';
import { SkeletonGrid } from './ui';

const TABS = [
  { id: 'overview', label: 'Statistika', Component: OverviewTab },
  { id: 'weapons', label: 'Silahlar', Component: WeaponsTab },
  { id: 'maps', label: 'Xəritələr', Component: MapsTab },
  { id: 'match', label: 'Son oyun', Component: LastMatchTab },
];

function describeError(error) {
  if (error?.status === 403) {
    return 'Steam profilin və ya oyun məlumatların gizlidir. Steam-də profilin "Game details" ayarını Public et və yenidən cəhd et.';
  }
  return 'Statistika hazırda alınmadı. Bir az sonra yenidən cəhd et.';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { status, data: stats, error, retry } = useUserStats(user.steamId);
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const tabRefs = useRef({});

  const active = TABS.find((tab) => tab.id === activeTab);

  // Ox düymələri ilə tablar arasında keçid (WAI-ARIA tabs nümunəsi)
  const onTabKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const index = TABS.findIndex((tab) => tab.id === activeTab);
    const next = TABS[(index + step + TABS.length) % TABS.length];
    setActiveTab(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <div className="dash">
      <Header variant="solid" />

      <main className="dash-main">
        <div className="dash-shell">
          <section className="dash-profile" aria-label="Profil">
            {user.avatarUrl && <img className="dash-avatar" src={user.avatarUrl} alt="" width="56" height="56" />}
            <div className="dash-identity">
              <h1 className="dash-name">{user.name}</h1>
              <p className="dash-steamid">SteamID {user.steamId}</p>
            </div>
            <div className="dash-chips">
              <span className="pill pill--brand">CS2</span>
              <span className="pill">Bütün rejimlər</span>
              {status === 'success' && (
                <span className="pill">{formatDecimal(stats.overview.playTimeHours, 0)} saat</span>
              )}
            </div>
          </section>

          <div className="tabs" role="tablist" aria-label="Statistika bölmələri">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[tab.id] = element;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={tab.id === activeTab}
                aria-controls={`panel-${tab.id}`}
                tabIndex={tab.id === activeTab ? 0 : -1}
                className={`tab${tab.id === activeTab ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={onTabKeyDown}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-panel" role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`}>
            {status === 'error' && (
              <div className="notice" role="alert">
                <p>{describeError(error)}</p>
                <button type="button" className="retry" onClick={retry}>
                  Yenidən cəhd et
                </button>
              </div>
            )}
            {status === 'loading' && <SkeletonGrid />}
            {status === 'success' && <active.Component stats={stats} onOpenTab={setActiveTab} />}
          </div>
        </div>
      </main>
    </div>
  );
}
