import React from 'react';
import { QueuedArticle } from '@/src/schema/queuedArticle';
interface Props {
  article: QueuedArticle;
}

const QueuedArticleItem: React.FC<Props> = ({ article }) => {
  return (
    <tr>
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
      <td data-testid='isModerated'>{(article.isModerated === true ? "true" : "false")}</td>
    </tr>
  );
};

export default QueuedArticleItem;
