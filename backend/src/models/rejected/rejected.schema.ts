import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Reject {
  @Prop() doi: string;
}

export const RejectSchema = SchemaFactory.createForClass(Reject);
