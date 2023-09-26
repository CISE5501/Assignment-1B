export type Article = {
  readonly _id: string;
  title: string;
  authors: string[];
  date: string;
  journal: string;
  volume: number;
  issue: number;
  pageRange: number[];
  doi: string;
  keywords: string[];
  abstract: string;
};
