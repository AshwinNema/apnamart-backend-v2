import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from 'src/uploader/cloudinary/cloudinary.service';
import { CloudinaryResponse } from '../../utils/types';
import prisma from 'src/prisma/client';

@Injectable()
export class SubcategoryService {
  constructor(private cloudinaryService: CloudinaryService) {}

  getUniqueSubCategory(filter: Prisma.SubCategoryWhereUniqueInput) {
    return prisma.subCategory.findUnique({
      where: filter,
    });
  }

  async createSubCategory(
    body: Prisma.SubCategoryUncheckedCreateInput,
    file: Express.Multer.File,
  ) {
    if (
      await prisma.subCategory.findFirst({
        where: { name: body.name, categoryId: body.categoryId },
      })
    ) {
      throw new BadRequestException(
        'Sub category with the given name already present for category',
      );
    }

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

  async updateSubCategory(id: number, update: Prisma.SubCategoryUpdateInput) {
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
