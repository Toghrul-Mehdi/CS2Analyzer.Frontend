/*
 * Silah ikonları kod ilə qurulur: hər silah hissələrdən (qundaq, gövdə, lülə, daraq, optika...) yığılır.
 * Bütün ikonlar eyni 80x28 ölçüsündədir və "currentColor" ilə rənglənir, lüləsi sağa baxır.
 * Rəsmi ikonlarla əvəz etmək üçün yalnız WeaponIcon komponentini dəyişmək kifayətdir.
 */

const rect = (x, y, w, h) => `M${x} ${y}h${w}v${h}h${-w}z`;
const poly = (...points) => `M${points.map(([x, y]) => `${x} ${y}`).join('L')}z`;

const fill = (d, extra) => ({ d, ...extra });
const line = (d, width = 1.2) => ({ d, stroke: true, width });

const BODY_TOP = 9;
const BODY_BOTTOM = 15;

// ---------- Uzun silah hissələri ----------
const parts = {
  stock(type, x0, x1) {
    switch (type) {
      case 'solid':
        return [fill(poly([x0, 10], [x1, 9.5], [x1, 15], [x0, 19.5]))];
      case 'skeleton':
        return [
          fill(
            poly([x0, 10], [x1, 9.5], [x1, 15], [x0, 19.5]) +
              poly([x0 + 2.5, 12.5], [x1 - 3, 12], [x1 - 3, 13.5], [x0 + 2.5, 17]),
            { evenodd: true },
          ),
        ];
      case 'thumbhole':
        return [
          fill(
            poly([x0, 9.5], [x1, 9], [x1, 15], [x1 - 4, 15], [x0 + 4, 20], [x0, 20]) +
              poly([x1 - 7, 11.5], [x1 - 2, 11.5], [x1 - 2, 13.5], [x1 - 8, 15]),
            { evenodd: true },
          ),
        ];
      case 'tube':
        return [fill(rect(x0 + 4, 10.5, x1 - x0 - 4, 2.5)), fill(poly([x0, 9.5], [x0 + 5, 9.5], [x0 + 5, 18], [x0, 18.5]))];
      case 'wire':
        return [fill(rect(x0, 10, x1 - x0, 1.2)), fill(rect(x0, 15.3, x1 - x0, 1.2)), fill(rect(x0, 10, 1.4, 6.5))];
      default:
        return [];
    }
  },
  body: (x0, x1, top = BODY_TOP, bottom = BODY_BOTTOM) => [fill(poly([x0, top], [x1, top], [x1, bottom], [x0, bottom]))],
  guard: (x0, x1) => [fill(poly([x0, 9.5], [x1, 9.8], [x1, 13.5], [x0, 14.2]))],
  barrel: (x0, x1, thickness = 1.6) => [fill(rect(x0, 11 - thickness / 2, x1 - x0, thickness))],
  muzzle: (x0, x1) => [fill(rect(x0, 9.6, x1 - x0, 2.8))],
  suppressor: (x0, x1) => [fill(rect(x0, 9.2, x1 - x0, 3.6))],
  sight: (x) => [fill(poly([x, 10], [x + 1.6, 10], [x + 1.1, 7.2], [x + 0.5, 7.2]))],
  rearSight: (x) => [fill(rect(x, 7.8, 2, 1.4))],
  rail: (x0, x1) => [fill(rect(x0, 8.1, x1 - x0, 1))],
  handle: (x0, x1) => [line(`M${x0} 9V6.5H${x1}V9`, 1.4)],
  grip: (x) => [fill(poly([x, 14.5], [x + 4.5, 14.5], [x + 3, 22], [x - 1, 21.5]))],
  foregrip: (x) => [fill(poly([x, 14], [x + 3, 14], [x + 2.6, 19.5], [x + 0.4, 19.5]))],
  triggerGuard: (x) => [line(`M${x + 4.5} 15.2v2.6h4.5v-2.6`, 1)],
  pump: (x0, x1) => [fill(rect(x0, 12.6, x1 - x0, 2.8))],
  tubeMag: (x0, x1) => [fill(rect(x0, 12.4, x1 - x0, 1.8))],
  helicalMag: (x0, x1) => [fill(`M${x0 + 1.6} 14.6h${x1 - x0 - 3.2}a1.6 1.6 0 0 1 0 3.2h${-(x1 - x0 - 3.2)}a1.6 1.6 0 0 1 0-3.2z`)],
  bipod: (x) => [line(`M${x} 13.5l-3 7M${x} 13.5l3 7`, 1)],
  scope(x0, x1) {
    return [
      fill(rect(x0 + 2, 5, x1 - x0 - 4, 2.6)),
      fill(poly([x1 - 3, 4.6], [x1, 4], [x1, 8.6], [x1 - 3, 8])),
      fill(rect(x0, 4.4, 2.6, 3.8)),
      fill(rect(x0 + 4, 7.4, 1.6, 1.8)),
      fill(rect(x1 - 7, 7.4, 1.6, 1.8)),
    ];
  },
  mag(type, x, width = 5, length = 8) {
    const top = BODY_BOTTOM;
    switch (type) {
      case 'curved':
        return [
          fill(
            `M${x} ${top}L${x + width} ${top}Q${x + width + 1} ${top + length * 0.6} ${x + width + 4} ${top + length}` +
              `L${x + 4} ${top + length + 0.6}Q${x + 0.6} ${top + length * 0.6} ${x} ${top}z`,
          ),
        ];
      case 'straight':
        return [fill(poly([x, top], [x + width, top], [x + width + 1, top + length], [x + 1, top + length]))];
      case 'box':
        return [fill(rect(x, top, width, length))];
      default:
        return [];
    }
  },
};

