import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="container">
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <h2>Search for Keywords</h2>
      <form action="/search">
        <input type="text" size={80} name="keywords" />
        <button type="submit" style={{ marginLeft: '2em' }}>
          search
        </button>
      </form>
    </div>
  );
}
