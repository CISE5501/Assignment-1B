//maps data retrieved from database to a type for queuedArticles

export type QueuedArticle = {
  title: string;
  authors: string[];
  date: String;
  journal: string;
  volume: number;
  issue: number;
  pageRange: number[];
  doi: string;
  keywords: string[];
  abstract: string;
  isModerated: boolean;
};
