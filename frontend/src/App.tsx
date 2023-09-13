import React, { useEffect, useState } from 'react'
import AddArticle from './components/AddArticle'
import ArticleItem from './components/ArticleItem';
import { getArticles, addArticle, updateArticle, deleteArticle } from './API'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
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

  const headerList = ["Title",
    "Author(s)",
    "Date",
    "Journal",
    "Volume",
    "Issue",
    "Page Range",
    "DOI",
    "Keywords",
    "Abstract"]

  return (
    <main className='App'>
      <h1>My Articles</h1>
      <Container fluid>
        <Table className="mb-5">
          <thead>
            <tr>
              {headerList.map((entry, entryID) => <th key={entryID}>{entry}</th>)}
            </tr>
          </thead>
          <tbody>
            {articles.map((article: IArticle) => (
              <ArticleItem
                key={article._id}
                updateArticle={handleUpdateArticle}
                deleteArticle={handleDeleteArticle}
                article={article}
              />
            ))}
          </tbody>
        </Table>
        <AddArticle saveArticle={handleSaveArticle} />
      </Container>
    </main>
  )
}

export default App