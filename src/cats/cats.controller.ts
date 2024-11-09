import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { SuccessInterceptor } from '../common/interceptors/succeess.interceptro';
import { CreateCatDto } from './dto/CreateCat.dto';
@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    getAllCat() {
        return 'get all cat';
    }

    @Get(':id')
    getOneCat() {
        return 'get one cat';
    }

    @Post()
    async signup(@Body() body: CreateCatDto) {
        return await this.catsService.signup(body);
    }

    @Put()
    updateCat() {
        return 'update cat';
    }

    @Patch()
    updatePartialCat() {
        return;
    }

    @Delete(':id')
    deleteCat() {
        return 'delete cat';
    }
}
