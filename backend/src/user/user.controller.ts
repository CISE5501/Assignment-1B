import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateArticleDto } from 'src/models/articles/dto/create-article.dto';
import { ArticleService } from 'src/models/articles/article.service';
import { QueuedArticleService } from 'src/models/queuedArticles/queuedArticle.service';

//controller- routes articles to get/post methods

@Controller('articles')
export class UserController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly queuedArticleService: QueuedArticleService,
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

  @Get('/:id')
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

  @Post()
  async createArticle(
    @Res() response,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    try {
      const newArticle =
        await this.queuedArticleService.createArticle(createArticleDto);
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
}
