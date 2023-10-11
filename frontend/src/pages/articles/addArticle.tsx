import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import ArticleSubmissionForm from '../../../components/form/ArticleSubmissionForm';

const Index = () => {
  return (
    <Container>
      <h1>Add New Article</h1>
      <ArticleSubmissionForm />
    </Container>
  );
};

export default Index;
