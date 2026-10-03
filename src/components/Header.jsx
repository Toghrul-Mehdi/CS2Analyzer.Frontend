import { useAuth } from '../auth/useAuth';
import { STEAM_LOGIN_URL } from '../config';

/** variant: "overlay" (video üstündə, şəffaf) və ya "solid" (daxil olduqdan sonra). */
export default function Header({ variant = 'solid' }) {
  const { status, user, signOut } = useAuth();

  return (
    <header className={`header header--${variant}`}>
      <a className="brand" href="/" aria-label="CS2 Analyzer ana səhifə">
        <span className="brand-mark">CS2</span> Analyzer
      </a>

      {status === 'ready' &&
        (user ? (
          <div className="user-menu">
            {user.avatarUrl && <img className="avatar" src={user.avatarUrl} alt="" width="32" height="32" />}
            <span className="user-name">{user.name}</span>
            <button type="button" className="logout" onClick={signOut}>
              Çıxış
            </button>
          </div>
        ) : (
          <a className="steam-login" href={STEAM_LOGIN_URL}>
            Steam ilə daxil ol
          </a>
        ))}
    </header>
  );
}