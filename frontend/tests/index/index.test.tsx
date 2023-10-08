import { render, screen } from '@testing-library/react';
import Index, { ArticleProps } from '../../src/pages/articles';
import '@testing-library/jest-dom';
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

function renderHome(props: Partial<ArticleProps> = {}) {
  const defaultProps: ArticleProps = {
    articleData: [],
  };
  return render(<Index {...defaultProps} {...props} />);
}

function renderHomeWithArticles(props: Partial<ArticleProps> = {}) {
  const defaultProps: ArticleProps = {
    articleData: tempArray,
  };
  return render(<Index {...defaultProps} {...props} />);
}

test('should have empty table', async () => {
  renderHome();
  expect(screen.getAllByTestId('data-table-body').length).toBe(1);
});

test('should have table with an article entry', async () => {
  renderHomeWithArticles();
  expect(screen.getByRole('table')).toBeInTheDocument();
});
