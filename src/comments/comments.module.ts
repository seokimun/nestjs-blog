import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from '../entities/comments.entity';
import { CatsModule } from '../cats/cats.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comments]), CatsModule],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}
