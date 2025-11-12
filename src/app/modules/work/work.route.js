import express from 'express';
import { WorkController } from './work.controller.js';
import { WorkImage } from '../../middlewares/uploader/workFileUploader.js';

const router = express.Router();

router.post('/add-work', WorkImage.uploadImage, WorkController.addWork);

router.get('/', WorkController.getAllWorks);

router.get('/:id', WorkController.getSingleWork);

router.patch('/:id', WorkImage.uploadImage, WorkController.updateWork);

router.delete('/:id', WorkController.deleteWork);

export const WorkRoutes = router;
