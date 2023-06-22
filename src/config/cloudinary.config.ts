import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer, { Multer } from "multer";
import * as dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

const cloudinaryInst = cloudinary.v2;

cloudinaryInst.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryInst,
  params: (req: Request, file: Express.Multer.File) => {
    return {
      folder: "project3",
      allowed_formats: ["jpg", "png"],
      use_filename: true,
    };
  },
});

const uploadImg: Multer = multer({ storage });

export { uploadImg };
