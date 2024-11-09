import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
    @ApiProperty({
        example: 'abc@naver.com',
        description: 'email',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '1234',
        description: 'password',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: 'seokimun',
        description: 'nickname',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    nickname: string;
}
