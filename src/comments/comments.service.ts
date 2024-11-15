import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentsDto } from './dto/CreateComments.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from '../entities/comments.entity';
import { Repository } from 'typeorm';
import { CatsRepository } from '../cats/cats.repository';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments)
        private readonly commentsRepository: Repository<Comments>,
        private readonly catsRepository: CatsRepository,
    ) {}

    async getAllComments() {
        const comments = await this.commentsRepository.find();
        return plainToClass(Comments, comments);
    }

    async createComments(id: number, dto: CreateCommentsDto) {
        const targetCat = await this.catsRepository.findOneBy({ id });
        if (!targetCat) {
            throw new UnauthorizedException('Not Found!');
        }

        const { author, contents } = dto;
        const validatorAuthor = await this.catsRepository.findOneBy({
            id: author,
        });
        if (!validatorAuthor) {
            throw new UnauthorizedException('Author Not Found!');
        }

        const newComment = this.commentsRepository.create({
            author: validatorAuthor,
            contents,
            info: targetCat,
        });

        return plainToClass(
            Comments,
            await this.commentsRepository.save(newComment),
        );
    }
}
