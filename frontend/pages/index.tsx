import { Article } from '@/src/schema/article';
import { GetServerSideProps } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import ArticleItem from '@/components/ArticleItem';
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
      <h1>Articles in Database</h1>

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

      <h1>Article Form</h1>

      <form>
        <label>
          Article Title:
          <input type="text" />
        </label>
        <br/>
        <label>
          Author:
          <input type="text" />
          <button type="button">+</button>
        </label>
        <br/>
        <label>
          Keywords:
          <input type="text" />
        </label>
        <br/>
        <label>
          Journal:
          <input type="text" />
        </label>
        <br/>
        <label>
          Date:
          <input type="date" />
        </label>
        <br/>
        <label>
          DOI:
          <input type="text" />
        </label>
        <br/>
        <label>
          Volume:
          <input type="number" />
        </label>
        <br/>
        <label>
          Issue:
          <input type="number" />
        </label>
        <br/>
        <label>
          Page Range:
          <input type="number" />
          <input type="number" />
        </label>
        <br/>
        <label>
            <button type="button">submit</button>
        </label>
      </form>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://nest-backend-janenotjung-hue.vercel.app/articles/',
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
