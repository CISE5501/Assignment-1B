import { Body, Controller, Get, HttpStatus, Param, Put, Post, Res, Delete } from '@nestjs/common';
import { CreateArticleDto } from 'src/models/articles/dto/create-article.dto';
import { ArticleService } from 'src/models/articles/article.service';
import { QueuedArticleService } from 'src/models/queuedArticles/queuedArticle.service';
import { URL_REGEX } from 'src/common';

/*
  Routes paths with prefix '/analyst' in the URL to functions declared in service modules.
  This controller contains functions accessible by an analyst role:
    - Getting a list of queuedArticle objects
    - Getting a specified queuedArticle object
    - Posting a new article object
    - Deleting a specified queuedArticle object
*/
@Controller('analyst')
export class AnalystController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly queuedArticleService: QueuedArticleService,
  ) {}

  // getArticles: returns list of queuedArticle objects which have been moderated
  @Get('/index')
  async getArticles(@Res() response) {
    try {
      const articleData = await this.queuedArticleService.getAllModeratedArticles();
      return response.status(HttpStatus.OK).json({
        message: 'All moderated articles data found successfully',
        articleData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //retrieves a queuedArticle object which has a matching id to the queried string
  @Get('/id/:id')
  async getArticle(@Res() response, @Param('id') articleId: string) {
    try {
      const existingArticle = await this.queuedArticleService.getQueuedArticle(articleId);
      return response.status(HttpStatus.OK).json({
        message: 'Article found successfully',
        existingArticle,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  //creates a new article object which is sent to the articles database
  @Post()
  async createArticle(@Res() response, @Body() createArticleDto: CreateArticleDto) {
    try {
      // Disallow creating articles with URLs
      if (URL_REGEX.test(JSON.stringify(createArticleDto)))
        return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
          message: `Request body contains invalid content. Details: contains URL fragment part /${URL_REGEX.source}/.`,
          illegalSequence: JSON.stringify(createArticleDto).match(URL_REGEX),
        });
      // Add article to database
      const newArticle = await this.articleService.createArticle(createArticleDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Article has been created successfully',
        newArticle,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Article not created!',
        error: 'Bad Request',
      });
    }
  }

  //deletes a queuedArticle object from the queuedArticle database which has a matching id to the queried string
  @Delete('/id/:id')
  async deleteArticle(@Res() response, @Param('id') articleId: string) {
    try {
      const deletedArticle = await this.queuedArticleService.deleteQueuedArticle(articleId);
      return response.status(HttpStatus.OK).json({
        message: 'Article deleted successfully',
        deletedArticle,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
