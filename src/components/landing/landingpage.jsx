import { STEAM_LOGIN_URL } from '../../config';
import Header from '../Header';
import BackgroundScene from './BackgroundScene';
import LivePlayersBadge from './LivePlayersBadge';

const POINTS = [
  { title: 'Ümumi göstəricilər', text: 'K/D, qazanma faizi və oynanma vaxtı bir baxışda.' },
  { title: 'Silah və xəritələr', text: 'Hansı silahda və xəritədə daha güclü olduğunu gör.' },
  { title: 'Achievement-lər', text: 'Açdığın və qalan nailiyyətlər bir yerdə.' },
];

export default function LandingPage() {
  return (
    <div className="landing">
      <BackgroundScene />
      <Header variant="overlay" />

      <main className="landing-main">
        <p className="eyebrow">Counter-Strike 2 statistikası</p>
        <h1 className="landing-title">Hər raundun arxasındakı rəqəmləri gör.</h1>
        <p className="landing-lead">
          Steam hesabınla daxil ol və öz oyun statistikanı bir yerdə izlə.
        </p>
        <a className="cta" href={STEAM_LOGIN_URL}>
          Steam ilə daxil ol
        </a>
        <LivePlayersBadge />
      </main>

      <div className="landing-footer">
        <ul className="landing-points">
          {POINTS.map((point, index) => (
            <li key={point.title}>
              <span className="point-number">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="point-title">{point.title}</h2>
              <p className="point-text">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}