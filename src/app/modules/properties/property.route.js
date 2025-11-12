import express from 'express';
import { PropertyImage } from '../../middlewares/uploader/propertyFileUploader.js';
import { PropertyController } from './property.controller.js';

const router = express.Router();

router.post(
  '/add-property',
  PropertyImage.uploadImage,
  PropertyController.addProperty
);

router.get('/', PropertyController.getProperties);

router.get('/:id', PropertyController.getSingleProperty);

router.patch(
  '/:id',
  PropertyImage.uploadImage,
  PropertyController.updateProperty
);

router.delete('/:id', PropertyController.deleteProperty);

export const PropertyRoutes = router;
