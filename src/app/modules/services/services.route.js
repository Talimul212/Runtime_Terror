import express from 'express';
import { ServicesController } from './services.controller.js';
import { ServiceImage } from '../../middlewares/uploader/serviceFileUploader.js';

const router = express.Router();

router.post(
  '/add-service',
  ServiceImage.uploadImage,
  ServicesController.addService
);

router.get('/', ServicesController.getAllService);

router.get('/:id', ServicesController.getSingleService);

router.patch(
  '/:id',
  ServiceImage.uploadImage,
  ServicesController.updateService
);

router.delete('/:id', ServicesController.deleteService);

export const ServiceRoutes = router;
