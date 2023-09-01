//fetch data
import axios, { AxiosResponse } from "axios"

const baseUrl: string = "http://localhost:4000"

export const getArticles = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const articles: AxiosResponse<ApiDataType> = await axios.get(
            baseUrl + "/articles"
        )
        return articles
    } catch (e) {
        console.log((e as Error).message);
        throw e
    }
}

export const addArticle = async (
    formData: IArticle
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const article: Omit<IArticle, "_id"> = {
            title: formData.title,
            author: formData.author,
            doi: formData.doi,
        }
        const saveArticle: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + "/add-article",
            article
        )
        return saveArticle
    } catch (e) {
        console.log((e as Error).message);
        throw e
    }
}

export const updateArticle = async (
    article: IArticle
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const articleUpdate: Pick<IArticle, "title"> = {
            title: "sdasd",
        }
        const updatedArticle: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/edit-article/${article._id}`,
            articleUpdate
        )
        return updatedArticle
    } catch (e) {
        console.log((e as Error).message);
        throw e
    }
}

export const deleteArticle = async (
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedArticle: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/delete-article/${_id}`
        )
        return deletedArticle
    } catch (e) {
        console.log((e as Error).message);
        throw e
    }
}