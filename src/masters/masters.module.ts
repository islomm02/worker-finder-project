import { Module } from '@nestjs/common';
import { MastersService } from './masters.service';
import { MastersController } from './masters.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({ttl: 5000})],
  controllers: [MastersController],
  providers: [MastersService],
})
export class MastersModule {}
