import React from 'react';
import { GetServerSideProps } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Link from 'next/link';

import ArticleSubmissionForm from '@/components/ArticleSubmissionForm';

const Index = () => {
  return (
    <Container>
      <Link href="/">Return Home</Link>
      <ArticleSubmissionForm />
    </Container>
  );
};


export default Index;
