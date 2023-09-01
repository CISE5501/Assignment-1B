import { Document } from "mongoose" //Document used to communicate with mongodb

export interface IArticle extends Document {
  title: string
  author: string
  doi: string
}