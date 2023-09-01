import React from "react"

type Props = ArticleProps & {
  updateArticle: (article: IArticle) => void
  deleteArticle: (_id: string) => void
}

const Article: React.FC<Props> = ({ article, updateArticle, deleteArticle }) => {
  return (
    <div className="Card">
      <div className="Card--text">
        <h1>{article.title}</h1>
        <span>{article.author}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => updateArticle(article)}>
          Complete
        </button>
        <button
          onClick={() => deleteArticle(article._id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Article