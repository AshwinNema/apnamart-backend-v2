import { Module } from '@nestjs/common';
import { DeliveryAreaController } from './delivery-area/delivery-area.controller';
import { DeliveryAreaService } from './delivery-area/delivery-area.service';

@Module({
  imports: [],
  providers: [DeliveryAreaService],
  controllers: [DeliveryAreaController],
  exports: [],
})
export class OrdersEntitiesModule {}
