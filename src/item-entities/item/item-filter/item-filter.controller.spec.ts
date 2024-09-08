import { Test, TestingModule } from '@nestjs/testing';
import { ItemFilterController } from './item-filter.controller';

describe('ItemFilterController', () => {
  let controller: ItemFilterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemFilterController],
    }).compile();

    controller = module.get<ItemFilterController>(ItemFilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
