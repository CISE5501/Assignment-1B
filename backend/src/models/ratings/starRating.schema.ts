import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StarRating {
  @Prop() doi: string;
  @Prop() userId: string;
  @Prop() rating: number;
}

export const StarRatingSchema = SchemaFactory.createForClass(StarRating);
