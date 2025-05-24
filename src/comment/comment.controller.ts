import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiQuery } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { RoleDecorator } from 'src/decorators/role-decorators';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    @Inject(CACHE_MANAGER) private cachemodule: Cache,
  ) {}

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'from', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    enum: ['masterId', 'star'],
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
  })
  @ApiQuery({ name: 'masterId', required: false, type: String })
  @ApiQuery({ name: 'star', required: false, type: Number })
  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(
    @Query('take') take: number,
    @Query('from') from: number,
    @Query('search') search: string,
    @Query('sort') sort: string,
    @Query('order') order: string,
    @Query('masterId') masterId: string,
    @Query('star') star: number,
  ) {
    const options = {
      take,
      from,
      search,
      sort,
      order,
      masterId,
      star,
    };
    return this.commentService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
