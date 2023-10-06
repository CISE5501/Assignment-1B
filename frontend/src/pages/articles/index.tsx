import { Article } from '@/schema/article';
import { GetServerSideProps } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import SortableTable, { DataRow } from '../../../components/table/SortableTable';
import DOMAIN from '../../../DOMAIN';

export interface ArticleProps {
  articleData: Article[];
}

//returns table using data from VALIDATED articles
const Index = ({ articleData }: ArticleProps) => {
  const headersList: DataRow<Article>[] = [
    { key: 'title', label: 'Title' },
    {
      key: 'authors',
      label: 'Authors',
      displayAs: (authors: string[]) => authors.join('; '),
    },
    { key: 'date', label: 'Date' },
    { key: 'journal', label: 'Journal' },
    { key: 'volume', label: 'Volume' },
    { key: 'issue', label: 'Issue' },
    {
      key: 'pageRange',
      label: 'Page Range',
      displayAs: ([start, end]: [number, number]) => start + '-' + end,
    },
    { key: 'doi', label: 'DOI' },
    {
      key: 'keywords',
      label: 'Keywords',
      displayAs: (keywords: string[]) => keywords.join(', '),
    },
    { key: 'abstract', label: 'Abstract' },
  ];

  return (
    <Container>
      <h1>Articles</h1>
      <SortableTable headers={headersList} data={articleData} />
    </Container>
  );
};

//calls data from backend- connected to /articles
export const getServerSideProps: GetServerSideProps = async () => {
  const { articleData } = await fetch(DOMAIN + 'articles').then((data) => data.json());
  return {
    props: {
      articleData,
    },
  };
};

export default Index;
