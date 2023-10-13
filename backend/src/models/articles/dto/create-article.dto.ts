import { IsArray, IsNumber, IsString } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  readonly title: string;
  @IsArray()
  readonly authors: string[];
  @IsString()
  readonly date: string;
  @IsString()
  readonly journal: string;
  @IsNumber()
  readonly volume: number;
  @IsNumber()
  readonly issue: number;
  @IsArray()
  readonly pageRange: [number, number];
  @IsString()
  readonly doi: string;
  @IsArray()
  readonly keywords: string[];
  @IsString()
  readonly claim: string;
}
