import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import AppError from '../errors/AppError';
import  fs  from 'fs';

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret
});

const UploadToCloudinary = async (file: Express.Multer.File) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: file.originalname,
      folder: 'ph-healthcare', 
      resource_type: 'auto',    
    });
    fs.unlinkSync(file.path);
    return {
      originalUrl: uploadResult.secure_url,
    
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    throw new AppError(500, 'Failed to upload image to Cloudinary');
  }
};

export default UploadToCloudinary;
