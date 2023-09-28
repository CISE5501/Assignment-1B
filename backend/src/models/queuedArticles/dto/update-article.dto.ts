import { PartialType } from '@nestjs/mapped-types';
import { CreateQueuedArticleDto } from './create-article.dto';
export class UpdateQueuedArticleDto extends PartialType(
  CreateQueuedArticleDto,
) {}
