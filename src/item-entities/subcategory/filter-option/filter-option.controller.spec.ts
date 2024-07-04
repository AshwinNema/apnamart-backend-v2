import { Test, TestingModule } from '@nestjs/testing';
import { SubCatFltrOptionController } from './filter-option.controller';

describe('SubCatFltrOptionController', () => {
  let controller: SubCatFltrOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubCatFltrOptionController],
    }).compile();

    controller = module.get<SubCatFltrOptionController>(
      SubCatFltrOptionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
