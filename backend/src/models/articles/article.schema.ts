import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Article {
  @Prop() title: string;
  @Prop() authors: string[];
  @Prop() date: string;
  @Prop() journal: string;
  @Prop() volume: number;
  @Prop() issue: number;
  @Prop() pageRange: [number, number];
  @Prop() doi: string;
  @Prop() se_methods: string[];
  @Prop() claim: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
