import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubCatFltrOptService {
  constructor(private prismaService: PrismaService) {}

  createSubCatFltrOption(data) {
    return this.prismaService.subCategoryFilterOption.create({ data });
  }

  update(where, data) {
    return this.prismaService.subCategoryFilterOption.update({ where, data });
  }
}
