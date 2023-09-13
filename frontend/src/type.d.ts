/*
  Here, the IArticle interface needs to mirror the shape of 
  data from the API. And since we don't have mongoose here, 
  we need to add additional properties to match the type defined 
  on the API.

*/
interface IArticle {
  _id: string
  title: string
  authors: string[]
  date: string
  journal: string
  volume: number
  issue: number
  pageRange: number[]
  doi: string
  keywords: string[]
  abstract: string
}
/*
Next, we use that same interface for the ArticleProps which is
 the type annotation for the props that will be received by
  the component responsible for rendering the data.
*/
type ArticleProps = {
  article: IArticle
}

type ApiDataType = {
  message: string
  status: string
  articles: IArticle[]
  article?: IArticle
}