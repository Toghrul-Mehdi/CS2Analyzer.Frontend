import { CURRENT_PLAYERS_REFRESH_MS } from '../../config';
import { useCurrentPlayers } from '../../hooks/useCurrentPlayers';
import { formatNumber, formatTime } from '../../lib/format';

export default function LivePlayersCard() {
  const { status, playerCount, updatedAt } = useCurrentPlayers();
  const hasValue = playerCount !== null;
  const refreshSeconds = CURRENT_PLAYERS_REFRESH_MS / 1000;

  return (
    <div>
      <p className="live-number" aria-live="polite">
        {hasValue ? formatNumber(playerCount) : '–'}
      </p>
      <p className="live-caption">oyunçu hazırda Counter-Strike 2-dədir</p>

      <p className={`live-status${status === 'error' ? ' is-error' : ''}`}>
        {status === 'loading' && 'Məlumat yüklənir…'}
        {status === 'success' && (
          <>
            <span className="live-dot" aria-hidden="true" />
            Son yenilənmə {formatTime(updatedAt)}, hər {refreshSeconds} saniyədən bir
          </>
        )}
        {status === 'error' &&
          (hasValue ? 'Yeni rəqəm alınmadı, göstərilən dəyər köhnə ola bilər.' : 'Oyunçu sayı alınmadı.')}
      </p>
    </div>
  );
}