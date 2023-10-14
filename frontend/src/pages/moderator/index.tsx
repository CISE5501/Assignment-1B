import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { QueuedArticle } from '../../schema/queuedArticle';
import SortableTable, { ComputedRow, DataRow } from '../../../components/table/SortableTable';
import { GetServerSideProps } from 'next';
const DOMAIN = process.env.DOMAIN;

//props
export type PageProps = {
  queueData: QueuedArticle[];
  duplicates: string[];
  rejected: string[];
};

//calls data from the 'moderator' path to get the list of queued articles, duplicates and previously rejected articles
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { articleData: queueData } = await fetch(DOMAIN + 'moderator/index').then((data) => data.json());
    const { duplicateDOIs: duplicates } = await fetch(DOMAIN + 'moderator/duplicates').then((data) => data.json());
    const { rejectedDOIs: rejected } = await fetch(DOMAIN + 'moderator/rejected').then((data) => data.json());
    return {
      props: {
        queueData,
        duplicates,
        rejected,
      },
    };
  } catch (e: any) {
    console.log(e);
    return { props: { error: true } }
  }
};

//rejects a specified article from the queued article collection, and adds the id to the rejected collection
const deleteArticle = async (id: string) => {
  const res = await fetch(DOMAIN + `moderator/id/${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    alert('Article deleted successfully');
    window.location.reload();
  } else {
    console.error('Error deleting article:', res.statusText);
  }
};

const rejectArticle = async (id: string) => {
  const res = await fetch(DOMAIN + `moderator/id/${id}`, {
    method: 'POST',
  });
  if (res.ok) {
    alert('Article rejected successfully');
    deleteArticle(id);
  } else {
    console.error('Error rejecting article:', res.statusText);
  }
};

//sets the status of the specified article so that isModerated = true, marking it ready for analysis
const acceptArticle = async (id: string) => {
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

  const handleReject = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault;
    rejectArticle(id);
  };
  const handleAccept = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault;
    acceptArticle(id);
  };
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
            {duplicates?.includes(data.doi) ? <li style={warning}>Duplicate</li> : ''}
            {rejected?.includes(data.doi) ? <li style={warning}>Previously Rejected</li> : ''}
          </ul>
        ),
      },
      {
        computed: true,
        label: 'Actions',
        content: (data) => (
          <div>
            <button type="button" onClick={(event) => handleReject(event, data._id)}>
              Reject
            </button>
            <br />
            <button type="button" onClick={(event) => handleAccept(event, data._id)}>
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
      {!queueData || queueData.length === 0 ? (
        <strong>No Articles Needing Moderation</strong>
      ) : (
        <SortableTable headers={headersList} data={queueData} />
      )}
    </Container>
  );
};

export default Index;
