// Backend-in enum dəyərləri (camelCase) -> interfeysdə göstərilən ad.
export const CATEGORY_LABELS = {
  pistol: 'Tapança',
  smg: 'SMG',
  rifle: 'Avtomat',
  sniper: 'Snayper',
  shotgun: 'Ov tüfəngi',
  heavy: 'Pulemyot',
  melee: 'Bıçaq',
  grenade: 'Qumbara',
  equipment: 'Avadanlıq',
  other: 'Digər',
};

export const MAP_MODE_LABELS = {
  defusal: 'Bomba',
  hostage: 'Girov',
  armsRace: 'Arms Race',
  other: 'Digər',
};

export const categoryLabel = (category) => CATEGORY_LABELS[category] ?? category;
export const mapModeLabel = (mode) => MAP_MODE_LABELS[mode] ?? mode;
