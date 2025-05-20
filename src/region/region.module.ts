import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({ttl: 5000})],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
