import { cleanup, render, screen, within } from '@testing-library/react';
import Index, { PageProps } from '@/pages/moderator';
import '@testing-library/jest-dom';
import { QueuedArticle } from '../../src/schema/queuedArticle';

const tempArray = [
  {
    title: 't1',
    authors: ['a1', 'a2'],
    date: '2004-03-31',
    journal: 'j1',
    volume: 1,
    issue: 2,
    pageRange: [3, 5],
    doi: 'doi1',
    se_methods: ['scrum', 'agile'],
    claim: 'this is a claim',
    isModerated: false,
  },
  {
    title: 't2',
    authors: ['b1', 'b2'],
    date: '1232-03-31',
    journal: 'j2',
    volume: 14,
    issue: 2,
    pageRange: [3, 51],
    doi: 'doi2',
    se_methods: ['scrum', 'agile'],
    claim: 'this too is a claim',
    isModerated: false,
  },
  {
    title: 't3',
    authors: ['c1', 'c2'],
    date: '1232-03-31',
    journal: 'j3',
    volume: 14,
    issue: 2,
    pageRange: [3, 51],
    doi: 'doi3',
    se_methods: ['scrum', 'agile'],
    claim: 'this too is again a claim',
    isModerated: false,
  },
] as QueuedArticle[];

const duplicates = ['doi1', 'doi3', 'doi4'];
const rejected = ['doi1', 'doi2', 'doi5'];

function renderPage(articles: QueuedArticle[], duplicates: string[], rejected: string[]) {
  const defaultProps: PageProps = {
    queueData: articles,
    duplicates: duplicates,
    rejected: rejected,
  };
  return render(<Index {...defaultProps} />);
}

function checkHeaderContents(tHeader: HTMLElement) {
  const row = within(tHeader).getByRole('row');
  const columns = within(row).getAllByRole('columnheader');
  expect(columns.length).toBe(12);
}

afterEach(cleanup);

describe('Testing rendering without article entries', () => {
  test('Test 1: there are no duplicate or rejected entries', async () => {
    renderPage([], [], []);
    expect(screen.getByText(/No Articles Needing Moderation/i)).toBeInTheDocument();
  });

  test('Test 2: there are only entries for duplicates', async () => {
    renderPage([], ['asdkjfd', 'asdjhasd'], []);
    expect(screen.getByText(/No Articles Needing Moderation/i)).toBeInTheDocument();
  });

  test('Test 3: there are only entries for rejected articles', async () => {
    renderPage([], [], ['asdhsad', 'asd', 'asdasd']);
    expect(screen.getByText(/No Articles Needing Moderation/i)).toBeInTheDocument();
  });
});

describe('Testing table rendering: ', () => {
  test('Test 1: the table should have the following columns: title, authors, date, journal, volume, issue, page range, doi, se_methods, claim, warnings, actions', async () => {
    const { getByRole } = renderPage(tempArray, [], []);
    const table = getByRole('table');
    const theader = within(table).getAllByRole('rowgroup')[0];
    checkHeaderContents(theader);
  });
  //TODO
  test('Test 2: The rows should match the information from the article', async () => {
    const { getByRole } = renderPage(tempArray, [], []);
    const table = getByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const rows = within(tbody).getAllByRole('row');
    //checkRowContents(rows, tempArray);
  });
});

describe('Testing for duplicates: ', () => {
  test("Test 1: there is one article entry which isn't a duplicate, the warning cell should be blank", async () => {
    const { getByRole } = renderPage(tempArray.slice(0, 1), [], []);
    const table = getByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const columns = within(within(tbody).getByRole('row')).getAllByRole('cell');
    expect(columns[10]).toHaveTextContent('');
  });

  test('Test 2: there is one article entry which is a duplicate, the warning cell should say duplicate', async () => {
    const { getByRole } = renderPage(tempArray.slice(0, 1), duplicates, []);
    const table = getByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const columns = within(within(tbody).getByRole('row')).getAllByRole('cell');
    expect(columns[10]).toHaveTextContent(/duplicate/i);
  });

  test('Test 3: there are several article entries where two of them are duplicates, only their warning cells should say duplicate', async () => {
    const { getByRole } = renderPage(tempArray, duplicates, []);
    const table = getByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const cells = within(tbody).getAllByText(/duplicate/i);
    expect(cells.length).toBe(2);
  });
});

describe('Testing for rejected articles: ', () => {
  test("Test 1: there is one article entry which wasn't previously rejected, the warning cell should be blank", async () => {
    const { getByRole } = renderPage(tempArray.slice(0, 1), [], []);
    const table = getByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const columns = within(within(tbody).getByRole('row')).getAllByRole('cell');
    expect(columns[10]).toHaveTextContent('');
  });

  test('Test 2: there is one article entry which was previously rejected, the warning cell should say rejected', async () => {
    const { getByRole } = renderPage(tempArray.slice(0, 1), [], rejected);
    const table = getByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const columns = within(within(tbody).getByRole('row')).getAllByRole('cell');
    expect(columns[10]).toHaveTextContent(/previously rejected/i);
  });

  test('Test 3: there are several article entries where two of them were previously rejected, only their warning cells should say rejected', async () => {
    const { getByRole } = renderPage(tempArray, [], rejected);
    const table = getByRole('table');
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const cells = within(tbody).getAllByText(/previously rejected/i);
    expect(cells.length).toBe(2);
  });
});
