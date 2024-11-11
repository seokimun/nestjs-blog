import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from 'src/entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Cats)
        private readonly catsRepository: Repository<Cats>,
    ) {}

    async findOneByUser(id: number): Promise<Cats> {
        return this.catsRepository.findOneBy({ id });
    }
}
