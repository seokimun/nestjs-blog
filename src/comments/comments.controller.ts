import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCommentsDto } from './dto/CreateComments.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
    @Get()
    async getAllComments() {
        return this.commentsService.getAllComments();
    }

    @ApiOperation({ summary: '특정 고양이 프로필에 댓글 남기기' })
    @Post(':id')
    async createComments(
        @Param('id') id: number,
        @Body() body: CreateCommentsDto,
    ) {
        return this.commentsService.createComments(id, body);
    }
}
