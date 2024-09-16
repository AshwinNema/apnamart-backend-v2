import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import prisma from 'src/prisma/client';
import { CloudinaryService } from 'src/uploader/cloudinary/cloudinary.service';
import { CloudinaryResponse } from 'src/utils/types';
import { MerchantDetails } from 'src/validations';

@Injectable()
export class MerchantService {
  constructor(private cloudinaryService: CloudinaryService) {}

  async createRegistration(
    body: Prisma.MerchantDetailsCreateInput,
    file: Express.Multer.File,
  ) {
    const uploadedFile: CloudinaryResponse =
      await this.cloudinaryService.uploadFile(file);

    return prisma.merchantDetails.create({
      data: {
        ...body,
        photo: uploadedFile.secure_url,
        cloudinary_public_id: uploadedFile.public_id,
      },
      omit: {
        cloudinary_public_id: true,
      },
    });
  }

  async updateRegistrationImg(userId: number, file: Express.Multer.File) {
    const registrationData =
      await this.cloudinaryService.deletePrismaEntityFile(
        'merchantDetails',
        undefined,
        { userId },
      );
    return this.cloudinaryService.updatePrismaEntityFile(
      'merchantDetails',
      registrationData.id,
      file,
    );
  }

  async updateMerchantRegistration(userId: number, body: MerchantDetails) {
    const data = await prisma.merchantDetails.update({
      where: { userId },
      data: body,
    });
    if (!data) {
      throw new BadRequestException('Merchant Registration not found');
    }
    return data;
  }
}
