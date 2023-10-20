import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { QueuedArticle } from '../../schema/queuedArticle';
import SortableTable, { ComputedRow, DataRow } from '../../../components/table/SortableTable';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { formatDate } from '@/common';
const DOMAIN = process.env.DOMAIN;

//props
export type PageProps = {
  queueData: QueuedArticle[];
};

//gets a list of moderated articles from the server through 'analyst/index' path
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { articleData: queueData } = await fetch(DOMAIN + 'analyst/index').then((data) => data.json());
    return {
      props: {
        queueData,
      },
    };
  } catch {
    throw new Error(
      'Failed to fetch resources. Is the database offline? Please reload the page and try again.',
    );
  }
};

const Index = ({ queueData }: PageProps) => {
  const headersList: (
    | (DataRow<QueuedArticle> & { key: keyof QueuedArticle })
    | ComputedRow<QueuedArticle>
  )[] = [
      { key: 'title', label: 'Title' },
      {
        key: 'authors',
        label: 'Authors',
        displayAs: (authors) => authors.join('; '),
      },
      { key: 'date', label: 'Date', displayAs: formatDate },
      { key: 'journal', label: 'Journal' },
      { key: 'volume', label: 'Volume' },
      { key: 'issue', label: 'Issue' },
      {
        key: 'pageRange',
        label: 'Page Range',
        displayAs: ([start, end]) => start + '-' + end,
      },
      { key: 'doi', label: 'DOI' },
      {
        key: 'se_methods',
        label: 'SE Methods',
        displayAs: (se_methods) => se_methods.join(', '),
      },
      { key: 'claim', label: 'Claim' },
      {
        computed: true,
        label: 'Actions',
        content: (data) => (
          <div>
            <br />
            <Link href={`analyst/${data._id}`}>Edit</Link>
          </div>
        ),
      },
    ];

  return (
    <Container>
      <h1>Analyst View</h1>
      <h2>Articles in Queue Pending Analysis</h2>
      {queueData.length === 0 ? (
        <strong>No Articles Needing Analysis</strong>
      ) : (
        <SortableTable headers={headersList} data={queueData} />
      )}
    </Container>
  );
};

export default Index;
