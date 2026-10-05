import { useMemo, useState } from 'react';
import { formatDecimal, formatNumber, formatPercent } from '../../../lib/format';
import { categoryLabel } from '../../../lib/labels';
import WeaponIcon from '../icons/WeaponIcon';
import { Card, Meter } from '../ui';

const ALL = 'all';

// null dəyərlər (bıçaq/qumbara üçün atəş yoxdur) sıralamada həmişə sonda qalır.
const COLUMNS = [
  { key: 'kills', label: 'Öldürmə' },
  { key: 'killShare', label: 'Pay' },
  { key: 'shots', label: 'Atəş' },
  { key: 'hits', label: 'İsabət' },
  { key: 'accuracy', label: 'Dəqiqlik' },
  { key: 'shotsPerKill', label: 'Atəş / öldürmə', ascending: true },
];

export default function WeaponsTab({ stats }) {
  const [category, setCategory] = useState(ALL);
  const [sort, setSort] = useState({ key: 'kills', descending: true });

  const rows = useMemo(() => {
    const filtered = stats.weapons.filter((weapon) => category === ALL || weapon.category === category);
    const direction = sort.descending ? -1 : 1;
    return [...filtered].sort((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];
      if (left == null && right == null) return b.kills - a.kills;
      if (left == null) return 1;
      if (right == null) return -1;
      return (left - right) * direction || b.kills - a.kills;
    });
  }, [stats.weapons, category, sort]);

  const maxKills = Math.max(...stats.weapons.map((weapon) => weapon.kills), 1);

  const toggleSort = (column) =>
    setSort((current) =>
      current.key === column.key
        ? { key: column.key, descending: !current.descending }
        : { key: column.key, descending: !column.ascending },
    );

  return (
    <div className="grid">
      <div className="span-12 chip-row" role="group" aria-label="Silah kateqoriyası">
        <CategoryChip
          active={category === ALL}
          label="Hamısı"
          kills={stats.overview.kills}
          onClick={() => setCategory(ALL)}
        />
        {stats.weaponCategories.map((item) => (
          <CategoryChip
            key={item.category}
            active={category === item.category}
            label={categoryLabel(item.category)}
            kills={item.kills}
            accuracy={item.accuracy}
            onClick={() => setCategory(item.category)}
          />
        ))}
      </div>

      <Card title="Silah statistikası" className="span-12" aside={<span className="card-aside">{rows.length} silah</span>}>
        <div className="table-scroll">
          <table className="weapon-table">
            <thead>
              <tr>
                <th scope="col" className="col-rank">#</th>
                <th scope="col" className="col-weapon">Silah</th>
                {COLUMNS.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={sort.key === column.key ? (sort.descending ? 'descending' : 'ascending') : undefined}
                  >
                    <button type="button" className="sort-button" onClick={() => toggleSort(column)}>
                      {column.label}
                      <span className="sort-arrow" aria-hidden="true">
                        {sort.key === column.key ? (sort.descending ? '▼' : '▲') : ''}
                      </span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((weapon, index) => (
                <tr key={weapon.key}>
                  <td className="col-rank">{index + 1}</td>
                  <th scope="row" className="col-weapon">
                    <span className="weapon-cell">
                      <WeaponIcon weaponKey={weapon.key} className="table-weapon" />
                      <span>
                        <span className="weapon-name">{weapon.name}</span>
                        <span className="weapon-category">{categoryLabel(weapon.category)}</span>
                      </span>
                    </span>
                  </th>
                  <td>
                    <span className="cell-bar">
                      {formatNumber(weapon.kills)}
                      <Meter fraction={weapon.kills / maxKills} />
                    </span>
                  </td>
                  <td>{formatPercent(weapon.killShare)}</td>
                  <td>{weapon.shots == null ? '—' : formatNumber(weapon.shots)}</td>
                  <td>{weapon.hits == null ? '—' : formatNumber(weapon.hits)}</td>
                  <td>
                    {weapon.accuracy == null ? (
                      '—'
                    ) : (
                      <span className="cell-bar">
                        {formatPercent(weapon.accuracy)}
                        <Meter fraction={weapon.accuracy / 100} tone="green" />
                      </span>
                    )}
                  </td>
                  <td>{weapon.shotsPerKill == null ? '—' : formatDecimal(weapon.shotsPerKill, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote">
          Dəqiqlik = isabət / atəş. Steam-in ümumi "isabət" sayğacı CS2-də düzgün işləmədiyi üçün ümumi dəqiqlik
          silahlar üzrə cəmdən hesablanır. M4A4 və M4A1-S, P2000 və USP-S Steam-də bir yerdə sayılır.
        </p>
      </Card>
    </div>
  );
}

function CategoryChip({ active, label, kills, accuracy, onClick }) {
  return (
    <button type="button" className={`chip${active ? ' is-active' : ''}`} aria-pressed={active} onClick={onClick}>
      <span className="chip-label">{label}</span>
      <span className="chip-value">{formatNumber(kills)}</span>
      {accuracy != null && <span className="chip-sub">{formatPercent(accuracy, 0)} dəqiqlik</span>}
    </button>
  );
}
