import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Container } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Article } from '@/schema/article';
import SortableTable, { DataRow } from '../../../components/table/SortableTable';
import DOMAIN from '../../../DOMAIN';

export type RatedArticle = Article & { rating: number | null };

export interface ArticleProps {
  articleData: RatedArticle[];
}

//returns table using data from VALIDATED articles
const Index = ({ articleData }: ArticleProps) => {
  useEffect(() => {
    // Set user ID cookie on load
    const userId = Cookies.get('userId');
    if (!userId) {
      const randomUserId = Math.random().toString(36).substring(7);
      Cookies.set('userId', randomUserId, { expires: 365 /*days*/ });
    }
  }, []);

  const handleRatingChange = async (rating: number, doi: string) => {
    try {
      const userId = Cookies.get('userId');
      const updatedRating = { userId, rating, doi };
      const reqData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRating),
      };
      await fetch(DOMAIN + 'articles/rate', reqData);
      console.log('Updated star rating: ' + rating + '/5');
      window.location.reload();
    } catch {
      alert('Failed to update star rating');
    }
  };

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
      displayAs: (rating: number | null, data) => (
        <StarRatings
          name="rating"
          rating={Math.round(rating ?? 0)}
          numberOfStars={5}
          changeRating={(newRating: number) => {
            handleRatingChange(newRating, data.doi);
          }}
          starRatedColor="blue"
          starHoverColor="darkcyan"
          starDimension="20px"
          starSpacing="1px"
        />
      ),
    },
  ];

  return (
    <Container>
      <h1>Articles</h1>
      {articleData.length === 0 ? 'No Results' : <SortableTable headers={headersList} data={articleData} />}
    </Container>
  );
};

//calls data from backend- connected to /articles
export const getServerSideProps: GetServerSideProps = async () => {
  const { articleData } = await fetch(DOMAIN + 'articles').then((data) => data.json());
  for (const article of articleData) {
    const { rating } = await fetch(DOMAIN + 'articles/rating?doi=' + article.doi).then((data) => data.json());
    article.rating = rating ?? null;
  }
  return {
    props: {
      articleData,
    },
  };
};

export default Index;
