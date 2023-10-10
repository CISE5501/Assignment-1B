import { IsString } from 'class-validator';
export class CreateRejectedEntryDto {
  @IsString()
  readonly doi: string;
}
