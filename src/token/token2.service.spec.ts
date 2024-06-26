import { Test, TestingModule } from '@nestjs/testing';
import { TokenService2 } from './token2.service';

describe('TokenService2', () => {
  let service: TokenService2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService2],
    }).compile();

    service = module.get<TokenService2>(TokenService2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
