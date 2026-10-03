export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7036';

export const STEAM_LOGIN_URL = `${API_BASE_URL}/api/auth/steam/login`;

export const CURRENT_PLAYERS_REFRESH_MS = 30_000;

// Fayl public/videos/ qovluğuna qoyulur. Fayl yoxdursa animasiyalı fon göstərilir.
export const BACKGROUND_VIDEO_SRC = '/videos/cs-background.mp4';