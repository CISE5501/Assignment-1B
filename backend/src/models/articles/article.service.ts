import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IArticle } from 'src/models/articles/article.interface';
import { CreateArticleDto } from 'src/models/articles/dto/create-article.dto';
import { UpdateArticleDto } from 'src/models/articles/dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('Article') private articleModel: Model<IArticle>) {}

  async getAllArticles(): Promise<IArticle[]> {
    const articleData = await this.articleModel.find();
    if (!articleData || articleData.length == 0) {
      throw new NotFoundException('Articles data not found!');
    }
    return articleData;
  }

  async getArticle(articleId: string): Promise<IArticle> {
    const existingArticle = await this.articleModel.findById(articleId).exec();
    if (!existingArticle) {
      throw new NotFoundException(`Article #${articleId} not found`);
    }
    return existingArticle;
  }

  async getArticleByDoi(doi: string): Promise<IArticle> {
    const existingArticle = await this.articleModel.findOne({ doi }).exec();
    if (!existingArticle) {
      throw new NotFoundException(`Article ${doi} not found`);
    }
    return existingArticle;
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<IArticle> {
    const newArticle = await new this.articleModel(createArticleDto);
    return newArticle.save();
  }

  async updateArticle(articleId: string, updateArticleDto: UpdateArticleDto): Promise<IArticle> {
    const existingArticle = await this.articleModel.findByIdAndUpdate(articleId, updateArticleDto, {
      new: true,
    });
    if (!existingArticle) {
      throw new NotFoundException(`Article #${articleId} not found`);
    }
    return existingArticle;
  }

  async deleteArticle(articleId: string): Promise<IArticle> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      throw new NotFoundException(`Article #${articleId} not found`);
    }
    return deletedArticle;
  }
}
