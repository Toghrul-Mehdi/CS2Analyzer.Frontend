// Backend-dən gələn silah açarı -> göstərilən ad. Siyahıda olmayan açar olduğu kimi göstərilir.
const WEAPON_LABELS = {
  AK47: 'AK-47',
  M4A1: 'M4A1',
  AWP: 'AWP',
  DEAGLE: 'Desert Eagle',
  GLOCK: 'Glock-18',
  HKP2000: 'P2000 / USP-S',
  P250: 'P250',
  ELITE: 'Dual Berettas',
  FIVESEVEN: 'Five-SeveN',
  TEC9: 'Tec-9',
  FAMAS: 'FAMAS',
  GALILAR: 'Galil AR',
  SG556: 'SG 553',
  AUG: 'AUG',
  SSG08: 'SSG 08',
  MAC10: 'MAC-10',
  MP9: 'MP9',
  MP7: 'MP7',
  UMP45: 'UMP-45',
  P90: 'P90',
  BIZON: 'PP-Bizon',
  NOVA: 'Nova',
  XM1014: 'XM1014',
  KNIFE: 'Bıçaq',
};

export function weaponLabel(key) {
  return WEAPON_LABELS[key.toUpperCase()] ?? key;
}