import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    getAllCat() {
        return 'all cat';
    }

    @Get(':id')
    getOneCat() {
        return 'one cat';
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
