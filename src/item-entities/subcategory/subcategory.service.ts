import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from 'src/uploader/cloudinary/cloudinary.service';
import { CloudinaryResponse } from '../../utils/types';
import prisma from 'src/prisma/client';
import { SubCategoryInterface } from 'src/interfaces';

@Injectable()
export class SubcategoryService {
  constructor(private cloudinaryService: CloudinaryService) {}

  getUniqueSubCategory(filter: Prisma.SubCategoryWhereUniqueInput) {
    return prisma.subCategory.findUnique({
      where: filter,
    });
  }

  getOneSubCategory(filter) {
    return prisma.subCategory.findFirst({ where: filter });
  }

  async createSubCategory(
    body: Prisma.SubCategoryUncheckedCreateInput,
    file: Express.Multer.File,
  ) {
    const uploadedFile: CloudinaryResponse =
      await this.cloudinaryService.uploadFile(file);
    return prisma.subCategory.create({
      data: {
        ...body,
        photo: uploadedFile.secure_url,
        cloudinary_public_id: uploadedFile.public_id,
      },
    });
  }

  async updateSubCategory(id: number, update: SubCategoryInterface) {
    const data = await this.getUniqueSubCategory({ id });
    if (!data) {
      throw new NotFoundException('Sub category data not found');
    }

    if (update.name) {
      const filter = { id: { not: id }, name: update.name, categoryId: null };
      if (update.categoryId) {
        filter.categoryId = update.categoryId;
      } else {
        filter.categoryId = data.categoryId;
      }
      const duplicateData = await this.getOneSubCategory(filter);
      if (duplicateData) {
        throw new BadRequestException(
          'Sub category with this name is already present in the system for the given category',
        );
      }
    }
    return prisma.subCategory.update({
      where: { id },
      data: update,
    });
  }

  async updateSubcategoryImg(id: number, file: Express.Multer.File) {
    await this.cloudinaryService.deletePrismaEntityFile('subCategory', id);
    return this.cloudinaryService.updatePrismaEntityFile(
      'subCategory',
      id,
      file,
    );
  }

  getSubCategories() {
    return prisma.subCategory.findMany({});
  }
}
