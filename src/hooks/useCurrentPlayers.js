import { useEffect, useState } from 'react';
import { getCurrentPlayers } from '../api/statsApi';
import { CURRENT_PLAYERS_REFRESH_MS } from '../config';

const initialState = { status: 'loading', playerCount: null, updatedAt: null };

export function useCurrentPlayers() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let controller = new AbortController();

    const load = async () => {
      controller.abort();
      controller = new AbortController();

      try {
        const { playerCount } = await getCurrentPlayers(controller.signal);
        setState({ status: 'success', playerCount, updatedAt: new Date() });
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error('Cari oyunçu sayı alınmadı:', error);
        // Əvvəlki dəyər varsa saxlayırıq, yalnız statusu dəyişirik.
        setState((previous) => ({ ...previous, status: 'error' }));
      }
    };

    load();
    const intervalId = setInterval(load, CURRENT_PLAYERS_REFRESH_MS);

    return () => {
      clearInterval(intervalId);
      controller.abort();
    };
  }, []);

  return state;
}