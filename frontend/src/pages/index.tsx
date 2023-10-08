export default function Home() {
  return (
    <div className="container">
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <h2>Search for Keywords</h2>
      <form action="/search">
        <input type="text" size={80} name="keywords" />
        <select name="field">
          <option value="all">Any Field</option>
          <option value="keywords">SE Methods</option>
        </select>
        <button type="submit" style={{ marginLeft: '2em' }}>
          search
        </button>
      </form>
    </div>
  );
}
