import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app/app.controller';
import { PrismaService } from '../services/prisma/prisma.service';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { CustomerModule } from './customer.module';
import { MerchantModule } from './merchant.module';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from '../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }),
    CustomerModule,
    MerchantModule,
    AdminModule,
    RouterModule.register([
      {
        path: 'customer',
        module: CustomerModule,
      },
      {
        path: 'merchant',
        module: MerchantModule,
      },
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
