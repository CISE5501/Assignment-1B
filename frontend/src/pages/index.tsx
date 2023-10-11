import SearchDisplay from '../../components/search/SearchDisplay';
import 'bootstrap/dist/css/bootstrap.min.css';
const DOMAIN = process.env.DOMAIN;

const deleteAll = async (): Promise<void> => {
  const response = await fetch(DOMAIN + 'articles/deleteAll', {
    method: 'DELETE',
  });
  if (response.ok) {
    alert('Successfully deleted all articles.');
  } else {
    alert('Failed to delete all articles.');
  }
};

const addExamples = async (): Promise<void> => {
  const response = await fetch(DOMAIN + 'articles/example', {
    method: 'POST',
  });
  if (response.ok) {
    alert('Successfully added all articles.');
  } else {
    alert('Failed to add all articles.');
  }
};

export default function Home() {
  return (
    <div className="container">
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <button onClick={deleteAll}>delete all</button>
      <button onClick={addExamples}>add examples</button>
      <SearchDisplay />
    </div>
  );
}
