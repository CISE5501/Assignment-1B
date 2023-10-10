import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { QueuedArticle } from '../../schema/queuedArticle';
import SortableTable, { ComputedRow, DataRow } from '../../../components/table/SortableTable';
import { PageProps, handleDelete, getServerData } from '../../common/queueCommon';
import DOMAIN from '@/common/DOMAIN';

export type IndexProps = PageProps;
export const getServerSideProps = getServerData('moderator/index');

const promote = async (id: string): Promise<void> => {
  const response = await fetch(DOMAIN + 'moderator/promote/id/' + id, {
    method: 'PUT',
  });
  if (response.ok) {
    alert('Successfully marked article as moderated.');
    window.location.reload();
  } else {
    alert('Failed to mark article as moderated.');
  }
};

//returns table using data from queuedArticles where isModerated = false
const Index = ({ queueData, duplicates, rejected }: PageProps) => {
  const warning = { fontWeight: 'bold' };
  const headersList: (
    | (DataRow<QueuedArticle> & { key: keyof QueuedArticle })
    | ComputedRow<QueuedArticle>
  )[] = [
    { key: 'title', label: 'Title' },
    {
      key: 'authors',
      label: 'Authors',
      displayAs: (authors: string[]) => authors.join('; '),
    },
    { key: 'date', label: 'Date' },
    { key: 'journal', label: 'Journal' },
    { key: 'volume', label: 'Volume' },
    { key: 'issue', label: 'Issue' },
    {
      key: 'pageRange',
      label: 'Page Range',
      displayAs: ([start, end]: [number, number]) => start + '-' + end,
    },
    { key: 'doi', label: 'DOI' },
    {
      key: 'keywords',
      label: 'Keywords',
      displayAs: (keywords: string[]) => keywords.join(', '),
    },
    { key: 'abstract', label: 'Abstract' },
    {
      computed: true,
      label: 'Warnings',
      content: (data) => (
        <ul>
          {duplicates.includes(data.doi) ? <li style={warning}>Duplicate</li> : ''}
          {rejected.includes(data.doi) ? <li style={warning}>Previously Rejected</li> : ''}
        </ul>
      ),
    },
    {
      computed: true,
      label: 'Actions',
      content: (data) => (
        <div>
          <button type="button" onClick={() => handleDelete('queue', data)}>
            Reject
          </button>
          <br />
          <button type="button" onClick={() => promote(data._id)}>
            Accept
          </button>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <h1>Moderator View</h1>
      <h2>Articles in Queue Pending Moderation</h2>
      {queueData.length === 0 ? (
        <strong>No Articles Needing Moderation</strong>
      ) : (
        <SortableTable headers={headersList} data={queueData} />
      )}
    </Container>
  );
};

export default Index;
