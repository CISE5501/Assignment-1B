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

const uri: string | string = process.env.MONGO_URI || "localhost";
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on ${process.env.MONGO_URI}`)
    )
  )
  .catch(error => {
    throw error
  })