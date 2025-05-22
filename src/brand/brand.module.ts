import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({
    ttl: 5000
  })],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
