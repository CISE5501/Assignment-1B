import { render, screen } from '@testing-library/react';
import Index, { IndexProps } from '@/pages/analyst';
import '@testing-library/jest-dom';
import { QueuedArticle } from '../../src/schema/queuedArticle';

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
    isModerated: true,
  },
] as QueuedArticle[];

function renderHome(props: Partial<IndexProps> = {}) {
  const defaultProps: IndexProps = {
    queueData: [],
    duplicates: [],
  };
  return render(<Index {...defaultProps} {...props} />);
}

function renderHomeWithArticles(props: Partial<IndexProps> = {}) {
  const defaultProps: IndexProps = {
    queueData: tempArray,
    duplicates: [],
  };
  return render(<Index {...defaultProps} {...props} />);
}

test('should have empty table', async () => {
  renderHome();
  expect(screen.getAllByTestId('data-table-body').length).toBe(1);
});

test('should have table with an article entry and buttons to delete/mark analysis as complete', async () => {
  renderHomeWithArticles();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Accept')).toBeInTheDocument();
  expect(screen.getByText('Reject')).toBeInTheDocument();
});
