/** Hələ data olmayan "ad / zolaq / dəyər" sıraları üçün boş yer. */
export default function BarList({ rows }) {
  return (
    <ul className="bar-list">
      {rows.map((row) => (
        <li key={row}>
          <span className="bar-label">{row}</span>
          <span className="bar-track hatch" aria-hidden="true" />
          <span className="bar-value" aria-hidden="true">—</span>
        </li>
      ))}
    </ul>
  );
}