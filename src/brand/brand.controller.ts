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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiQuery } from '@nestjs/swagger';
import { TelegrambotService } from 'src/telegrambot/telegrambot.service';
import { TokenGuard } from 'src/guards/token.guard';
import { RoleDecorator } from 'src/decorators/role-decorators';
import { UserRole } from '@prisma/client';
import { userInfo } from 'os';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('brand')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private bot: TelegrambotService,
  ) {}

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
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
    return this.brandService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
