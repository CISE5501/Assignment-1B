import { Article } from './article';

export type QueuedArticle = Article & {
  isModerated: boolean;
};
