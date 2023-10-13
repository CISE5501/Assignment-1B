//maps data retrieved from database to a type

export type Article = {
  readonly _id: string;
  title: string;
  authors: string[];
  date: string;
  journal: string;
  volume: number;
  issue: number;
  pageRange: [number, number];
  doi: string;
  keywords: string[];
  claim: string;
};
