import { Controller, Get, HttpStatus, Param, Put, Res, Delete } from '@nestjs/common';
import { ArticleService } from 'src/models/articles/article.service';
import { QueuedArticleService } from 'src/models/queuedArticles/queuedArticle.service';
import { RejectedEntryService } from 'src/models/rejected/rejected.service';

/*
  Routes paths with prefix '/moderator' in the URL to functions declared in service modules.
  This controller contains functions accessible by a moderator role:
    - Getting a list of queuedArticle objects
    - Getting a specified queuedArticle object
    - Getting a list of duplicate dois
    - Updating a queuedArticle object's status (isModerated)
    - Deleting a specified queuedArticle object (sending it to rejected collection)
*/

@Controller('moderator')
export class ModeratorController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly queuedArticleService: QueuedArticleService,
    private readonly rejectedEntryService: RejectedEntryService,) {}

  // getArticles: returns list of queuedArticle objects which have NOT been moderated
  @Get('/index')
  async getQueuedArticles(@Res() response) {
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

  // listDuplicateArticleDOIs: returns list of dois which exist in both the queuedArticles database and articles database
  @Get('duplicates')
  async listDuplicateArticleDOIs(@Res() response) {
    try {
      const accepted = await this.articleService.getAllArticles();
      const acceptedDOIs = accepted.map((article) => article.doi);
      const queued = await this.queuedArticleService.getAllQueuedArticles();
      const duplicatesInQueue = queued.filter((queueArticle) => acceptedDOIs.includes(queueArticle.doi));
      const duplicateDOIs = duplicatesInQueue.map((article) => article.doi);
      return response.status(HttpStatus.OK).json({
        message: 'All duplicate articles found successfully',
        duplicateDOIs,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // getRejected: returns a list of rejected articles' dois
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

  //updates a queuedArticle object's isModerated status to true, marking it ready for analysis
  @Put('/promote/id/:id')
  async promoteQueuedArticle(@Res() response, @Param('id') articleId: string) {
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
      await this.rejectedEntryService.addEntry({ doi: deletedArticle.doi });
      return response.status(HttpStatus.OK).json({
        message: 'Article deleted successfully',
        deletedArticle,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
