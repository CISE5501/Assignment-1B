export type Article = {
  title: string;
  authors: string[];
  date: string;
  journal: string;
  volume: number;
  issue: number;
  pageRange: [number, number];
  doi: string;
  keywords: string[];
  abstract: string;
};
