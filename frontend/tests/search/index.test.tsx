import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Search from '@/pages/search';

function renderSearch(keyword: string) {
  return render(
    <MemoryRouter initialEntries={['/search?keywords=' + keyword]}>
      <Search />
    </MemoryRouter>,
  );
}

test('should have search results', async () => {
  const keyword = 'asd';
  renderSearch(keyword);
  expect(screen.getByText(`Results for "${keyword}"`)).toBeInTheDocument();
  expect(screen.getByText('DOI')).toBeInTheDocument();
  expect(screen.getByText('No Results')).not.toBeInTheDocument();
});

test('should have no search results', async () => {
  const keyword = 'djugihdfgdfgd';
  renderSearch(keyword);
  expect(screen.getByText(`Results for "${keyword}"`)).toBeInTheDocument();
  expect(screen.getByText('No Results')).toBeInTheDocument();
});
