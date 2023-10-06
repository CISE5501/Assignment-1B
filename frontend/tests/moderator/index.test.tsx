import { render, screen } from '@testing-library/react';
import Index, { IndexProps } from '@/pages/moderator/index';
import '@testing-library/jest-dom';
import { QueuedArticle } from '@/src/schema/queuedArticle';

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
  };
  return render(<Index {...defaultProps} {...props} />);
}

function renderWithoutDuplicate(props: Partial<IndexProps> = {}) {
  const defaultProps: IndexProps = {
    queueData: {
      message: '',
      articleData: tempArray,
    },
    duplicates: []
  };
  return render(<Index {...defaultProps} {...props} />);
}

function renderWithDuplicate(props: Partial<IndexProps> = {}) {
    const defaultProps: IndexProps = {
      queueData: {
        message: '',
        articleData: tempArray,
      },
      duplicates: ['dsfsdfsdfsdf']
    };
    return render(<Index {...defaultProps} {...props} />);
  }

test('should have empty table', async () => {
  renderHome();
  expect(screen.getAllByTestId('data-table-body').length).toBe(1);
});

test("should have table with an article entry and an 'Is Moderated' column", async () => {
    renderWithoutDuplicate();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByTestId('Warnings').innerHTML).toBe('');
});

test("should have table with an article entry and an 'Is Moderated' column", async () => {
    renderWithDuplicate();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByTestId('Warnings').innerHTML).not.toBe('');
});