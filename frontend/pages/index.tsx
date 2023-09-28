import React from 'react';
import { Article } from '@/src/schema/article';
import { GetServerSideProps } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import SortableTable from '@/components/table/SortableTable';
import Link from 'next/link';

import ArticleSubmissionForm from '@/components/ArticleSubmissionForm';

interface IndexProps {
  data: {
    message: string;
    articleData: Article[];
  };
}


//returns table using data from VALIDATED articles
const Index = ({ data }: IndexProps) => {
  const headersList: { key: keyof Article; label: string }[] = [
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
  ];

  const saveArticle = (e: React.FormEvent<Element>, formData: unknown): void => {
    e.preventDefault();
    console.log('saveArticle function called');
    console.log('Form Data:', formData);
  }

  return (
    <Container>
      <Link href="/addArticle">Add new Article</Link>
      <br></br>
      <Link href="/moderator">Moderator</Link>
      <br></br>
      <Link href="/analyst">Analyst</Link>
      <br></br>
      <SortableTable headers={headersList} data={data.articleData} />
    </Container>
  );
};

//calls data from backend- connected to /articles
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://backend-mocha-ten.vercel.app/articles');
  const data = await res.json();
  //console.log(data);
  return {
    props: {
      data,
    },
  };
};

export default Index;
