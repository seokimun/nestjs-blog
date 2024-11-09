import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from '../entities/cat.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/CreateCat.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cats)
        private readonly catRepository: Repository<Cats>,
    ) {}

    async signup(dto: CreateCatDto): Promise<Cats> {
        const { email, nickname, password } = dto;
        const user = await this.catRepository.findOneBy({ email });

        if (user) {
            throw new UnauthorizedException(
                '해당하는 이메일이 이미 존재합니다.',
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const cat = await this.catRepository.create({
            email,
            nickname,
            password: hashedPassword,
        });
        return plainToClass(Cats, await this.catRepository.save(cat));
    }
}
