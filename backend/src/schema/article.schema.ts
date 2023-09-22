import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Article {
    @Prop({required: true}) title: string;
    @Prop({required: true}) authors: string[];
    @Prop({required: true}) date: String;
    @Prop({required: true}) journal: string;
    @Prop({required: true}) volume: number;
    @Prop({required: true}) issue: number;
    @Prop({required: true}) pageRange: number[];
    @Prop({required: true}) doi: string;
    @Prop() keywords: string[];
    @Prop() abstract: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
