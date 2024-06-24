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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }),
    CustomerModule,
    MerchantModule,
    AdminModule,
    AuthModule,
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
  providers: [PrismaService],
})
export class AppModule {}
