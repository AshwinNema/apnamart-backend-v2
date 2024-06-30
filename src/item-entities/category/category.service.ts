import { Injectable } from '@nestjs/common';
import { CreateCategoryData, FormattedUser } from 'src/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/uploader/cloudinary/cloudinary.service';
import { CloudinaryResponse } from '../../utils/types';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getUnqiueCategory(filter: Prisma.CategoryWhereUniqueInput) {
    return this.prismaService.category.findFirstOrThrow({
      where: filter,
    });
  }

  async createCategory(
    data: CreateCategoryData,
    file: Express.Multer.File,
    user: FormattedUser,
  ) {
    const uploadedFile: CloudinaryResponse =
      await this.cloudinaryService.uploadFile(file);

    return this.prismaService.category.create({
      data: {
        ...data,
        photo: uploadedFile.secure_url,
        cloudinary_public_id: uploadedFile.public_id,
        createdBy: user.id,
      },
    });
  }

  async updateCategory(id: number, update: Prisma.CategoryUpdateInput) {
    return this.prismaService.category.update({ where: { id }, data: update });
  }

  async updateCategoryImg(id: number, file: Express.Multer.File) {
    await this.cloudinaryService.deletePrismaEntityFile('category', id);
    return this.cloudinaryService.updatePrismaEntityFile('category', id, file);
  }
  async getCategories() {
    return this.prismaService.category.findMany({})
  }
}
