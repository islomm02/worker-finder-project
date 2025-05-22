import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({ttl: 5000})],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
