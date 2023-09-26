import React from 'react';
import { QueuedArticle } from '@/src/schema/queuedArticle';
import DOMAIN from '@/DOMAIN';

interface Props {
  article: QueuedArticle;
  key: number;
  duplicates: string[],
}

const ArticleItem: React.FC<Props> = ({ article, key, duplicates }) => {

  const handleDelete = async () => {
    try {
      const res = await fetch(DOMAIN + `articles/${article._id}`, { method: 'DELETE' });
      if (res.ok) {
        console.log('Article deleted successfully');
      } else {
        console.error('Error deleting article:', res.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <tr key={key}>
      <td>{article.title}</td>
      <td>{article.authors}</td>
      <td>{article.date}</td>
      <td>{article.journal}</td>
      <td>{article.volume}</td>
      <td>{article.issue}</td>
      <td>
        {article.pageRange[0]}-{article.pageRange[1]}
      </td>
      <td>{article.doi}</td>
      <td>{article.keywords}</td>
      <td>{article.abstract}</td>
      <td>{article.isModerated ? 'To Analyse' : 'To Moderate'}</td>
      <td>{duplicates.includes(article.doi) ? <strong>Yes</strong> : <span>No</span>}</td>
      <td>
        <button type="button" onClick={handleDelete}>Remove</button>
      </td>
    </tr >
  );
};

export default ArticleItem;
