import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma/client';

@Injectable()
export class FeatureService {
  constructor() {}

  getFeatureById(where) {
    return prisma.feature.findUniqueOrThrow({ where });
  }
  createFeature(data) {
    return prisma.feature.create({ data });
  }

  updateFeature(id, update) {
    return prisma.feature.update({ where: { id }, data: update });
  }
}
