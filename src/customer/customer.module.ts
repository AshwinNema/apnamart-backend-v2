import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';

@Module({
  imports: [],
  controllers: [CustomerController],
  exports: [],
})
export class CustomerModule {
  constructor() {}
}
