import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from '../../utils/types';
import prisma from 'src/prisma/client';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  constructor() {}

  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteFile(public_id: string) {
    return cloudinary.uploader.destroy(public_id);
  }

  async deletePrismaEntityFile(entity: string, id: number) {
    const entityData = await prisma[entity].findUniqueOrThrow({
      where: { id },
    });
    const { cloudinary_public_id } = entityData;
    return this.deleteFile(cloudinary_public_id);
  }

  async updatePrismaEntityFile(
    entity: string,
    id: number,
    file: Express.Multer.File,
  ) {
    const uploadedFile: CloudinaryResponse = await this.uploadFile(file);
    return prisma[entity].update({
      where: { id },
      data: {
        photo: uploadedFile.secure_url,
        cloudinary_public_id: uploadedFile.public_id,
      },
    });
  }
}
