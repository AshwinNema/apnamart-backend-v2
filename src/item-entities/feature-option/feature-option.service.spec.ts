import { Test, TestingModule } from '@nestjs/testing';
import { FeatureOptionService } from './feature-option.service';

describe('FeatureOptionService', () => {
  let service: FeatureOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureOptionService],
    }).compile();

    service = module.get<FeatureOptionService>(FeatureOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
