import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Comments } from './comments.entity';

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
    @Column({ nullable: true })
    imgUrl: string;

    @OneToMany(() => Comments, (comments) => comments.author)
    comments: Comments[];

    @OneToMany(() => Comments, (comments) => comments.info)
    comment: Comments[];
}
