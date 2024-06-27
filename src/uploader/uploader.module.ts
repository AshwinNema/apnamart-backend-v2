import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploaderController } from './uploader.controller';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';

@Module({
  providers: [UploaderService, CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [UploaderController],
})
export class UploaderModule {}
