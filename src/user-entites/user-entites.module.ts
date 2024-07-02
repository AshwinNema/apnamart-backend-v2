import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { MerchantController } from './merchant/merchant.controller';
import { MerchantService } from './merchant/merchant.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UploaderModule } from 'src/uploader/uploader.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [NestjsFormDataModule, UploaderModule],
  providers: [PrismaService, MerchantService, AdminService, CustomerService],
  controllers: [MerchantController, AdminController, CustomerController],
})
export class UserEntitesModule {}
