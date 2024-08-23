import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import prisma from 'src/prisma/client';

@Injectable()
export class SubCatFltrService {
  constructor() {}

  getOneFilter(where, throwError = false) {
    const data = prisma.subCategoryFilter.findFirst({ where });
    if (!data && throwError) {
      throw new NotFoundException('Sub category filter not found');
    }
    return data;
  }

  createFilter(data) {
    return prisma.subCategoryFilter.create({ data });
  }

  async updateFilter(id, update) {
    const data = await this.getOneFilter({ id }, true);

    if (update.name) {
      const filter = {
        id: { not: { id } },
        name: update.name,
        subCategoryId: null,
      };
      if (update.subCategoryId) {
        filter.subCategoryId = update.subCategoryId;
      } else {
        filter.subCategoryId = data.subCategoryId;
      }
      const duplicateData = await this.getOneFilter(filter);
      if (duplicateData) {
        throw new BadRequestException(
          'Filter with same name already present in the system',
        );
      }
    }

    return prisma.subCategoryFilter.update({
      where: { id },
      data: update,
    });
  }
}
