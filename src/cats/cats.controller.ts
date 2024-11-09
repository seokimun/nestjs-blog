import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from '../common/interceptors/succeess.interceptro';
import { CreateCatDto } from './dto/CreateCat.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    getAllCat() {
        return 'get all cat';
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
