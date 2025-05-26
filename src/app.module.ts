import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { JwtModule } from '@nestjs/jwt';
import { BrandModule } from './brand/brand.module';
import { SizeModule } from './size/size.module';
import { CapacityModule } from './capacity/capacity.module';
import { ToolsModule } from './tools/tools.module';
import { LevelModule } from './level/level.module';
import { FaqModule } from './faq/faq.module';
import { MulterModule } from './multer/multer.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MastersModule } from './masters/masters.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { PartnersModule } from './partners/partners.module';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { OrderItemModule } from './order-item/order-item.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    CacheModule.register(),
    UserModule,
    PrismaModule,
    RegionModule,
    JwtModule.register({
      global: true,
      secret: "secret",
    }),
    BrandModule,
    SizeModule,
    CapacityModule,
    ToolsModule,
    LevelModule,
    FaqModule,
    MulterModule,
    MastersModule,
    OrderModule,
    CommentModule,
    PartnersModule,
    ProductModule,
    BasketModule,
    OrderItemModule,
    NodemailerModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
