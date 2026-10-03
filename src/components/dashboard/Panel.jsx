export default function Panel({ title, tag, className = '', children }) {
  return (
    <section className={`panel ${className}`.trim()}>
      <header className="panel-head">
        <h2 className="panel-title">{title}</h2>
        {tag && <span className="tag">{tag}</span>}
      </header>
      {children}
    </section>
  );
}