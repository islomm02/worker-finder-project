import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({ttl: 5000})],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
