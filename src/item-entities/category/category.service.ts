import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryData, UserInterface } from 'src/interfaces';
import { CloudinaryService } from 'src/uploader/cloudinary/cloudinary.service';
import { CloudinaryResponse } from '../../utils/types';
import { Prisma } from '@prisma/client';
import prisma from 'src/prisma/client';

@Injectable()
export class CategoryService {
  constructor(private cloudinaryService: CloudinaryService) {}

  async getUnqiueCategory(filter: Prisma.CategoryWhereUniqueInput) {
    return prisma.category.findUnique({
      where: filter,
    });
  }

  async createCategory(
    data: CreateCategoryData,
    file: Express.Multer.File,
    user: UserInterface,
  ) {
    if (
      await prisma.category.findUnique({
        where: { name: data.name },
      })
    ) {
      throw new BadRequestException('Category with this name already present');
    }
    const uploadedFile: CloudinaryResponse =
      await this.cloudinaryService.uploadFile(file);

    return prisma.category.create({
      data: {
        ...data,
        photo: uploadedFile.secure_url,
        cloudinary_public_id: uploadedFile.public_id,
        createdBy: user.id,
      },
    });
  }

  async updateCategory(id: number, update: Prisma.CategoryUpdateInput) {
    return prisma.category.update({ where: { id }, data: update });
  }

  async updateCategoryImg(id: number, file: Express.Multer.File) {
    await this.cloudinaryService.deletePrismaEntityFile('category', id);
    return this.cloudinaryService.updatePrismaEntityFile('category', id, file);
  }
  async getCategories() {
    return prisma.category.findMany({});
  }
}
