import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { CreateQueuedArticleDto } from 'src/models/queuedArticles/dto/create-article.dto';
import { ArticleService } from 'src/models/articles/article.service';
import { QueuedArticleService } from 'src/models/queuedArticles/queuedArticle.service';
import { CreateRatingDto } from 'src/models/ratings/dto/create-rating.dto';
import { StarRatingService } from 'src/models/ratings/starRating.service';

/*
  Routes paths with prefix '/articles' in the URL to functions declared in service modules.
  This controller contains functions accessible by any public user:
    - Getting a list of article objects with/without filters applied
    - Getting a specified queuedArticle object
    - Getting a specified rating object
    - Posting a new rating object
    - Posting a new queuedArticle object
*/
@Controller('articles')
export class UserController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly queuedArticleService: QueuedArticleService,
    private readonly starRatingService: StarRatingService,
  ) {}

  // getArticles: Retrieves all stored article objects from articles database
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

  // findArticlesByQuery: Retrieves a list of article objects that are relevant to a specific method or methods (keywords)
  @Get('/filter')
  async findArticlesByQuery(
    @Query('keywords') keywords: string,
    @Query('field') field: string,
    @Res() response,
  ) {
    try {
      const articleData = await this.articleService.getAllArticles();
      const filteredArticles: typeof articleData = [];
      for (const keyword of keywords.split(',')) {
        filteredArticles.push(
          ...articleData.filter((article) => {
            const searchItems = field === 'all' ? Object.values(article) : article[field];
            const searchString = JSON.stringify(searchItems);
            return searchString.toLowerCase().includes(keyword.toLowerCase());
          }),
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

  // getArticle: returns an article object stored in the database if it matches the queried id in the URL
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

  // getArticleRating: used to return the rating value (stored in rating database) that corresponds with the queried doi
  @Get('/rating')
  async getArticleRating(@Res() response, @Query('doi') doi: string) {
    try {
      const rating = await this.starRatingService.getAverageRating(decodeURIComponent(doi));
      return response.status(HttpStatus.OK).json({
        message: 'Article rating fetched successfully',
        rating,
      });
    } catch (err) {
      return response.status(HttpStatus.OK).json({
        message: 'Article rating fetching failed',
        rating: null,
      });
    }
  }

  // sends a new queuedArticle object to the queuedArticles database for moderation.
  @Post('/new')
  async createArticle(@Res() response, @Body() createArticleDto: CreateQueuedArticleDto) {
    try {
      const newArticle = await this.queuedArticleService.createQueuedArticle(createArticleDto);
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

  // sends a new rating object to the ratings database
  @Post('/rate')
  async rateArticle(@Res() response, @Body() createRatingDto: CreateRatingDto) {
    try {
      const newRating = await this.starRatingService.addRating(createRatingDto);
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
