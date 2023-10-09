import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Search from '@/pages/search';


const useStateMock = jest.spyOn(React, 'useState');

function renderSearch(keyword: string) {
  const exampleArticle = {
    title: 'sdf',
    authors: ['sdasd'],
    date: '0004-03-31',
    journal: 'sdf',
    volume: 2,
    issue: 2,
    pageRange: [3, 5],
    doi: 'dsfsdfsdfsdf',
    keywords: ['sda'],
    abstract: 'sfasd',
    isModerated: true,
  }
  const initialState = {
    message: '',
    keywords: [],
    filteredArticles: [exampleArticle],
  };

  const setDataMock = jest.fn();
  useStateMock.mockReturnValue([initialState, setDataMock]);

  return render(
    <MemoryRouter initialEntries={['/search?keywords=' + keyword]}>
      <Search />
    </MemoryRouter>
  );
}

test('should have search results', async () => {
  const keyword = 'sda';
  renderSearch(keyword);
  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText('DOI')).toBeInTheDocument();
  expect(screen.getByText('No Results')).not.toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
});

test('should have no search results', async () => {
  const keyword = 'asdhsd';
  renderSearch(keyword);
  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText('No Results')).toBeInTheDocument();
});
