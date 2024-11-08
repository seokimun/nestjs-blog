import {
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
    createCat() {
        return 'create cat';
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
