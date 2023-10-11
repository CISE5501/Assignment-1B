import { render, screen } from '@testing-library/react';
import Index, { PageProps } from '@/pages/analyst';
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

function renderHome(props: Partial<PageProps> = {}) {
  const defaultProps: PageProps = {
    queueData: [],
  };
  return render(<Index {...defaultProps} {...props} />);
}

function renderHomeWithArticles(props: Partial<PageProps> = {}) {
  const defaultProps: PageProps = {
    queueData: tempArray,
  };
  return render(<Index {...defaultProps} {...props} />);
}

test('should have empty table', async () => {
  renderHome();
  expect(screen.getByText('No Articles Needing Analysis')).toBeInTheDocument();
});

test('should have table with an article entry and buttons to analyse', async () => {
  renderHomeWithArticles();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Actions')).toBeInTheDocument();
  expect(screen.getByText('Edit')).toBeInTheDocument();
});
