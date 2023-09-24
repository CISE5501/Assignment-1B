import React from 'react';
import { QueuedArticle } from '@/src/schema/queuedArticle';

interface Props {
  article: QueuedArticle;
  key: number;
  duplicates: string[],
}

const ArticleItem: React.FC<Props> = ({ article, key, duplicates }) => {
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
      <td>{article.isModerated ? <strong>Yes</strong> : <span>No</span>}</td>
      <td>No</td>
      <td>{duplicates.includes(article.doi) ? <strong>Yes</strong> : <span>No</span>}</td>
    </tr>
  );
};

export default ArticleItem;
