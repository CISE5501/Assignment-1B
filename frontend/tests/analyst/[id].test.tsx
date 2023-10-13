import { render, screen } from '@testing-library/react';
import Page, { QueuedArticleProps } from '@/pages/analyst/[id]';
import '@testing-library/jest-dom';
import { QueuedArticle } from '../../src/schema/queuedArticle';

const egArticle = {
  title: 'sdf',
  authors: ['sdasd'],
  date: '2004-3-31',
  journal: 'sdf',
  volume: 2,
  issue: 2,
  pageRange: [3, 5],
  doi: 'dsfsdfsdfsdf',
  keywords: ['sad', 'asd'],
  claim: 'sfasd',
  isModerated: true,
} as QueuedArticle;

function renderEditor(props: Partial<QueuedArticleProps> = {}) {
  const defaultProps: QueuedArticleProps = {
    existingArticle: egArticle,
  };
  return render(<Page {...defaultProps} {...props} />);
}

test('should have input form with an article entry and ability to edit fields', async () => {
  renderEditor();
  expect(screen.getByRole('form')).toBeInTheDocument();
  expect(screen.getByDisplayValue('2004-03-31')).toBeInTheDocument();
  expect(screen.getByText('Article Title')).toBeInTheDocument();
  expect(screen.getByText('Add Author')).toBeInTheDocument();
  expect(screen.getByText('asd')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
});
