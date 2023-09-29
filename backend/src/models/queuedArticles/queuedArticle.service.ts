import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQueuedArticle } from 'src/models/queuedArticles/queuedArticle.interface';
import { CreateQueuedArticleDto } from 'src/models/queuedArticles/dto/create-article.dto';
import { UpdateQueuedArticleDto } from 'src/models/queuedArticles/dto/update-article.dto';

@Injectable()
export class QueuedArticleService {
  constructor(@InjectModel('QueuedArticle') private articleModel: Model<IQueuedArticle>) {}

  async createArticle(createArticleDto: CreateQueuedArticleDto): Promise<IQueuedArticle> {
    const newArticle = await new this.articleModel(createArticleDto);
    return newArticle.save();
  }

  async updateArticle(articleId: string, updateArticleDto: UpdateQueuedArticleDto): Promise<IQueuedArticle> {
    const existingArticle = await this.articleModel.findByIdAndUpdate(articleId, updateArticleDto, {
      new: true,
    });
    if (!existingArticle) {
      throw new NotFoundException(`Article #${articleId} not found`);
    }
    return existingArticle;
  }

  async getAllQueuedArticles(): Promise<IQueuedArticle[]> {
    const articleData = await this.articleModel.find();
    if (!articleData || articleData.length == 0) {
      throw new NotFoundException('Articles data not found!');
    }
    return articleData;
  }

  async getAllUnmoderatedArticles(): Promise<IQueuedArticle[]> {
    const articleData = await this.articleModel.find().where({ isModerated: false });
    if (!articleData || articleData.length == 0) {
      throw new NotFoundException('Articles data not found!');
    }
    return articleData;
  }

  async getAllModeratedArticles(): Promise<IQueuedArticle[]> {
    const articleData = await this.articleModel.find().where({ isModerated: true });
    if (!articleData || articleData.length == 0) {
      throw new NotFoundException('Articles data not found!');
    }
    return articleData;
  }

  async getArticle(articleId: string): Promise<IQueuedArticle> {
    const existingArticle = await this.articleModel.findById(articleId).exec();
    if (!existingArticle) {
      throw new NotFoundException(`Article #${articleId} not found`);
    }
    return existingArticle;
  }

  async deleteArticle(articleId: string): Promise<IQueuedArticle> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      throw new NotFoundException(`Article #${articleId} not found`);
    }
    return deletedArticle;
  }
}
