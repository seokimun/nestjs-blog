import { Exclude } from 'class-transformer';
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    @Exclude()
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date | null;
}
