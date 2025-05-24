import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiQuery } from '@nestjs/swagger';
import { RoleGuard } from 'src/guards/role.guard';
import { RoleDecorator } from 'src/decorators/role-decorators';
import { UserRole } from '@prisma/client';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('capacity')
export class CapacityController {
  constructor(
    private readonly capacityService: CapacityService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createCapacityDto: CreateCapacityDto) {
    return this.capacityService.create(createCapacityDto);
  }

  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'from', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'order', required: false, type: String })
  @ApiQuery({ name: 'name_uz', required: false, type: String })
  @ApiQuery({ name: 'name_ru', required: false, type: String })
  @ApiQuery({ name: 'name_en', required: false, type: String })
  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(
    @Query('take') take: number,
    @Query('from') from: number,
    @Query('search') search: string,
    @Query('sort') sort: string,
    @Query('order') order: string,
    @Query('name_uz') name_uz: string,
    @Query('name_ru') name_ru: string,
    @Query('name_en') name_en: string,
  ) {
    const options = {
      take,
      from,
      search,
      sort,
      order,
      name_uz,
      name_ru,
      name_en,
    };

    return this.capacityService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capacityService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCapacityDto: UpdateCapacityDto,
  ) {
    return this.capacityService.update(id, updateCapacityDto);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capacityService.remove(id);
  }
}
