import {
    Body,
    Controller,
    Get,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from '../common/interceptors/succeess.interceptro';
import { CreateCatDto } from './dto/CreateCat.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/utils/multer.options';
import { Cats } from '../entities/cat.entity';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @ApiOperation({ summary: '모든 고양이 가져오기' })
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllCat(): Promise<Cats[]> {
        return this.catsService.getAllCat();
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

    @ApiOperation({ summary: '고양이 이미지 업로드' })
    @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    uploadCatImg(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @User() cat: Cats,
    ) {
        console.log(files);
        return this.catsService.uploadImg(cat, files);
    }
}
