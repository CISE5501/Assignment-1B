export default function Home() {
  return (
    <div className="container">
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <h2>Search for Keywords</h2>
      <form action={"/search"}>
        <input type="text" name="keywords" />
        <button type="submit">
          search
        </button>
      </form>
    </div>
  );
}
