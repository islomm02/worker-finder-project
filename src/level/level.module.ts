import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({
    ttl: 5000
  })],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
