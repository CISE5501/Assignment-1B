import { IArticle } from "../types/article"
import { model, Schema } from "mongoose"

const articleSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        author: {
            type: String,
            required: true,
        },

        doi: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)


//pass in ITodo to the model before it gets exported
//now Todo model can be used to interact with the database in other files

export default model<IArticle>("Article", articleSchema)