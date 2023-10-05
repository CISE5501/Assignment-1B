import { Document } from 'mongoose'; //Document used to communicate with mongodb

export interface IStarRating extends Document {
  userId: string;
  doi: string;
  rating: number;
}
