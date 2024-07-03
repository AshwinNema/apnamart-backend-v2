import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubCatFltrService {
  constructor(private prismaService: PrismaService) {}

  getFilterById(where) {
    return this.prismaService.subCategoryFilter.findUniqueOrThrow({ where });
  }

  createFilter(data) {
    return this.prismaService.subCategoryFilter.create({ data });
  }

  updateFilter(id, update) {
    return this.prismaService.subCategoryFilter.update({
      where: { id },
      data: update,
    });
  }
}
