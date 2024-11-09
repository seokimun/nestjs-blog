import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    nickname: string;
}
