import { Router } from "express"
import { getArticles, addArticle, updateArticle, deleteArticle } from "../controllers/articles"

const router: Router = Router()

router.get("/articles", getArticles)

router.post("/add-article", addArticle)

router.put("/edit-article/:id", updateArticle)

router.delete("/delete-article/:id", deleteArticle)

export default router;