import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [CacheModule.register({ttl: 5000}), BotModule],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
