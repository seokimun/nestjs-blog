import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from '../cats/cats.repository';
import { LoginDto } from './dto/Login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly catsRepository: CatsRepository,
        private jwtService: JwtService,
    ) {}

    async logIn(dto: LoginDto) {
        const { email, password } = dto;

        const user = await this.catsRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException(
                '이메일과 비밀번호를 확인해주세요.',
            );
        }

        const isPasswordMatch: boolean = await bcrypt.compare(
            password,
            user.password,
        );

        if (!isPasswordMatch) {
            throw new UnauthorizedException(
                '이메일과 비밀번호를 확인해주세요.',
            );
        }

        const payload = { id: user.id, email: email, nickname: user.nickname };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
