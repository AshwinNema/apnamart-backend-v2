import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { CloudinaryService } from 'src/uploader/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/uploader/cloudinary/cloudinary.provider';

@Module({
  providers: [UploaderService, CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class UploaderModule {}
