import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StarRating {
  @Prop() userId: string;
  @Prop() doi: string;
  @Prop() rating: number;
}

export const StarRatingSchema = SchemaFactory.createForClass(StarRating);
