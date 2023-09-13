import { Router } from "express"
import { getHome, getArticles, addArticle, updateArticle, deleteArticle } from "../controllers/articles"

const router: Router = Router()

router.get("/", getArticles)

router.get("/articles", getArticles)

router.post("/add-article", addArticle)

router.put("/edit-article/:id", updateArticle)

router.delete("/delete-article/:id", deleteArticle)

export default router;