import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors, UseGuards } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RoleGuard } from 'src/guards/role.guard';
import { RoleDecorator } from 'src/decorators/role-decorators';
import { UserRole } from '@prisma/client';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('level')
export class LevelController {
  constructor(
    private readonly levelService: LevelService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    return this.levelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(id, updateLevelDto);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.levelService.remove(id);
  }
}
