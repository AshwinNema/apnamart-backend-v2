import { Test, TestingModule } from '@nestjs/testing';
import { SubCatFltrOptService } from './filter-option.service';

describe('SubCatFltrOptService', () => {
  let service: SubCatFltrOptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCatFltrOptService],
    }).compile();

    service = module.get<SubCatFltrOptService>(SubCatFltrOptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
