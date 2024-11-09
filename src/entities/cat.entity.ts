import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity('cats')
export class Cat extends BaseEntity {
    @IsEmail()
    @IsNotEmpty()
    @Column({ unique: true, nullable: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @Column({ nullable: true })
    nickname: string;

    @IsString()
    @IsNotEmpty()
    @Column({ nullable: true })
    password: string;

    @IsString()
    @Column()
    imgUrl: string;
}
