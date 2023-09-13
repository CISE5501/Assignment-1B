import React from "react"

type Props = ArticleProps & {
  updateArticle: (article: IArticle) => void
  deleteArticle: (_id: string) => void
}

const Article: React.FC<Props> = ({ article, updateArticle, deleteArticle }) => {
  return (
    <tr>
      <td>{article.title}</td>
      <td>{article.authors}</td>
      <td>{article.date}</td>
      <td>{article.journal}</td>
      <td>{article.volume}</td>
      <td>{article.issue}</td>
      <td>{article.pageRange[0]}-{article.pageRange[1]}</td>
      <td>{article.doi}</td>
      <td>{article.keywords}</td>
      <td>{article.abstract}</td>
    </tr>
  )
}

export default Article