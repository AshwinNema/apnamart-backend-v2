import { Test, TestingModule } from '@nestjs/testing';
import { SubCatFltrService } from './filter.service';

describe('SubCatFltrService', () => {
  let service: SubCatFltrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCatFltrService],
    }).compile();

    service = module.get<SubCatFltrService>(SubCatFltrService);
========
import { Auth2Service } from './auth2.service';

describe('Auth2Service', () => {
  let service: Auth2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth2Service],
    }).compile();

    service = module.get<Auth2Service>(Auth2Service);
>>>>>>>> b8b506f505cb17180d41d99ffa2b508650edb1a0:src/auth/auth2.service.spec.ts
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
