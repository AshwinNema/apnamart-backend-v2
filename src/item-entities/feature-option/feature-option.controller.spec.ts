import { Test, TestingModule } from '@nestjs/testing';
import { FeatureOptionController } from './feature-option.controller';

describe('FeatureOptionController', () => {
  let controller: FeatureOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureOptionController],
    }).compile();

    controller = module.get<FeatureOptionController>(FeatureOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
