import { mapArt, mapInitials } from '../../../lib/mapArt';

/** size: "sm" (siyahılarda) | "lg" (xəritə kartının başlığında). */
export default function MapBadge({ mapKey, name, size = 'sm' }) {
  const { path, colors } = mapArt(mapKey);

  return (
    <span
      className={`map-badge map-badge--${size}`}
      style={{ '--map-a': colors[0], '--map-b': colors[1] }}
      aria-hidden="true"
    >
      {path ? (
        <svg viewBox="0 0 24 24">
          <path d={path} fill="currentColor" fillRule="evenodd" />
        </svg>
      ) : (
        <span className="map-badge-initials">{mapInitials(name)}</span>
      )}
    </span>
  );
}

/** Xəritə kartının fon şəkli: rəng keçidi + böyük, solğun emblem. */
export function MapBanner({ mapKey, children }) {
  const { path, colors } = mapArt(mapKey);

  return (
    <div className="map-banner" style={{ '--map-a': colors[0], '--map-b': colors[1] }}>
      {path && (
        <svg className="map-banner-art" viewBox="0 0 24 24" aria-hidden="true">
          <path d={path} fill="currentColor" fillRule="evenodd" />
        </svg>
      )}
      {children}
    </div>
  );
}
