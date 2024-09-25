import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { MerchantController } from './merchant/merchant.controller';
import { MerchantService } from './merchant/merchant.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UploaderModule } from 'src/uploader/uploader.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserAddressService } from './user/user-address.service';
import { CommunicationModule } from 'src/communication/communication.module';

@Module({
  imports: [NestjsFormDataModule, UploaderModule, CommunicationModule],
  providers: [
    MerchantService,
    AdminService,
    CustomerService,
    UserService,
    UserAddressService,
  ],
  controllers: [
    MerchantController,
    AdminController,
    CustomerController,
    UserController,
  ],
  exports: [MerchantService, AdminService, CustomerService, UserService],
})
export class UserEntitesModule {}
