import { render, screen } from '@testing-library/react';
import Index, { ArticleProps } from '../../src/pages/articles';
import '@testing-library/jest-dom';
import { RatedArticle } from '../../src/pages/articles';

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
    se_methods: ['sad', 'asd'],
    claim: 'sfasd',
    rating: 4,
  },
] as RatedArticle[];

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

test('should have table with an article entry', async () => {
  renderHomeWithArticles();
  expect(screen.getByRole('table')).toBeInTheDocument();
});

test('should have star rating', async () => {
  renderHomeWithArticles();
  expect(screen.getByTitle('4 Stars')).toBeInTheDocument();
});
