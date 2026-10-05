/*
 * Xəritə nişanları: hər xəritənin öz rəng keçidi və sadə emblemi var (24x24, currentColor).
 * Tanınmayan xəritə adının ilk hərfləri ilə göstərilir.
 */

/** Radiasiya işarəsi: mərkəzdə dairə və 120° aralıqla üç qanad. */
function trefoil() {
  const point = (radius, degrees) => {
    const radians = (degrees * Math.PI) / 180;
    return `${(12 + radius * Math.cos(radians)).toFixed(2)} ${(12 + radius * Math.sin(radians)).toFixed(2)}`;
  };
  const blade = (center) =>
    `M${point(3.4, center - 30)}A3.4 3.4 0 0 1 ${point(3.4, center + 30)}` +
    `L${point(9.5, center + 30)}A9.5 9.5 0 0 0 ${point(9.5, center - 30)}z`;
  return `M10.2 12a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0-3.6 0z${blade(-90)}${blade(30)}${blade(150)}`;
}

const GLYPHS = {
  arch: 'M4 21V10.5a8 8 0 0 1 16 0V21h-3.5v-9.5a4.5 4.5 0 0 0-9 0V21zM2.5 21h19v1.5h-19z',
  tower: 'M9.5 2.5h5v3h2v3.5h-1.2V21H8.7V9H7.5V5.5h2zM10.8 11.5v3.5h2.4v-3.5a1.2 1.2 0 0 0-2.4 0zM4 21h16v1.5H4z',
  trefoil: trefoil(),
  skyscraper:
    'M7 22V7.5L12 3l5 4.5V22zM9 9.5v1.6h2V9.5zm4 0v1.6h2V9.5zM9 13v1.6h2V13zm4 0v1.6h2V13zM9 16.5v1.6h2v-1.6zm4 0v1.6h2v-1.6zM18 4h1.2v8H18zM14 4h5.2v1.2H14z',
  train:
    'M6 5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM8 5v5h8V5zM8.5 13.5a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0-2.6 0zm4.4 0a1.3 1.3 0 1 0 2.6 0a1.3 1.3 0 1 0-2.6 0zM7 20h2.5l-1.5 2.5H5.5zm7.5 0H17l1.5 2.5H16z',
  office:
    'M4 22V4h11v4h5v14zM6.5 6.5v2h2v-2zm4 0v2h2v-2zM6.5 10.5v2h2v-2zm4 0v2h2v-2zm6 0v2h2v-2zM6.5 14.5v2h2v-2zm4 0v2h2v-2zm6 0v2h2v-2zM10 18.5V22h2.5v-3.5z',
  dome: 'M3 20h18v2H3zM5 19v-5a7 7 0 0 1 14 0v5zM11.2 2.5h1.6V7h-1.6zM8 19v-4h1.6v4zm6.4 0v-4H16v4z',
  pyramid: 'M2 21h20l-2.4-3.5H4.4zM5.5 16.5h13l-2.2-3.4H7.7zM9 12.1h6l-1.8-3.3h-2.4zM11 7.8h2V3h-2z',
  ankh: 'M11 11.5h2V22h-2zM6 11h12v2H6zM12 2.5a4.3 4.6 0 0 1 0 9.2a4.3 4.6 0 0 1 0-9.2zm0 2.2a2.2 2.6 0 0 0 0 5.2a2.2 2.6 0 0 0 0-5.2z',
  bridge: 'M2 11h20v2.2H2zM3 13.2h2V21H3zm16 0h2V21h-2zM5 13.2q7 1.5 14 0v1.8q-7 2-14 0zM9.5 15.5h1.6V21H9.5zm3.4 0h1.6V21h-1.6z',
  crosshair:
    'M12 3a9 9 0 1 1 0 18a9 9 0 0 1 0-18zm0 2.2a6.8 6.8 0 1 0 0 13.6a6.8 6.8 0 0 0 0-13.6zM11 1h2v6h-2zm0 16h2v6h-2zM1 11h6v2H1zm16 0h6v2h-6z',
  crate: 'M3 7l9-4 9 4v10l-9 4-9-4zM5 8.4v7.4l6 2.7v-7.4zm8 2.7v7.4l6-2.7V8.4zM6.2 6.8L12 9.4l5.8-2.6L12 4.2z',
  wave: 'M2 15q2.5-3 5 0t5 0t5 0t5 0v2.4q-2.5 3-5 0t-5 0t-5 0t-5 0zM2 9q2.5-3 5 0t5 0t5 0t5 0v2.4q-2.5 3-5 0t-5 0t-5 0t-5 0z',
  sugar: 'M5 22l3-18h1.8l-3 18zM12 22l1.5-18h1.8L13.8 22zM18.2 22l-1-18H19l1 18zM3 10h18v1.6H3z',
};

const MAPS = {
  de_dust2: { glyph: 'arch', colors: ['#d4a463', '#6e4f26'] },
  de_dust: { glyph: 'arch', colors: ['#c9a06a', '#5e4422'] },
  de_inferno: { glyph: 'tower', colors: ['#cf6d3d', '#5a2516'] },
  de_nuke: { glyph: 'trefoil', colors: ['#3fa39a', '#173a40'] },
  de_vertigo: { glyph: 'skyscraper', colors: ['#6aa6ec', '#253a66'] },
  de_train: { glyph: 'train', colors: ['#8a9a72', '#323d2c'] },
  de_mirage: { glyph: 'dome', colors: ['#e2a85a', '#7a4720'] },
  de_ancient: { glyph: 'pyramid', colors: ['#6aa358', '#233d1f'] },
  de_anubis: { glyph: 'ankh', colors: ['#3fb0aa', '#6b5a22'] },
  de_overpass: { glyph: 'bridge', colors: ['#78a674', '#2a4436'] },
  de_cache: { glyph: 'crate', colors: ['#a3a663', '#40421f'] },
  de_lake: { glyph: 'wave', colors: ['#5ab0c9', '#1f4652'] },
  de_sugarcane: { glyph: 'sugar', colors: ['#9cc46a', '#3d5222'] },
  cs_office: { glyph: 'office', colors: ['#b4c7d6', '#44576a'] },
  cs_italy: { glyph: 'dome', colors: ['#d68b5c', '#5c3220'] },
};

const MODE_DEFAULTS = {
  ar: { glyph: 'crosshair', colors: ['#9a7ae0', '#36276a'] },
  cs: { glyph: 'office', colors: ['#9fb2c4', '#3c4b5a'] },
};

const GENERIC = { glyph: null, colors: ['#5d6b7d', '#232c38'] };

export function mapArt(key) {
  const lower = key?.toLowerCase() ?? '';
  const art = MAPS[lower] ?? MODE_DEFAULTS[lower.split('_')[0]] ?? GENERIC;
  return { ...art, path: art.glyph ? GLYPHS[art.glyph] : null };
}

/** Emblemi olmayan xəritə üçün iki hərf: "de_some_map" -> "SM". */
export function mapInitials(name) {
  const words = name.split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2);
  return letters.toUpperCase();
}
