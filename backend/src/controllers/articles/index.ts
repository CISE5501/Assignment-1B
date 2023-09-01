import { Response, Request } from "express"
import { IArticle } from "./../../types/article"
import Article from "../../models/article"

/*
* Method to retrieve array of articles
* Parameters: Request, Response
* Returns: Promise 
*/
const getArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles: IArticle[] = await Article.find()
    res.status(200).json({ articles })
  } catch (error) {
    throw error
  }
}

/*
* Method to add a new Article into the database
* The method receives a body object that contains the data entered by user (form)
* Typecast to avoid typos and restrict body object to match IArticle variables
* Creates a new Article based on the model
* Returns a response that contains the created article and the updated article array
*/

const addArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IArticle, "title" | "author" | "doi">

    const article: IArticle = new Article({
      title: body.title,
      author: body.author,
      doi: body.doi,
    })

    const newArticle: IArticle = await article.save()
    const allArticles: IArticle[] = await Article.find()

    res
      .status(201)
      .json({ message: "Article added", Article: newArticle, Articles: allArticles })
  } catch (error) {
    throw error
  }
}

/* 
* Method that updates an article stored in database
* Uses the id extracted from the req object and passes to findByIdAndUpdate()
* Returns updated data to user
*/
const updateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const updateArticle: IArticle | null = await Article.findByIdAndUpdate(
      { _id: id },
      body
    )
    const allArticles: IArticle[] = await Article.find()
    res.status(200).json({
      message: "Article updated",
      article: updateArticle,
      articles: allArticles,
    })
  } catch (error) {
    throw error
  }
}

/* 
* Method that deletes an article stored in database
* Uses the id extracted from the req object and passes to findByIdAndRemove()
* Returns updated data to user
*/
const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedArticle: IArticle | null = await Article.findByIdAndRemove(
      req.params.id
    )
    const allArticles: IArticle[] = await Article.find()
    res.status(200).json({
      message: "Article deleted",
      article: deletedArticle,
      articles: allArticles,
    })
  } catch (error) {
    throw error
  }
}

export { getArticles, addArticle, updateArticle, deleteArticle }