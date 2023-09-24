import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  Delete,
} from '@nestjs/common';
import { CreateArticleDto } from 'src/models/articles/dto/create-article.dto';
import { QueuedArticleService } from 'src/models/queuedArticles/queuedArticle.service';

@Controller('queued')
export class QueueController {
  constructor(private readonly queuedArticleService: QueuedArticleService) {}

  @Get()
  async getArticles(@Res() response) {
    try {
      const articleData =
        await this.queuedArticleService.getAllQueuedArticles();
      return response.status(HttpStatus.OK).json({
        message: 'All queued articles data found successfully',
        articleData,
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
        message: 'Queue article has been created successfully',
        newArticle,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Queue article not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:id')
  async getArticle(@Res() response, @Param('id') articleId: string) {
    try {
      const existingArticle =
        await this.queuedArticleService.getArticle(articleId);
      return response.status(HttpStatus.OK).json({
        message: 'Article found successfully',
        existingArticle,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteArticle(@Res() response, @Param('id') articleId: string) {
    try {
      const deletedArticle =
        await this.queuedArticleService.deleteArticle(articleId);
      return response.status(HttpStatus.OK).json({
        message: 'Article deleted successfully',
        deletedArticle,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
