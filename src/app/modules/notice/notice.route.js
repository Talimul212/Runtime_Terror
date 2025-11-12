import express from 'express';
import { NoticeController } from './notice.controller.js';
import { NoticeImage } from '../../middlewares/uploader/noticeFileUploader.js';

const router = express.Router();

router.post('/add-notice', NoticeImage.uploadImage, NoticeController.addNotice);

router.get('/', NoticeController.getNotice);

router.get('/:id', NoticeController.getSingleNotice);

router.patch('/:id', NoticeImage.uploadImage, NoticeController.updateNotice);

router.delete('/:id', NoticeController.deleteNotice);

export const NoticeRoutes = router;
