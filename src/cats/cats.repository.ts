import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from '../entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsRepository extends Repository<Cats> {
    constructor(
        @InjectRepository(Cats)
        private readonly repository: Repository<Cats>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findByEmail(email: string): Promise<Cats | null> {
        const user = await this.repository.findOne({ where: { email } });
        return user;
    }

    async findByIdAndUpdateImg(id: number, fileName: string) {
        const cat = await this.repository.findOneBy({ id });

        cat.imgUrl = `http://localhost:8000/media/${fileName}`;

        const newCat = await this.repository.save(cat);

        console.log(newCat);
        return newCat;
    }
}
