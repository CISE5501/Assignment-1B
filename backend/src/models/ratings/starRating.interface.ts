import { Document } from 'mongoose'; //Document used to communicate with mongodb

export interface IStarRating extends Document {
  doi: string;
  userId: string;
  rating: number;
}
