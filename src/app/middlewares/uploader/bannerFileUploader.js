import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import uploader from '../../utils/fileUpload.js';

function uploadImage(req, res, next) {
  const upload = uploader(
    'banners',
    ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'],
    1000000,
    'Only .jpg, jpeg, .png or .pdf format allowed!'
  );

  // call the middleware function with two file fields
  upload.fields([{ name: 'thumbnail', maxCount: 1 }])(req, res, err => {
    if (err) {
      console.log(err);
      // throw new ApiError(500, err.message);
    } else {
      const thumbnail = req.files['thumbnail'];
      if (!thumbnail) {
        req.thumbnail = null;
      } else {
        req.thumbnail = thumbnail[0].filename;
      }
      next();
    }
  });
}

// Middleware to delete an image
function deleteImage(image) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // Check if req.image exists and is a valid image filename
  if (image) {
    const imagePath = path.join(
      __dirname,
      '../../..',
      './uploads/banners/',
      image
    );
    fs.unlink(imagePath, err => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });
  }
}

export const BannerThumbnailUploader = { uploadImage, deleteImage };
