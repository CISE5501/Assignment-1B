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
    queueData: [],
    duplicates: [],
    rejected: [],
  };
  return render(<Index {...defaultProps} {...props} />);
}

function renderWithoutDuplicate(props: Partial<IndexProps> = {}) {
  const defaultProps: IndexProps = {
    queueData: tempArray,
    duplicates: [],
    rejected: [],
  };
  return render(<Index {...defaultProps} {...props} />);
}

function renderWithDuplicate(props: Partial<IndexProps> = {}) {
  const defaultProps: IndexProps = {
    queueData: tempArray,
    duplicates: ['dsfsdfsdfsdf'],
  };
  return render(<Index {...defaultProps} {...props} />);
}
test('should have empty table', async () => {
  renderHome();
  expect(screen.getByText('No Articles Needing Moderation')).toBeInTheDocument();
});
//TODO add checking for dupe
test("should have table with an article entry and a 'Warnings' + 'Actions' column but no warnings if there are no duplicates", async () => {
  renderWithoutDuplicate();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Warnings')).toBeInTheDocument();
  expect(screen.getByText('Actions')).toBeInTheDocument();
  //expect(screen.getByText('Duplicate')).not.toBeInTheDocument();
});

test("should have table with an article entry and a 'Warning' column that has no value", async () => {
  renderWithoutDuplicate();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByTestId('Warnings').innerHTML).toBe('');
});

test("should have table with an article entry and a 'Warning' column that says 'Duplicate'", async () => {
  renderWithDuplicate();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByTestId('Warnings').innerHTML).not.toBe('');
});
