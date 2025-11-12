import express from 'express';
import { TeamMemberImage } from '../../middlewares/uploader/teamFileUploader.js';
import { TeamMemberController } from './team.controller.js';

const router = express.Router();

router.post(
  '/add-member',
  TeamMemberImage.uploadImage,
  TeamMemberController.addMember
);

router.get('/', TeamMemberController.getMembers);

router.patch(
  '/:id',
  TeamMemberImage.uploadImage,
  TeamMemberController.updateMember
);

router.delete('/:id', TeamMemberController.deleteMember);

export const TeamMemberRoutes = router;
