import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma/client';

@Injectable()
export class SubCatFltrService {
  constructor() {}

  getFilterById(where) {
    return prisma.subCategoryFilter.findUniqueOrThrow({ where });
  }

  createFilter(data) {
    return prisma.subCategoryFilter.create({ data });
  }

  updateFilter(id, update) {
    return prisma.subCategoryFilter.update({
      where: { id },
      data: update,
    });
  }
}
