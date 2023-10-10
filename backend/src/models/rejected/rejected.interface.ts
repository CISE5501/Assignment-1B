import { Document } from 'mongoose'; //Document used to communicate with mongodb

export interface IRejectedEntry extends Document {
  doi: string;
}
