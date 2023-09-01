import React, { useEffect, useState } from 'react'
import ArticleItem from './components/ArticleItem'
import AddArticle from './components/AddArticle'
import { getArticles, addArticle, updateArticle, deleteArticle } from './API'

const App: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = (): void => {
    getArticles()
      .then(({ data: { articles } }: IArticle[] | any) => setArticles(articles))
      .catch((err: Error) => console.log(err))
  }
  const handleSaveArticle = (e: React.FormEvent, formData: IArticle): void => {
    e.preventDefault()
    addArticle(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Article not saved")
        }
        setArticles(data.articles)
      })
      .catch(err => console.log(err))
  }
  const handleUpdateArticle = (article: IArticle): void => {
    updateArticle(article)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Article not updated")
        }
        setArticles(data.articles)
      })
      .catch(err => console.log(err))
  }

  const handleDeleteArticle = (_id: string): void => {
    deleteArticle(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Article not deleted")
        }
        setArticles(data.articles)
      })
      .catch(err => console.log(err))
  }

  return (
    <main className='App'>
      <h1>My Articles</h1>
      <AddArticle saveArticle={handleSaveArticle} />
      {articles.map((article: IArticle) => (
        <ArticleItem
          key={article._id}
          updateArticle={handleUpdateArticle}
          deleteArticle={handleDeleteArticle}
          article={article}
        />
      ))}
    </main>
  )
}

export default App