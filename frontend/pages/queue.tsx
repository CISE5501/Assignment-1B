import React from 'react';
import { QueuedArticle } from '@/src/schema/queuedArticle';
import { GetServerSideProps } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import QueueItem from '@/components/QueueItem';

interface QueueProps {
  queue: {
    message: string;
    articleData: QueuedArticle[];
  };
  duplicates: string[],
}

const headerList = [
  'Title',
  'Author(s)',
  'Date',
  'Journal',
  'Volume',
  'Issue',
  'Page Range',
  'DOI',
  'Keywords',
  'Abstract',
  'Moderated?',
  'Analysed?',
  'Duplicate?'
];

const Queue = ({ queue, duplicates }: QueueProps) => {
  const articleElements = queue.articleData.map((item, index) => (
    <QueueItem article={item} key={index} duplicates={duplicates} />
  ));

  return (
    <Container>
      <h1>Queued Articles</h1>
      {articleElements.length > 0 ? (
        <Table className="mb-5">
          <thead>
            <tr>
              {headerList.map((entry, entryID) => (
                <th key={entryID}>{entry}</th>
              ))}
            </tr>
          </thead>

          <tbody>{articleElements}</tbody>
        </Table>
      ) : (
        <div>No Articles in Queue!</div>
      )}
    </Container>
  );
};

const DOMAIN = 'https://nest-backend-janenotjung-hue.vercel.app/';

export const getServerSideProps: GetServerSideProps = async () => {
  const queueData = await fetch(DOMAIN + 'queue').then((data) => data.json());
  const { duplicateDOIs: duplicates } = await fetch(DOMAIN + 'queue/duplicates',).then((data) => data.json());
  return {
    props: {
      queue: queueData,
      duplicates,
    },
  };
};

export default Queue;
