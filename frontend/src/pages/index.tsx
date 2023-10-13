import SearchDisplay from '../../components/search/SearchDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="container">
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <SearchDisplay />
    </div>
  );
}
