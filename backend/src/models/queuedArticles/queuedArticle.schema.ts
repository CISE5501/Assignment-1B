import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class QueuedArticle {
  @Prop() title: string;
  @Prop() authors: string[];
  @Prop() date: string;
  @Prop() journal: string;
  @Prop() volume: number;
  @Prop() issue: number;
  @Prop() pageRange: number[];
  @Prop() doi: string;
  @Prop() keywords: string[];
  @Prop() abstract: string;
  @Prop() isModerated: boolean;
}

export const QueuedArticleSchema = SchemaFactory.createForClass(QueuedArticle);
