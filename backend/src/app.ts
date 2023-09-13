import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import articleRoutes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(articleRoutes)

const uri: string = process.env.MONGO_URI || "";
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

  export default app;