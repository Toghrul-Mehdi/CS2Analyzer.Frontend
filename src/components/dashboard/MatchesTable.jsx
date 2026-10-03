const COLUMNS = ['Xəritə', 'Nəticə', 'K/D', 'Tarix'];
const SKELETON_ROWS = [0, 1, 2, 3, 4];

export default function MatchesTable() {
  return (
    <>
      <table className="matches" aria-hidden="true">
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SKELETON_ROWS.map((row) => (
            <tr key={row}>
              {COLUMNS.map((column) => (
                <td key={column}>
                  <span className="hatch hatch-cell" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="panel-note">Oyun tarixçəsi əlavə olunduqdan sonra burada görünəcək.</p>
    </>
  );
}