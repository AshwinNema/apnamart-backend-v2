import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateSubCategoryData, FormattedUser } from 'src/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/uploader/cloudinary/cloudinary.service';
import { CloudinaryResponse } from '../../utils/types';

@Injectable()
export class SubcategoryService {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  getUniqueSubCategory(filter: Prisma.SubCategoryWhereUniqueInput) {
    return this.prismaService.subCategory.findUnique({
      where: filter,
    });
  }

  async createSubCategory(
    body: CreateSubCategoryData,
    file: Express.Multer.File,
    user: FormattedUser,
  ) {
    const uploadedFile: CloudinaryResponse =
      await this.cloudinaryService.uploadFile(file);
    return this.prismaService.subCategory.create({
      data: {
        ...body,
        photo: uploadedFile.secure_url,
        cloudinary_public_id: uploadedFile.public_id,
        createdBy: user.id,
      },
    });
  }

  async updateSubCategory(id: number, update: Prisma.SubCategoryUpdateInput) {
    return this.prismaService.subCategory.update({
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
    return this.prismaService.subCategory.findMany({});
  }
}
