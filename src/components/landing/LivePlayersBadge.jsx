import { useCurrentPlayers } from '../../hooks/useCurrentPlayers';
import { formatNumber } from '../../lib/format';

export default function LivePlayersBadge() {
  const { status, playerCount } = useCurrentPlayers();
  const hasValue = playerCount !== null;

  return (
    <p className="live-badge" aria-live="polite">
      <span className="live-dot" aria-hidden="true" />
      {hasValue && (
        <span>
          <strong>{formatNumber(playerCount)}</strong> oyunçu hazırda CS2-dədir
        </span>
      )}
      {!hasValue && status === 'error' && <span>Canlı oyunçu sayı hazırda alınmır</span>}
      {!hasValue && status === 'loading' && <span>Canlı oyunçu sayı yüklənir…</span>}
    </p>
  );
}