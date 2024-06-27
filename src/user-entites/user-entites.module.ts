import { Module } from '@nestjs/common';
import { AdminModule } from 'src/user-entites/admin/admin.module';
import { CustomerModule } from 'src/user-entites/customer/customer.module';
import { MerchantModule } from 'src/user-entites/merchant/merchant.module';

@Module({
  imports: [CustomerModule, AdminModule, MerchantModule],
})
export class UserEntitesModule {}
