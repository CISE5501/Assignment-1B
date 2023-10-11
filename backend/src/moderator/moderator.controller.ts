import { Controller, Get, HttpStatus, Param, Put, Res, Delete } from '@nestjs/common';
import { QueuedArticleService } from 'src/models/queuedArticles/queuedArticle.service';

/*
  Routes paths with prefix '/moderator' in the URL to functions declared in service modules.
  This controller contains functions accessible by a moderator role:
    - Getting a list of queuedArticle objects
    - Getting a specified queuedArticle object
    - Updating a queuedArticle object's status (isModerated)
    - Deleting a specified queuedArticle object
*/

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly queuedArticleService: QueuedArticleService) {}

  // getArticles: returns list of queuedArticle objects which have NOT been moderated
  @Get('/index')
  async getArticles(@Res() response) {
    try {
      const articleData = await this.queuedArticleService.getAllUnmoderatedArticles();
      return response.status(HttpStatus.OK).json({
        message: 'All unmoderated articles data found successfully',
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

  //updates a queuedArticle object's isModerated status to true, marking it ready for analysis
  @Put('/promote/id/:id')
  async promoteArticle(@Res() response, @Param('id') articleId: string) {
    try {
      const existingArticle = await this.queuedArticleService.updateQueuedArticle(articleId, { isModerated: true });
      return response.status(HttpStatus.OK).json({
        message: 'Article marked as moderated successfully',
        existingArticle,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
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
