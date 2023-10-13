import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateQueuedArticleDto {
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
  readonly se_methods: string[];
  @IsString()
  readonly claim: string;
  @IsBoolean()
  readonly isModerated: boolean;
}
