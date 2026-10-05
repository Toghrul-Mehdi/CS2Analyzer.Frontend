import { WEAPON_VIEWBOX, weaponIconParts, weaponIconTransform } from '../../../lib/weaponArt';

/** Silahın stilizə edilmiş siluetini çəkir; rəngi ana elementin "color" xassəsindən götürür. */
export default function WeaponIcon({ weaponKey, className = '', title }) {
  const parts = weaponIconParts(weaponKey);

  return (
    <svg
      className={`weapon-icon ${className}`}
      viewBox={WEAPON_VIEWBOX}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      <g transform={weaponIconTransform(weaponKey)}>
        {parts.map((part, index) =>
          part.stroke ? (
            <path
              key={index}
              d={part.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={part.width}
              strokeLinejoin="round"
              opacity={part.opacity}
            />
          ) : (
            <path
              key={index}
              d={part.d}
              fill="currentColor"
              fillRule={part.evenodd ? 'evenodd' : undefined}
              opacity={part.opacity}
            />
          ),
        )}
      </g>
    </svg>
  );
}
