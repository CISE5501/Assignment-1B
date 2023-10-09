import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import SearchDisplay, {SearchProps} from '../../components/search/SearchDisplay';
import { Article } from '@/schema/article';

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
  return render(
    <SearchDisplay/>
  );
}

afterEach(cleanup);

describe("Testing initial rendering", () => {
  test("Test 1: should have an input field and submit button on load", () => {
    renderSearch();
    expect(screen.getByTestId('searchInput')).toBeInTheDocument();
    expect(screen.getByTestId('searchButton')).toBeInTheDocument();
    expect(screen.getByTestId('result')).not.toBeVisible();
  });

  test("Test 2: clicking on the submit button calls the handleSubmit function", () => {
    renderSearch();
    const mockSearch = jest.fn();
    const form = screen.getByTestId('searchInput').onsubmit=mockSearch;
    fireEvent.change(screen.getByTestId('searchInput'), {target: {value: "t1"}})
    fireEvent.submit(screen.getByTestId('searchInput'));
    expect(mockSearch).toHaveBeenCalled();
  });
  test("Test 3: clicking on search will call fetch", () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({tempArray}),
    }),
  ) as jest.Mock; 
  renderSearch();
    expect(screen.getByTestId('result')).not.toBeVisible();
    fireEvent.click(screen.getByTestId('searchButton'));
  })
});