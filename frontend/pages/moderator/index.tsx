import React from 'react';
import { QueuedArticle } from '@/src/schema/queuedArticle';
import { GetServerSideProps } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import SortableTable from '@/components/table/SortableTable';
import Link from 'next/link';

interface IndexProps {
  data: {
    message: string;
    articleData: QueuedArticle[];
  };
}

const Index = ({ data }: IndexProps) => {
  const headersList: { key: keyof QueuedArticle; label: string }[] = [
    { key: 'title', label: 'Title' },
    { key: 'authors', label: 'Authors' },
    { key: 'date', label: 'Date' },
    { key: 'journal', label: 'Journal' },
    { key: 'volume', label: 'Volume' },
    { key: 'issue', label: 'Issue' },
    { key: 'pageRange', label: 'Page Range' },
    { key: 'doi', label: 'DOI' },
    { key: 'keywords', label: 'Keywords' },
    { key: 'abstract', label: 'Abstract' },
    { key: 'isModerated', label: 'Is Moderated' },
  ];

  return (
    <Container>
      <Link href="/">Return Home</Link>
      <br></br>
      <SortableTable headers={headersList} data={data.articleData} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://backend-mocha-ten.vercel.app/moderator/index',
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
