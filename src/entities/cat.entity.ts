import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cats')
export class Cats extends BaseEntity {
    @ApiProperty({
        example: 'abc@naver.com',
        description: 'email',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    @Column({ unique: true, nullable: false })
    email: string;

    @ApiProperty({
        example: 'seokimun',
        description: 'nickname',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Column({ nullable: false })
    nickname: string;

    @ApiProperty({
        example: '1234',
        description: 'password',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Exclude()
    @Column({ nullable: false })
    password: string;

    @IsString()
    @Exclude()
    @Column({ nullable: true })
    imgUrl: string;
}
