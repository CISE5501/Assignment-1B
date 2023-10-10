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

  async deleteArticles(): Promise<void> {
    const response = await this.articleModel.deleteMany({});
    if (!response) {
      throw new NotFoundException(`Articles not deleted`);
    }
  }

  async createArticleExamples(): Promise<IArticle> {
    const addedArticles = await this.articleModel.insertMany([
      {
        title: 't1',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 't2',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 't3',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 't4',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 't5',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 't6',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 't7',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 't8',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 't9',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 'v1',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 'v2',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 'v3',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
      {
        title: 'v4',
        authors: ['first author', 'second author'],
        date: '2023-01-23',
        journal: 1,
        volume: 1,
        issue: 1,
        pageRange: [12, 23],
        doi: 'doi:102.1000/22343',
        keywords: ['SCRUM', 'Agile'],
        abstract: 'ashdkasjhd',
      },
    ]);
    return;
  }
}
