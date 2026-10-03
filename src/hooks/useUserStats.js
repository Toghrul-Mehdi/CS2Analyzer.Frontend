import { useCallback, useEffect, useState } from 'react';
import { getUserStats } from '../api/statsApi';
import { getToken } from '../auth/tokenStorage';

const loadingState = { status: 'loading', data: null, error: null };

export function useUserStats(steamId) {
  const [state, setState] = useState(loadingState);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setState((previous) => (previous.status === 'loading' ? previous : loadingState));

    getUserStats(steamId, getToken(), controller.signal)
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error('İstifadəçi statistikası alınmadı:', error);
        setState({ status: 'error', data: null, error });
      });

    return () => controller.abort();
  }, [steamId, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  return { ...state, retry };
}