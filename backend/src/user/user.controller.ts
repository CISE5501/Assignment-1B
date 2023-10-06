import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { CreateQueuedArticleDto } from 'src/models/queuedArticles/dto/create-article.dto';
import { ArticleService } from 'src/models/articles/article.service';
import { QueuedArticleService } from 'src/models/queuedArticles/queuedArticle.service';
import { CreateRatingDto } from 'src/models/ratings/dto/create-rating.dto';
import { StarRatingService } from 'src/models/ratings/starRating.service';

//controller- routes articles to get/post methods

@Controller('articles')
export class UserController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly queuedArticleService: QueuedArticleService,
    private readonly starRatingService: StarRatingService,
  ) {}

  @Get()
  async getArticles(@Res() response) {
    try {
      const articleData = await this.articleService.getAllArticles();
      return response.status(HttpStatus.OK).json({
        message: 'All articles data found successfully',
        articleData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/filter')
  async findArticlesByQuery(@Query('keywords') keywords: string, @Res() response) {
    try {
      const articleData = await this.articleService.getAllArticles();
      const filteredArticles: typeof articleData = [];
      for (const keyword of keywords.split(',')) {
        filteredArticles.push(
          ...articleData.filter((article) => JSON.stringify(Object.values(article)).includes(keyword)),
        );
      }

      return response.status(HttpStatus.OK).json({
        message: 'Filtered articles data found successfully',
        keywords: keywords.split(','),
        filteredArticles,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/id/:id')
  async getArticle(@Res() response, @Param('id') articleId: string) {
    try {
      const existingArticle = await this.articleService.getArticle(articleId);
      return response.status(HttpStatus.OK).json({
        message: 'Article found successfully',
        existingArticle,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/includes/id/:id')
  async doesArticleExist(@Res() response, @Param('id') articleId: string) {
    try {
      await this.articleService.getArticle(articleId);
      return response.status(HttpStatus.OK).json({
        message: 'Article found successfully',
        exists: true,
      });
    } catch (err) {
      return response.status(HttpStatus.OK).json({
        message: 'Article does not exist',
        exists: false,
      });
    }
  }

  @Post('/new')
  async createArticle(@Res() response, @Body() createArticleDto: CreateQueuedArticleDto) {
    try {
      const newArticle = await this.queuedArticleService.createArticle(createArticleDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Article has been created successfully',
        newArticle,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Article not created!',
      });
    }
  }

  @Post('/rate')
  async rateArticle(@Res() response, @Body() createRatingDto: CreateRatingDto) {
    try {
      const newRating = await this.starRatingService.createRating(createRatingDto);
      return response.status(HttpStatus.OK).json({
        message: 'Article rated successfully',
        data: newRating,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Article not rated',
        data: {},
      });
    }
  }
}
