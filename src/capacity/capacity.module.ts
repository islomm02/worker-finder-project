import { Module } from '@nestjs/common';
import { CapacityService } from './capacity.service';
import { CapacityController } from './capacity.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({
    ttl: 5000,
  })],
  controllers: [CapacityController],
  providers: [CapacityService],
})
export class CapacityModule {}
