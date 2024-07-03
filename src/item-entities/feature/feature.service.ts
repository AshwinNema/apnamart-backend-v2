import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeatureService {
  constructor(private prismaService: PrismaService) {}

  getFeatureById(where) {
    return this.prismaService.feature.findUniqueOrThrow({ where });
  }
  createFeature(data) {
    return this.prismaService.feature.create({ data });
  }

  updateFeature(id, update) {
    return this.prismaService.feature.update({ where: { id }, data: update });
  }
}
