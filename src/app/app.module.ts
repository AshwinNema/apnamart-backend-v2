import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from '../prisma/prisma.service';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from '../admin/admin.module';
import { CustomerModule } from '../customer/customer.module';
import { MerchantModule } from '../merchant/merchant.module';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from '../config/config';
import { AuthModule } from 'src/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from 'src/cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }),
    ScheduleModule.forRoot(),
    CustomerModule,
    MerchantModule,
    AdminModule,
    AuthModule,
    CronModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'admin',
        module: AdminModule,
      },
      {
        path: 'customer',
        module: CustomerModule,
      },
      {
        path: 'merchant',
        module: MerchantModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
