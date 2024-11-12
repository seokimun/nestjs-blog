import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats } from '../entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsRepository } from './cats.repository';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.register({
            dest: './upload',
        }),
        TypeOrmModule.forFeature([Cats]),
    ],
    controllers: [CatsController],
    providers: [CatsService, CatsRepository],
    exports: [CatsService, CatsRepository],
})
export class CatsModule {}
