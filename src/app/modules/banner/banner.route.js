import express from 'express';
import { BannerThumbnailUploader } from '../../middlewares/uploader/bannerFileUploader.js';
import { BannerController } from './banner.controller.js';

const router = express.Router();

router.post(
  '/add-banner',
  BannerThumbnailUploader.uploadImage,
  BannerController.addBanner
);

router.get('/', BannerController.getAllBanner);

router.patch(
  '/:id',
  BannerThumbnailUploader.uploadImage,
  BannerController.updateBanner
);

router.delete('/:id', BannerController.deleteBanner);

export const BannerRoutes = router;
