import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import DOMAIN from '../../../DOMAIN';
import { GetServerSideProps } from 'next';
import { QueuedArticle } from '@/schema/queuedArticle';
import { Container, NavLink } from 'react-bootstrap';
import AnalystArticleSubmissionForm from '../../../components/AnalystArticleEditForm';

export interface QueuedArticleProps {
  articleInfo: {
    message: string
    existingArticle: QueuedArticle
  }
}

export const getServerSideProps: GetServerSideProps = async({params}) => {
  if(params && params.id) {
    //console.log(params.id);
    const articleInfo =  await fetch(`${DOMAIN}analyst/id/${params.id}`).then((data) => data.json());
    return {props: {articleInfo}}
  }
  return {
    props: { error: true },
  };
};

export const Page = ({articleInfo}: QueuedArticleProps) => {
  //console.log(articleInfo);
  return (
    <Container>
      <div>
        <NavLink href='/analyst'>Back</NavLink>
      </div>
      <AnalystArticleSubmissionForm info={articleInfo.existingArticle}/>
    </Container>
  )
};

export default Page;