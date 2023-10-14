import { IsString } from 'class-validator';
export class CreateRejectedEntryDto {
  @IsString()
  doi: string;
}
