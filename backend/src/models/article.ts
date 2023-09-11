import { IArticle } from "../types/article"
import { model, Schema } from "mongoose"

const articleSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        authors: {
            type: Array<String>,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        journal: {
            type: String,
            required: true,
        },

        volume: {
            type: Number,
            required: true,
        },

        issue: {
            type: Number,
            required: true,
        },

        pageRange: {
            type: Array<Number>,
            required: true,
        },

        doi: {
            type: String,
            required: true,
        },

        keywords: {
            type: Array<String>,
            required: false,
        },

        abstract: {
            type: String,
            required: false,
        },

    },
    { timestamps: true }
)


//pass in IArticle to the model before it gets exported
//now Article model can be used to interact with the database in other files

export default model<IArticle>("Article", articleSchema)