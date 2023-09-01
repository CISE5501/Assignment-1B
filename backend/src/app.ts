import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import articleRoutes from "./routes"
import exp from "constants"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(articleRoutes)

const uri: string =  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@5501cluster.12sz4ua.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })