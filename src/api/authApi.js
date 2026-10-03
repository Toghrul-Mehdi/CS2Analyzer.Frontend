import { API_BASE_URL } from '../config';

/** Token etibarlıdırsa istifadəçini qaytarır, etibarsızdırsa null. */
export async function fetchCurrentUser(token, signal) {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    signal,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error(`Backend ${response.status} status kodu qaytardı.`);

  return response.json();
}