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