import 'bootstrap/dist/css/bootstrap.min.css';
import DOMAIN from '../../../DOMAIN';
import { GetServerSideProps } from 'next';
import { QueuedArticle } from '@/schema/queuedArticle';
import { Container, NavLink } from 'react-bootstrap';
import AnalystArticleSubmissionForm from '../../../components/AnalystArticleEditForm';

export interface QueuedArticleProps {
  existingArticle: QueuedArticle;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.id) {
    const { existingArticle } = await fetch(`${DOMAIN}analyst/id/${params.id}`).then((data) => data.json());
    return { props: { existingArticle } };
  }
  return {
    props: { error: true },
  };
};

export const Page = ({ existingArticle }: QueuedArticleProps) => {
  return (
    <Container>
      <div>
        <NavLink href="/analyst">Back</NavLink>
      </div>
      <AnalystArticleSubmissionForm info={existingArticle} />
    </Container>
  );
};

export default Page;
