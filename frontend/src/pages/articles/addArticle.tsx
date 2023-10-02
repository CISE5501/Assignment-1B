import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import ArticleSubmissionForm from '../../../components/ArticleSubmissionForm';

const Index = () => {
  return (
    <Container>
      <p>Add New Article</p>

      <ArticleSubmissionForm />
    </Container>
  );
};

export default Index;
