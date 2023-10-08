import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class RejectedEntry {
  @Prop() doi: string;
}

export const RejectedEntrySchema = SchemaFactory.createForClass(RejectedEntry);
