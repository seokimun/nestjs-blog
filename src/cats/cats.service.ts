import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cats } from '../entities/cat.entity';
import { CreateCatDto } from './dto/CreateCat.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
    constructor(private readonly catRepository: CatsRepository) {}

    async signup(dto: CreateCatDto): Promise<Cats> {
        const { email, nickname, password } = dto;
        const isEmailExsist = await this.catRepository.findOneBy({ email });

        if (isEmailExsist) {
            throw new UnauthorizedException(
                '해당하는 이메일이 이미 존재합니다.',
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const cat = this.catRepository.create({
            email,
            nickname,
            password: hashedPassword,
        });
        return plainToClass(Cats, await this.catRepository.save(cat));
    }
}
