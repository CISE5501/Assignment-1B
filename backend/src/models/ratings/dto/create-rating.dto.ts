import { IsNumber, IsString } from 'class-validator';
export class CreateRatingDto {
  @IsString()
  readonly doi: string;
  @IsString()
  readonly userId: string;
  @IsNumber()
  readonly rating: number; // 0.0...5.0
}
