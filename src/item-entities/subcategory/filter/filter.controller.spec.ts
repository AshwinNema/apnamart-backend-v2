import { Test, TestingModule } from '@nestjs/testing';
import { SubCatFltrController } from './filter.controller';

describe('SubCatFltrController', () => {
  let controller: SubCatFltrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubCatFltrController],
    }).compile();

    controller = module.get<SubCatFltrController>(SubCatFltrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
