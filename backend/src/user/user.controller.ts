import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { CreateQueuedArticleDto } from 'src/models/queuedArticles/dto/create-article.dto';
import { ArticleService } from 'src/models/articles/article.service';
import { QueuedArticleService } from 'src/models/queuedArticles/queuedArticle.service';
import { RejectedEntryService } from 'src/models/rejected/rejected.service';
import { CreateRatingDto } from 'src/models/ratings/dto/create-rating.dto';
import { StarRatingService } from 'src/models/ratings/starRating.service';
import { URL_REGEX } from 'src/common';

//controller- routes articles to get/post methods

@Controller('articles')
export class UserController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly queuedArticleService: QueuedArticleService,
    private readonly rejectedEntryService: RejectedEntryService,
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
  async findArticlesByQuery(
    @Query('keywords') keywords: string,
    @Query('field') field = 'all',
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

  @Get('/rejected')
  async getRejectedDOIs(@Res() response) {
    try {
      const rejectedEntries = await this.rejectedEntryService.getAllEntries();
      const rejectedDOIs = rejectedEntries.map((item) => item.doi);
      return response.status(HttpStatus.OK).json({
        message: 'Rejected entries found successfully',
        rejectedDOIs,
      });
    } catch (err) {
      return response.status(HttpStatus.OK).json({
        message: 'Failed to fetch rejected entries',
        rejectedDOIs: [],
      });
    }
  }

  @Post('/new')
  async createArticle(@Res() response, @Body() createArticleDto: CreateQueuedArticleDto) {
    try {
      // Disallow creating articles with URLs
      if (URL_REGEX.test(JSON.stringify(createArticleDto)))
        return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: `Request body contains invalid content. Details: contains URL fragment part /${URL_REGEX.source}/.`,
          illegalSequence: JSON.stringify(createArticleDto, null, 2).match(URL_REGEX),
        });
      // Add new article in queue
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
