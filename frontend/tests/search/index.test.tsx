import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchDisplay, { SearchProps, searchKeywords } from '../../components/search/SearchDisplay';
import { Article } from '@/schema/article';
import { enableFetchMocks } from 'jest-fetch-mock';

const tempArray = [
  {
    title: 'sdf',
    authors: ['sdasd'],
    date: '0004-03-31',
    journal: 'sdf',
    volume: 2,
    issue: 2,
    pageRange: [3, 5],
    doi: 'dsfsdfsdfsdf',
    keywords: ['sad', 'asd'],
    abstract: 'sfasd',
  },
] as Article[];

function renderSearch() {
  return render(<SearchDisplay />);
}

beforeEach(() => {
  fetchMock.resetMocks();
});

afterEach(cleanup);

describe('Testing initial rendering', () => {
  enableFetchMocks();
  test('Test 1: should have an input field and submit button on load', () => {
    renderSearch();
    expect(screen.getByTestId('searchInput')).toBeInTheDocument();
    expect(screen.getByTestId('searchButton')).toBeInTheDocument();
    expect(screen.getByTestId('result')).not.toBeVisible();
  });

  test('Test 2: typing in form input changes its value', () => {
    renderSearch();
    const container = screen.getByTestId('container');
    const form = container.querySelector('input');
    fireEvent.change(screen.getByTestId('searchInput'), { target: { value: 't1' } });
    expect(form?.value).toBe('t1');
  });

  test('Test 3: submitting the form calls the handleSubmit function', () => {
    renderSearch();
    const mockSearch = jest.fn();
    const form = (screen.getByTestId('searchInput').onsubmit = mockSearch);
    fireEvent.submit(screen.getByTestId('searchInput'));
    expect(mockSearch).toHaveBeenCalled();
  });
  test("Test 4: submitting the form will say no matches found if the keyword entered isn't stored in the database", async () => {
    renderSearch();
    const responseMock = () => JSON.stringify({});
    fetchMock.mockResponseOnce(responseMock());
    await searchKeywords('field', 'success');
    await waitFor(() => {
      expect(screen.getByText('No Results')).toBeInTheDocument();
    });
  });

  test('Test 5: submitting the form will return data if the keyword entered is stored in the database', async () => {
    renderSearch();
    const responseMock = () =>
      JSON.stringify({ message: '', filteredArticles: tempArray, keywords: ['sdf'] } as SearchProps);
    fetchMock.mockResponseOnce(responseMock());
    const result = await searchKeywords('field', 'sdf');
    await waitFor(() => {
      expect(result?.filteredArticles).toStrictEqual(tempArray);
    });
  });
});
