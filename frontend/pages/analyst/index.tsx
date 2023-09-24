import React from 'react';
import { QueuedArticle } from '@/src/schema/queuedArticle';
import { GetServerSideProps } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import QueuedArticleItem from '@/components/QueuedArticleItem';
import Link from 'next/link';

interface IndexProps {
  data: {
    message: string;
    articleData: QueuedArticle[];
  };
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
  'Is Moderated',
];

const Index = ({ data }: IndexProps) => {
  const articleElements = data.articleData.map((item, index) => (
    <QueuedArticleItem article={item} key={index} />
  ));

  return (
    <Container>
      <Link href="/">Return Home</Link>
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
        <div>No Articles!</div>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://backend-mocha-ten.vercel.app/analyst/index',
  );
  const data = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
};

export default Index;
