import { Document } from 'mongoose'; //Document used to communicate with mongodb

export interface IReject extends Document {
  doi: string;
}
