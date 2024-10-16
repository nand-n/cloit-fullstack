import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { SharedModule } from '../core/shared.module';
import { CoreModule } from './core.module';
import { AppConfigModule } from '../config/app.config.module';
import { PrismaModule } from './modules/prisma/prisma.module';
@Module({
  imports: [
    AppConfigModule,
    CoreModule,
    SharedModule,
    ThrottlerModule.forRoot([{
      name:"ttl",
      ttl: 60, 
      limit: 10,
    }]),
    PrismaModule,
  ],
})
export class AppModule {}
