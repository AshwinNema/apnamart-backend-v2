import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeatureOptionService {
  constructor(private prismaService: PrismaService) {}

  createFeatureOption(data) {
    return this.prismaService.featureOption.create({ data });
  }

  update(where, data) {
    return this.prismaService.featureOption.update({ where, data });
  }
}
