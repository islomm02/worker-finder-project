import { BadRequestException, Inject, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { pid } from 'process';

@Injectable()
export class ProductService {
  
  constructor(private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ){}

  async create(createProductDto: CreateProductDto) {
    try {
      let one = await this.prisma.product.findFirst({ where: { name_uz: createProductDto.name_uz } });
      if (one) {
       throw new BadRequestException('Product with this name already exists')
      }
      one = await this.prisma.product.create({ data: createProductDto });
      return one
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  @UseInterceptors(CacheInterceptor)
  async  findAll() {
    try {
      let products = await this.prisma.product.findMany()
      return products
    } catch (error) {
      console.log(error);
      
    }
    return `This action returns all product`;
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.product.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Product with this id not found')
      }
      return one
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async   update(id: string, data: UpdateProductDto) {
    try {
      let one = await this.prisma.product.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Product with this id not found')
      }
      let updated = await this.prisma.product.update({ where: { id }, data })
      return updated
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      let one = await this.prisma.product.findFirst({where: {id}})
      if (!one) {
        throw new NotFoundException('Product with this id not found')
      }
      let deleted = await this.prisma.product.delete({ where: { id } })
      return deleted
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
