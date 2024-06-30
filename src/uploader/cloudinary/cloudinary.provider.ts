import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    const config = new ConfigService().get('cloudinary');
    return cloudinary.config({
      cloud_name: config?.cloud_name || process.env.CLOUDINARY_CLOUD_NAME,
      api_key: config?.api_key || process.env.CLOUDINARY_API_KEY,
      api_secret: config?.api_secret || process.env.CLOUDINARY_API_SECRET,
    });
  },
};
