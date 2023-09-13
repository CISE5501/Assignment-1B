//fetch data
import axios, { AxiosResponse } from "axios"

const baseUrl: string = "https://backend-ore9irwx5-janenotjung-hue.vercel.app"

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
            authors: formData.authors,
            date: formData.date,
            journal: formData.journal,
            volume: formData.volume,
            issue: formData.issue,
            pageRange: formData.pageRange,
            doi: formData.doi,
            keywords: formData.keywords,
            abstract: formData.abstract,
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