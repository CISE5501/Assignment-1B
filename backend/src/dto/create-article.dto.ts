import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsArray()
    @IsNotEmpty()
    readonly authors: string[]
    @IsString()
    @IsNotEmpty()
    readonly date: string
    @IsString()
    @IsNotEmpty()
    readonly journal: string
    @IsNumber()
    @IsNotEmpty()
    readonly volume: number
    @IsNumber()
    @IsNotEmpty()
    readonly issue: number
    @IsArray()
    @IsNotEmpty()
    readonly pageRange: number[]
    @IsString()
    @IsNotEmpty()
    readonly doi: string
    @IsArray()
    readonly keywords: string[]
    @IsString()
    readonly abstract: string
}