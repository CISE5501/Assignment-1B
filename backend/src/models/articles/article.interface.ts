import { Document } from 'mongoose'; //Document used to communicate with mongodb

export interface IArticle extends Document {
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
}
