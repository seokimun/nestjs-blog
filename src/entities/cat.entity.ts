import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('cats')
export class Cats extends BaseEntity {
    @IsEmail()
    @IsNotEmpty()
    @Column({ unique: true, nullable: false })
    email: string;

    @IsString()
    @IsNotEmpty()
    @Column({ nullable: false })
    nickname: string;

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
