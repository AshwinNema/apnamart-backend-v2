import { Test, TestingModule } from '@nestjs/testing';
import { SubCatFltrService } from './filter.service';

describe('SubCatFltrService', () => {
  let service: SubCatFltrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCatFltrService],
    }).compile();

    service = module.get<SubCatFltrService>(SubCatFltrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
