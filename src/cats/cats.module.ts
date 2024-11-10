import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats } from '../entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsRepository } from './cats.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Cats])],
    controllers: [CatsController],
    providers: [CatsService, CatsRepository],
    exports: [CatsService, CatsRepository],
})
export class CatsModule {}
