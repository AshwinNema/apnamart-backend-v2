import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma/client';

@Injectable()
export class FeatureOptionService {
  constructor() {}

  createFeatureOption(data) {
    return prisma.featureOption.create({ data });
  }

  update(where, data) {
    return prisma.featureOption.update({ where, data });
  }
}