// ---------- Tapança hissələri ----------
function pistol({ slide: [x0, x1, top = 7.5, bottom = 12.5], grip, gripLength = 11, hammer = false, extras = [] }) {
  return [
    fill(poly([x0, top], [x1 - 1, top], [x1, top + 1], [x1, bottom], [x0, bottom])),
    fill(rect(x0 + 2, bottom, x1 - x0 - 8, 2.4)),
    fill(poly([grip, bottom + 1], [grip + 7, bottom + 1], [grip + 5, bottom + 1 + gripLength], [grip - 3, bottom + gripLength])),
    line(`M${grip + 7} ${bottom + 2.2}v2.6h4.6v-2.6`, 1),
    ...(hammer ? [fill(rect(x0 - 1.6, top + 0.6, 2, 2.2))] : []),
    ...extras,
  ];
}

/** [hissə adı, ...arqumentlər] siyahısını path-lərə çevirir. */
const build = (spec) => spec.flatMap(([name, ...args]) => parts[name](...args));

const ICONS = {
  // Avtomatlar
  ak47: build([
    ['stock', 'solid', 3, 15], ['body', 15, 41], ['guard', 41, 53], ['barrel', 53, 72], ['muzzle', 71, 75],
    ['sight', 68], ['rearSight', 40], ['grip', 22], ['triggerGuard', 22], ['mag', 'curved', 32, 5, 8],
  ]),
  m4a1: build([
    ['stock', 'tube', 3, 17], ['body', 17, 40], ['rail', 17, 40], ['rearSight', 18], ['guard', 40, 55],
    ['barrel', 55, 67], ['muzzle', 66, 70], ['sight', 52], ['grip', 23], ['triggerGuard', 23], ['mag', 'straight', 31, 4.5, 7.5],
  ]),
  galilar: build([
    ['stock', 'skeleton', 3, 16], ['body', 16, 40], ['guard', 40, 52], ['barrel', 52, 71], ['muzzle', 70, 73],
    ['sight', 67], ['grip', 23], ['triggerGuard', 23], ['mag', 'curved', 32, 5, 8],
  ]),
  famas: build([
    ['stock', 'solid', 4, 14], ['body', 14, 52, 8.5, 15.5], ['handle', 17, 50], ['barrel', 52, 70], ['muzzle', 69, 72],
    ['grip', 40], ['triggerGuard', 40], ['mag', 'straight', 22, 5, 6],
  ]),
  aug: build([
    ['stock', 'solid', 4, 12], ['body', 12, 48, 9, 16], ['scope', 24, 44], ['barrel', 48, 70, 1.8], ['muzzle', 69, 72],
    ['grip', 38], ['foregrip', 47], ['mag', 'straight', 22, 5, 6],
  ]),
  sg556: build([
    ['stock', 'solid', 3, 16], ['body', 16, 40], ['guard', 40, 54], ['barrel', 54, 71], ['muzzle', 70, 74],
    ['scope', 22, 38], ['grip', 23], ['triggerGuard', 23], ['mag', 'curved', 32, 5, 8],
  ]),

  // Snayperlər
  awp: build([
    ['stock', 'thumbhole', 2, 20], ['body', 20, 42, 9.5, 14.5], ['barrel', 42, 75, 2.4], ['suppressor', 74, 78],
    ['scope', 21, 44], ['mag', 'box', 31, 6, 4],
  ]),
  ssg08: build([
    ['stock', 'skeleton', 3, 18], ['body', 18, 38, 9.5, 14], ['barrel', 38, 74, 1.6], ['muzzle', 73, 76],
    ['scope', 20, 40], ['grip', 19], ['mag', 'box', 30, 4, 3],
  ]),
  scar20: build([
    ['stock', 'solid', 3, 15], ['body', 15, 42], ['rail', 15, 54], ['guard', 42, 56], ['barrel', 56, 72, 2],
    ['muzzle', 71, 75], ['scope', 19, 38], ['grip', 22], ['triggerGuard', 22], ['mag', 'box', 31, 5, 6],
  ]),
  g3sg1: build([
    ['stock', 'solid', 2, 16], ['body', 16, 42], ['guard', 42, 54], ['barrel', 54, 74, 1.8], ['muzzle', 73, 76],
    ['scope', 21, 40], ['grip', 23], ['triggerGuard', 23], ['mag', 'straight', 32, 5, 7],
  ]),

  // Pistolet-pulemyotlar
  mp7: build([
    ['stock', 'wire', 12, 22], ['body', 22, 44], ['rail', 22, 44], ['barrel', 44, 53], ['muzzle', 52, 55],
    ['grip', 32], ['mag', 'straight', 32, 4, 10], ['foregrip', 42],
  ]),
  mp9: build([
    ['stock', 'wire', 12, 22], ['body', 22, 46], ['barrel', 46, 54], ['muzzle', 53, 56], ['grip', 32],
    ['mag', 'straight', 32, 4, 11], ['foregrip', 42],
  ]),
  mac10: build([
    ['stock', 'wire', 14, 22], ['body', 22, 44, 8.5, 15.5], ['barrel', 44, 51], ['muzzle', 50, 53],
    ['grip', 30], ['mag', 'straight', 30, 4, 11],
  ]),
  ump45: build([
    ['stock', 'skeleton', 8, 22], ['body', 22, 46], ['rail', 24, 44], ['barrel', 46, 58], ['muzzle', 57, 60],
    ['grip', 28], ['triggerGuard', 28], ['mag', 'straight', 38, 4.5, 9],
  ]),
  p90: [
    fill(poly([14, 11], [24, 9], [52, 8.5], [58, 11], [58, 15], [50, 18], [18, 18]) + rect(30, 13, 9, 2.6), { evenodd: true }),
    fill(rect(22, 6.4, 30, 2)),
    fill(rect(58, 10.2, 6, 1.6)),
  ],
  bizon: build([
    ['stock', 'skeleton', 6, 20], ['body', 20, 44], ['barrel', 44, 58], ['muzzle', 57, 60], ['sight', 54],
    ['grip', 26], ['triggerGuard', 26], ['helicalMag', 32, 50],
  ]),
  mp5sd: build([
    ['stock', 'tube', 8, 22], ['body', 22, 44], ['suppressor', 44, 64], ['grip', 28], ['triggerGuard', 28],
    ['mag', 'curved', 36, 4, 8],
  ]),

  // Ov tüfəngləri
  nova: build([
    ['stock', 'solid', 3, 17], ['body', 17, 36], ['barrel', 36, 74, 1.8], ['tubeMag', 36, 66], ['pump', 44, 56],
    ['sight', 72], ['grip', 22],
  ]),
  xm1014: build([
    ['stock', 'skeleton', 3, 16], ['body', 16, 38], ['barrel', 38, 72, 1.8], ['tubeMag', 38, 64], ['guard', 42, 56],
    ['grip', 22], ['triggerGuard', 22],
  ]),
  mag7: build([
    ['stock', 'wire', 10, 20], ['body', 20, 46], ['barrel', 46, 62, 2.2], ['pump', 44, 60], ['grip', 26],
    ['mag', 'box', 27, 5, 8],
  ]),
  sawedoff: build([
    ['stock', 'solid', 10, 20], ['body', 20, 34], ['barrel', 34, 60, 2.4], ['tubeMag', 34, 52], ['pump', 38, 50],
  ]),

  // Pulemyotlar
  m249: build([
    ['stock', 'solid', 3, 16], ['body', 16, 44, 8.5, 15.5], ['handle', 26, 38], ['guard', 44, 54], ['barrel', 54, 74, 1.8],
    ['muzzle', 73, 76], ['sight', 70], ['bipod', 62], ['grip', 22], ['mag', 'box', 30, 9, 6],
  ]),
  negev: build([
    ['stock', 'solid', 3, 16], ['body', 16, 44, 8.5, 15.5], ['guard', 44, 58], ['handle', 46, 54], ['barrel', 58, 74, 2],
    ['muzzle', 73, 76], ['bipod', 64], ['grip', 21], ['foregrip', 52], ['mag', 'box', 28, 8, 5],
  ]),

  // Tapançalar
  glock: pistol({ slide: [24, 56], grip: 26 }),
  hkp2000: pistol({ slide: [20, 50], grip: 22, extras: [fill(rect(50, 8.2, 13, 3.6))] }),
  p250: pistol({ slide: [25, 54], grip: 27, gripLength: 10, hammer: true }),
  fiveseven: pistol({ slide: [24, 57, 8, 12], grip: 26, gripLength: 11 }),
  tec9: pistol({
    slide: [22, 54, 8, 13],
    grip: 23,
    gripLength: 9,
    extras: [fill(poly([38, 15], [42, 15], [43, 25], [39, 25])), fill(rect(54, 9.5, 5, 2))],
  }),
  deagle: [
    fill(poly([19, 6], [60, 6.5], [60, 10.5], [19, 12.5])),
    fill(rect(22, 12.5, 30, 2.4)),
    fill(poly([22, 13.5], [30, 13.5], [28, 26], [19, 25])),
    line('M30 14.7v2.8h5v-2.8', 1),
    fill(rect(17.2, 6.8, 2.2, 2.4)),
  ],
  elite: [
    ...pistol({ slide: [30, 60, 4.5, 9], grip: 32, gripLength: 9 }).map((part) => ({ ...part, opacity: 0.45 })),
    ...pistol({ slide: [20, 50, 9, 13.5], grip: 22, gripLength: 10 }),
  ],
  cz75a: pistol({ slide: [24, 54], grip: 26, hammer: true, extras: [fill(rect(36, 15, 3, 4))] }),
  revolver: [
    fill(rect(42, 8, 20, 2.8)),
    fill(`M31 7h11v7H31a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z`),
    fill(rect(26, 7.5, 6, 6.5)),
    fill(`M26 13.5h6l-1 4q-1 6-3 8h-6q2-4 3-8z`),
    line('M32 14.4v3h4.6v-3', 1),
    fill(rect(23.5, 6.5, 2.6, 2.2)),
  ],

  // Bıçaq, qumbaralar, avadanlıq
  knife: [
    fill('M24 12.5L54 10.6Q64 10.6 69 13Q61 16.2 48 16.2L24 16.2z'),
    fill(rect(21, 9.8, 3, 9)),
    fill('M8 12.8h13v4.6H8a2.3 2.3 0 0 1 0-4.6z'),
  ],
  hegrenade: [
    fill('M33 16a7 7 0 1 0 14 0a7 7 0 1 0-14 0z'),
    fill(rect(37.5, 6.5, 5, 3.4)),
    fill(poly([42.5, 7], [45.5, 7], [47.6, 14.5], [46, 15])),
    line('M37.5 8a2.2 2.2 0 1 1-4.4 0a2.2 2.2 0 1 1 4.4 0z', 1),
  ],
  molotov: [
    fill('M36.5 9h7v3.5l3 3.5v8.5a1.5 1.5 0 0 1-1.5 1.5h-10a1.5 1.5 0 0 1-1.5-1.5V16l3-3.5z'),
    fill('M37 9q-1.6-2.6 0.6-5.2q0.4 2 2.4 0.8q-0.2 2.2 1.6 1.2q0.6 1.8-0.6 3.2z'),
  ],
  decoy: [
    fill('M34 11a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z'),
    fill(rect(37, 5.8, 6, 3.2)),
    fill(poly([43, 6.4], [46.5, 6.4], [48, 13], [46.4, 13.4])),
  ],
  taser: [
    fill(poly([27, 8], [50, 8], [53, 10], [53, 14], [27, 14])),
    fill(rect(53, 10, 3, 3)),
    fill(poly([29, 13.5], [36, 13.5], [34, 23], [26, 22])),
    line('M36 14.7v2.6h4.6v-2.6', 1),
  ],
};

const FALLBACK = ICONS.ak47;

// Kiçik əşyalar uzun silahların yanında itib-batmasın deyə mərkəzdən böyüdülür.
const SCALE = {
  hegrenade: 1.4,
  molotov: 1.4,
  decoy: 1.4,
  taser: 1.3,
  glock: 1.15,
  hkp2000: 1.15,
  p250: 1.15,
  fiveseven: 1.15,
  tec9: 1.15,
  cz75a: 1.15,
  elite: 1.1,
  revolver: 1.1,
};

export function weaponIconParts(key) {
  return ICONS[key?.toLowerCase()] ?? FALLBACK;
}

/** SVG "transform" dəyəri və ya undefined. */
export function weaponIconTransform(key) {
  const scale = SCALE[key?.toLowerCase()];
  return scale ? `translate(40 14.5) scale(${scale}) translate(-40 -14.5)` : undefined;
}

export const WEAPON_VIEWBOX = '0 0 80 28';
