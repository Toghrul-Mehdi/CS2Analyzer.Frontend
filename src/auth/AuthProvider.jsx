import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCurrentUser } from '../api/authApi';
import { AuthContext } from './AuthContext';
import { clearToken, getToken, setToken } from './tokenStorage';

const TOKEN_HASH_PARAM = 'token';

function readTokenFromHash() {
  return new URLSearchParams(window.location.hash.slice(1)).get(TOKEN_HASH_PARAM);
}

/** Steam-dən qayıdanda backend tokeni URL-in #token=... hissəsində göndərir. */
function consumeTokenFromUrl() {
  const token = readTokenFromHash();
  if (!token) return;

  setToken(token);
  // Token ünvan çubuğunda və brauzer tarixçəsində qalmasın.
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}

// Token varsa istifadəçi yoxlanana qədər "loading" göstərilir ki, səhifə yanlış-yanlış yanıb-sönməsin.
function getInitialState() {
  const hasToken = Boolean(getToken() || readTokenFromHash());
  return { status: hasToken ? 'loading' : 'ready', user: null };
}

export default function AuthProvider({ children }) {
  const [state, setState] = useState(getInitialState);

  useEffect(() => {
    consumeTokenFromUrl();

    const token = getToken();
    if (!token) return undefined;

    const controller = new AbortController();

    fetchCurrentUser(token, controller.signal)
      .then((user) => {
        if (!user) clearToken(); // vaxtı bitmiş və ya etibarsız token
        setState({ status: 'ready', user });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error('İstifadəçi məlumatı alınmadı:', error);
        setState({ status: 'ready', user: null });
      });

    return () => controller.abort();
  }, []);

  const signOut = useCallback(() => {
    clearToken();
    setState({ status: 'ready', user: null });
  }, []);

  const value = useMemo(() => ({ ...state, signOut }), [state, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}