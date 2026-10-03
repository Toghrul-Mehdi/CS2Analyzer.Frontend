import { API_BASE_URL } from '../config';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Backend cavabını bir formata gətirir. Cavab formatı dəyişərsə,
 * yalnız bu funksiyanı düzəltmək kifayətdir.
 */
function readPlayerCount(payload) {
  if (typeof payload === 'number') return payload;

  const value = payload?.playerCount ?? payload?.player_count;
  if (typeof value === 'number') return value;

  throw new ApiError('Backend cavabında oyunçu sayı tapılmadı.', 200);
}

export async function getCurrentPlayers(signal) {
  const response = await fetch(`${API_BASE_URL}/api/Stats/current-players`, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new ApiError(`Backend ${response.status} status kodu qaytardı.`, response.status);
  }

  const payload = await response.json();
  return { playerCount: readPlayerCount(payload) };
}

/** Daxil olmuş istifadəçinin CS2 statistikası. */
export async function getUserStats(steamId, token, signal) {
  const headers = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/api/Stats/user/${encodeURIComponent(steamId)}`, {
    signal,
    headers,
  });

  if (!response.ok) {
    throw new ApiError(`Backend ${response.status} status kodu qaytardı.`, response.status);
  }

  return response.json();
}