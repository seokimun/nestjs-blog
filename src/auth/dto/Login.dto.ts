import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
}
