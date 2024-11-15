import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentsDto {
    @IsNumber()
    @IsNotEmpty()
    author: number;

    @IsString()
    @IsNotEmpty()
    contents: string;
}
