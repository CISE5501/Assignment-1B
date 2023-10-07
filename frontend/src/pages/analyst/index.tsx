import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { QueuedArticle } from '../../schema/queuedArticle';
import SortableTable, { ComputedRow, DataRow } from '../../../components/table/SortableTable';
import { PageProps, getServerData } from '../../common/queueCommon';
import Link from 'next/link';

export type IndexProps = PageProps;
export const getServerSideProps = getServerData('analyst/index');

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
    { key: 'date', label: 'Date' },
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
      key: 'keywords',
      label: 'Keywords',
      displayAs: (keywords) => keywords.join(', '),
    },
    { key: 'abstract', label: 'Abstract' },
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
      {queueData.articleData ? <SortableTable headers={headersList} data={queueData.articleData} /> : <strong>No Articles Needing Analysis</strong>}
    </Container>
  );
};

export default Index;
