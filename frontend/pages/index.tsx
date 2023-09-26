import React from 'react';
import { Article } from '@/src/schema/article';
import { GetServerSideProps } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import ArticleItem from '@/components/ArticleItem';
import DOMAIN from '@/DOMAIN';

interface IndexProps {
  data: {
    message: string;
    articleData: Article[];
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
];

const Index = ({ data }: IndexProps) => {
  const articleElements = data.articleData.map((item, index) => (
    <ArticleItem article={item} key={index} />
  ));

  return (
    <Container>
      <h1>Articles</h1>
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
  const data = await fetch(DOMAIN + 'articles').then(data => data.json());
  return {
    props: {
      data,
    },
  };
};

export default Index;
