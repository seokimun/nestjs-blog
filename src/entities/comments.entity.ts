import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Cats } from './cat.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('comments')
export class Comments extends BaseEntity {
    @ManyToOne(() => Cats, (cat) => cat.comments, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'author_id' })
    @IsNotEmpty()
    author: Cats;

    @Column()
    @IsNotEmpty()
    @IsString()
    contents: string;

    @ManyToOne(() => Cats, (cat) => cat.comment, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinColumn({ name: 'info_id' })
    @IsNotEmpty()
    info: Cats;
}
