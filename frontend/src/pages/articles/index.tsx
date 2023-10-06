import { Article } from '@/schema/article';
import { GetServerSideProps } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import SortableTable, { DataRow } from '../../../components/table/SortableTable';
import DOMAIN from '../../../DOMAIN';

type RatedArticle = Article & { rating: number | null };

export interface ArticleProps {
  articleData: RatedArticle[];
}

//returns table using data from VALIDATED articles
const Index = ({ articleData }: ArticleProps) => {
  const headersList: DataRow<RatedArticle>[] = [
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
    {
      key: 'rating',
      label: 'Star Rating',
      displayAs: (rating: number | null) => (
        <StarRatings
          name="rating"
          rating={Math.round(rating ?? 0)}
          numberOfStars={5}
          changeRating={() => { alert('TODO') }}
          starRatedColor="blue"
          starDimension="20px"
          starSpacing="1px"
        />
      ),
    },
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
  for (const article of articleData) {
    const { rating } = await fetch(DOMAIN + 'articles/rating/doi/' + article.doi).then(data => data.json());
    article.rating = rating;
  }
  return {
    props: {
      articleData,
    },
  };
};

export default Index;
