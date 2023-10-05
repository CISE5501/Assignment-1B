import { IsNumber, IsString } from 'class-validator';
export class CreateRatingDto {
  @IsString()
  readonly userId: string;
  @IsString()
  readonly doi: string;
  @IsNumber()
  readonly rating: number; // 0.0...5.0
}
