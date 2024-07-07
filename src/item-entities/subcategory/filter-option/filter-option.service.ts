import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import prisma from 'src/prisma/client';
import { SubCatFltrService } from '../filter/filter.service';

@Injectable()
export class SubCatFltrOptService {
  constructor(private subCatFltrService: SubCatFltrService) {}

  async getOneFilterOption(cond, throwError = false) {
    const data = await prisma.subCategoryFilterOption.findFirst({
      where: cond,
    });

    if (!data && throwError) {
      throw new NotFoundException('Sub category filter option not found');
    }

    return data;
  }

  async createSubCatFltrOption(data) {
    await this.subCatFltrService.getOneFilter({ id: data.filterId }, true);
    const duplicateOption = await this.getOneFilterOption({
      filterId: data.filterId,
      name: data.name,
    });

    if (duplicateOption) {
      throw new BadRequestException(
        'Sub category with same name already present in the system',
      );
    }

    return prisma.subCategoryFilterOption.create({ data });
  }

  async update(where, data) {
    if (data.filterId) {
      await this.subCatFltrService.getOneFilter({ id: data.filterId }, true);
    }

    if (where.id) {
      await this.getOneFilterOption({ id: where.id }, true);
      if (data.name) {
        const duplicateOption = await this.getOneFilterOption({
          id: {
            not: where.id,
          },
          name: data.name,
        });

        if (!duplicateOption) {
          throw new BadRequestException(
            'Option with same name already present in the system',
          );
        }
      }
    }

    return prisma.subCategoryFilterOption.update({ where, data });
  }
}
