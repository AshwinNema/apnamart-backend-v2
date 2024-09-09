import { Test, TestingModule } from '@nestjs/testing';
import { TwitterAuthService } from './twitter-auth.service';

describe('TwitterAuthService', () => {
  let service: TwitterAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwitterAuthService],
    }).compile();

    service = module.get<TwitterAuthService>(TwitterAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
