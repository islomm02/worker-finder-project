import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MastersService } from './masters.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { TokenGuard } from 'src/guards/token.guard';
import { RoleDecorator } from 'src/decorators/role-decorators';
import { UserRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.mastersService.create(createMasterDto);
  }

  @Get()
  findAll() {
    return this.mastersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mastersService.findOne(+id);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMasterDto: UpdateMasterDto) {
    return this.mastersService.update(+id, updateMasterDto);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mastersService.remove(+id);
  }
}
