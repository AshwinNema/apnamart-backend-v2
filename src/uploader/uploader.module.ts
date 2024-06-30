import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { CloudinaryService } from 'src/uploader/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/uploader/cloudinary/cloudinary.provider';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    UploaderService,
    CloudinaryProvider,
    CloudinaryService,
    PrismaService,
  ],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class UploaderModule {}
