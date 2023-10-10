import { GetServerSideProps } from 'next';
import { QueuedArticle } from '../schema/queuedArticle';
import DOMAIN from '@/common/DOMAIN';

export const getServerData: (url: string) => GetServerSideProps = (url) => async () => {
  try {
    const { articleData: queueData } = await fetch(DOMAIN + url).then((data) => data.json());
    const { duplicateDOIs: duplicates } = await fetch(DOMAIN + 'queue/duplicates').then((data) =>
      data.json(),
    );
    const { rejectedDOIs: rejected } = await fetch(DOMAIN + 'articles/rejected').then((data) => data.json());
    return {
      props: {
        queueData,
        duplicates,
        rejected,
      },
    };
  } catch {
    throw 'Failed to fetch resources. Please reload the page.';
  }
};

export const handleDelete = async (type: 'queue' | 'articles', data: QueuedArticle) => {
  try {
    const res = await fetch(DOMAIN + `${type}/id/${data._id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      alert('Article deleted successfully');
      window.location.reload();
    } else {
      console.error('Error deleting article:', res.statusText);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

export interface PageProps {
  queueData: QueuedArticle[];
  duplicates: string[];
  rejected: string[];
}
