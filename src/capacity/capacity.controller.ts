import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors } from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('capacity')
export class CapacityController {
  constructor(
    private readonly capacityService: CapacityService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  create(@Body() createCapacityDto: CreateCapacityDto) {
    return this.capacityService.create(createCapacityDto);
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    return this.capacityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capacityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCapacityDto: UpdateCapacityDto,
  ) {
    return this.capacityService.update(id, updateCapacityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capacityService.remove(id);
  }
}
