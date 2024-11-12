import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Cats } from '../entities/cat.entity';
import { CreateCatDto } from './dto/CreateCat.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
    constructor(private readonly catsRepository: CatsRepository) {}

    async signup(dto: CreateCatDto): Promise<Cats> {
        const { email, nickname, password } = dto;
        const isEmailExsist = await this.catsRepository.findOneBy({ email });

        if (isEmailExsist) {
            throw new UnauthorizedException(
                '해당하는 이메일이 이미 존재합니다.',
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const cat = this.catsRepository.create({
            email,
            nickname,
            password: hashedPassword,
        });
        return plainToClass(Cats, await this.catsRepository.save(cat));
    }

    async uploadImg(cat: Cats, files: Express.Multer.File[]) {
        const fileName = `cats/${files[0].filename}`;
        console.log(fileName);

        const newCat = await this.catsRepository.findByIdAndUpdateImg(
            cat.id,
            fileName,
        );
        console.log(newCat);
        return newCat;
    }

    async getAllCat() {
        const cat = await this.catsRepository.find();
        return plainToClass(Cats, cat);
    }
}
