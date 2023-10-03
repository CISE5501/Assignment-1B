import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import DOMAIN from '../../../DOMAIN';
import { GetServerSideProps } from 'next';
import { QueuedArticle } from '@/schema/queuedArticle';
import { Container } from 'react-bootstrap';
import AnalystArticleSubmissionForm from '../../../components/AnalystArticleEditForm';

export interface QueuedArticleProps {
  articleInfo: {
    message: string
    existingArticle: QueuedArticle
  }
}

export const getServerSideProps: GetServerSideProps = async({params}) => {
  if(params && params.id) {
    console.log(params.id);
    const response =  await fetch(DOMAIN + `analyst/${params.id}`);
    const articleInfo = await response.json();
    return {props: {articleInfo}}
  }
  return {
    props: { error: true },
  };
};

export const handleData = () => {

}

export const Page = ({articleInfo}: QueuedArticleProps) => {
  console.log(articleInfo);
  return (
    <Container>
      <AnalystArticleSubmissionForm info={articleInfo.existingArticle}/>
    </Container>
  )
};

export default Page;