import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from '../common/interceptors/succeess.interceptro';
import { CreateCatDto } from './dto/CreateCat.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { classToPlain } from 'class-transformer';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @ApiOperation({ summary: '현재 고양이 가져오기' })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllCat(@User() user) {
        return classToPlain(user);
    }

    @ApiOperation({ summary: '회원가입' })
    @ApiResponse({
        status: 500,
        description: 'Server Error...',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
    })
    @Post()
    async signup(@Body() body: CreateCatDto) {
        return await this.catsService.signup(body);
    }

    @ApiOperation({ summary: '로그인' })
    @Post('login')
    logIn() {
        return 'login';
    }

    @ApiOperation({ summary: '로그아웃' })
    @Post('logout')
    logOut() {
        return 'logout';
    }

    @ApiOperation({ summary: '고양이 이미지 업로드' })
    @Post('upload/cats')
    uploadCatImg() {
        return 'uploadImg';
    }
}
