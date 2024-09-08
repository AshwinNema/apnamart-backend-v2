import { Test, TestingModule } from '@nestjs/testing';
import { ItemFilterService } from './item-filter.service';

describe('ItemFilterService', () => {
  let service: ItemFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemFilterService],
    }).compile();

    service = module.get<ItemFilterService>(ItemFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
