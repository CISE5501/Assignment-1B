import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Article } from '@/schema/article';
import SortableTable, { DataRow } from '../../components/table/SortableTable';
import { formatDate } from '@/common';
const DOMAIN = process.env.DOMAIN;
//props
export interface SearchProps {
  message: string;
  se_methods: string[];
  filteredArticles: Article[];
}

//returns headersList, and sets format for values in the data rows
export const headersList: DataRow<Article>[] = [
  { key: 'title', label: 'Title' },
  {
    key: 'authors',
    label: 'Authors',
    displayAs: (authors: string[]) => authors.join('; '),
  },
  { key: 'date', label: 'Date', displayAs: formatDate },
  { key: 'journal', label: 'Journal' },
  { key: 'volume', label: 'Volume' },
  { key: 'issue', label: 'Issue' },
  {
    key: 'pageRange',
    label: 'Page Range',
    displayAs: ([start, end]: [number, number]) => start + '-' + end,
  },
  { key: 'doi', label: 'DOI' },
  {
    key: 'se_methods',
    label: 'SE methods',
    displayAs: (se_methods: string[]) => se_methods.join(', '),
  },
  { key: 'claim', label: 'claim' },
];

//searches for articles containing the relevant keywords
export const searchKeywords = async (field: string, input: string) => {
  try {
    const response = await fetch(DOMAIN + `articles/filter?field=${field}&keywords=${input}`);
    const result: SearchProps = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

interface SearchDisplayProps {
  size: number;
  buttonMargin?: string;
  dropdown?: boolean;
}

const SearchDisplay = ({ size, buttonMargin = '0', dropdown = true }: SearchDisplayProps) => {
  //sets the inital value
  const [data, setData] = useState<SearchProps>({
    message: '',
    filteredArticles: [],
    se_methods: [],
  });

  //retrieves searched query and updates the components with the search results
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const field = document.querySelector('select')?.value;
    const query = document.querySelector('input')?.value;
    if (!field || !query) return <p>gg</p>;
    const obj = await searchKeywords(field, query);
    if (!obj) return <p>error fetching</p>;
    setData(obj);
    (document.getElementById('result') as HTMLImageElement).hidden = false;
  };

  return (
    <div data-testid="container" className="container">
      <form onSubmit={handleSubmit}>
        <input data-testid="searchInput" type="text" size={size} name="se_methods" />
        {dropdown ? (
          <select name="field">
            <option value="all">Any Field</option>
            <option value="se_methods">SE Methods</option>
          </select>
        ) : (
          ''
        )}
        <button data-testid="searchButton" type="submit" style={{ marginLeft: buttonMargin }}>
          Search
        </button>
      </form>
      <div data-testid="result" id="result" hidden>
        <h3>Search Results for &quot;{data.se_methods}&quot;</h3>
        {data.filteredArticles.length === 0 ? (
          'No Results'
        ) : (
          <SortableTable headers={headersList} data={data.filteredArticles} />
        )}
      </div>
    </div>
  );
};

export default SearchDisplay;
