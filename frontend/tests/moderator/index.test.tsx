import { render, screen } from '@testing-library/react';
import Index, { IndexProps } from '@/pages/moderator';
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
    isModerated: false,
  },
] as QueuedArticle[];

function renderHome(props: Partial<IndexProps> = {}) {
  const defaultProps: IndexProps = {
    queueData: {
      message: '',
      articleData: [],
    },
    duplicates: [],
    rejected: [],
  };
  return render(<Index {...defaultProps} {...props} />);
}

function renderHomeWithArticles(props: Partial<IndexProps> = {}) {
  const defaultProps: IndexProps = {
    queueData: {
      message: '',
      articleData: tempArray,
    },
    duplicates: [],
    rejected: [],
  };
  return render(<Index {...defaultProps} {...props} />);
}

test('should have empty table', async () => {
  renderHome();
  expect(screen.getByText('No Articles Needing Moderation')).toBeInTheDocument();
});
//TODO add checking for dupe
test("should have table with an article entry and a 'Warnings' + 'Actions' column but no warnings if there are no duplicates", async () => {
  renderHomeWithArticles();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Warnings')).toBeInTheDocument();
  expect(screen.getByText('Actions')).toBeInTheDocument();
  //expect(screen.getByText('Duplicate')).not.toBeInTheDocument();
});

//TODO add checking for dupe
test("should have table with an article entry and a 'Warnings' + 'Actions' column and a 'Duplicate' warning if it exists in the database", async () => {
  renderHomeWithArticles();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Warnings')).toBeInTheDocument();
  expect(screen.getByText('Actions')).toBeInTheDocument();
  //expect(screen.getByText('Duplicate')).toBeInTheDocument();
});
