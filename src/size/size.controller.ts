import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('size')
export class SizeController {
  constructor(
    private readonly sizeService: SizeService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    return this.sizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sizeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(id, updateSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizeService.remove(id);
  }
}
