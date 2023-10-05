import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Article } from '@/schema/article';
import SortableTable, { DataRow } from '../../../components/table/SortableTable';
import DOMAIN from '../../../DOMAIN';

const Search = () => {
  const [data, setData] = useState({
    message: '',
    keywords: [],
    filteredArticles: [],
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('keywords');

    // Fetch data based on the query
    const fetchData = async () => {
      try {
        const response = await fetch(DOMAIN + 'articles/filter?keywords=' + query);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (query) {
      fetchData();
    }
  }, []);

  const headersList: DataRow<Article>[] = [
    { key: 'title', label: 'Title' },
    {
      key: 'authors',
      label: 'Authors',
      displayAs: (authors: string[]) => authors.join('; '),
    },
    { key: 'date', label: 'Date' },
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
      key: 'keywords',
      label: 'Keywords',
      displayAs: (keywords: string[]) => keywords.join(', '),
    },
    { key: 'abstract', label: 'Abstract' },
  ];

  return (
    <div className="container">
      <h1>Search Results for '{data.keywords}'</h1>
      {data.filteredArticles.length === 0 ? (
        'No Results'
      ) : (
        <SortableTable headers={headersList} data={data.filteredArticles} />
      )}
    </div>
  );
};

export default Search;
