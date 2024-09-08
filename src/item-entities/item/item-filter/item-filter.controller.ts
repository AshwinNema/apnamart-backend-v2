import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ItemFilterService } from './item-filter.service';

@Controller('item-filter')
export class ItemFilterController {
  constructor(private itemFilterService: ItemFilterService) {}

  @Get('by-item-id/:id')
  getFiltersById(@Param('id', ParseIntPipe) id: number) {
    return this.itemFilterService.getFiltersByItemId(id);
  }
}
