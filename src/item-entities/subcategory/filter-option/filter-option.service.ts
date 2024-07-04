import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma/client';


@Injectable()
export class SubCatFltrOptService {
  constructor() {}

  createSubCatFltrOption(data) {
    return prisma.subCategoryFilterOption.create({ data });
  }

  update(where, data) {
    return prisma.subCategoryFilterOption.update({ where, data });
  }
}
