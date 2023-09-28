import { render, screen } from '@testing-library/react';
import Index, { IndexProps } from '@/pages';
import '@testing-library/jest-dom';
import { Article } from '@/src/schema/article';

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

function renderHome(props: Partial<IndexProps> = {}) {
  const defaultProps: IndexProps = {
    data: {
      message: '',
      articleData: [],
    },
  };
  return render(<Index {...defaultProps} {...props} />);
}

function renderHomeWithArticles(props: Partial<IndexProps> = {}) {
  const defaultProps: IndexProps = {
    data: {
      message: '',
      articleData: tempArray,
    },
  };
  return render(<Index {...defaultProps} {...props} />);
}

test('should display 3 links', async () => {
  renderHome();
  expect(screen.getByText('Add new Article')).toBeInTheDocument();
  expect(screen.getByText('Moderator')).toBeInTheDocument();
  expect(screen.getByText('Analyst')).toBeInTheDocument();
});

test('should have empty table', async () => {
  renderHome();
  expect(screen.getAllByTestId('data-table-body').length).toBe(1);
});

test('should have table with an article entry', async () => {
  renderHomeWithArticles();
  expect(screen.getByRole('table')).toBeInTheDocument();
});
