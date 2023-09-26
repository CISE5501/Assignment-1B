import { GetServerSideProps } from 'next';
import { QueuedArticle } from '@/src/schema/queuedArticle';
import DOMAIN from '@/DOMAIN';

export const getServerData: (url: string) => GetServerSideProps =
  (url) => async () => {
    const queueData = await fetch(DOMAIN + url).then((data) => data.json());
    const { duplicateDOIs: duplicates } = await fetch(
      DOMAIN + 'queue/duplicates',
    ).then((data) => data.json());
    return {
      props: {
        queueData,
        duplicates,
      },
    };
  };

export const handleDelete = async (data: QueuedArticle) => {
  try {
    const res = await fetch(DOMAIN + `articles/${data._id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      console.log('Article deleted successfully');
    } else {
      console.error('Error deleting article:', res.statusText);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

export interface PageProps {
  queueData: {
    message: string;
    articleData: QueuedArticle[];
  };
  duplicates: string[];
}
