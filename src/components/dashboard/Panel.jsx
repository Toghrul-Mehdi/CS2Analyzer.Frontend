/** tone: "gold" | "blue" | "red" | "green" (başlıq yanındakı rəngli işarə). Verilməsə neytral olur. */
export default function Panel({ title, tag, tone, className = '', children }) {
  const classes = ['panel', tone && `panel--${tone}`, className].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      <header className="panel-head">
        <h2 className="panel-title">{title}</h2>
        {tag && <span className="tag">{tag}</span>}
      </header>
      {children}
    </section>
  );
}