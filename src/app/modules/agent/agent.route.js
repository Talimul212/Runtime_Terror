import express from 'express';
import { AgentController } from './agent.controller.js';
import { AgentImage } from '../../middlewares/uploader/agentFileUploader.js';

const router = express.Router();

router.post(
  '/add-agent',
  AgentImage.uploadImage,
  AgentController.registerAgent
);
router.get('/', AgentController.getAgents);
router.patch('/:id', AgentImage.uploadImage, AgentController.updateAgent);

router.delete('/:id', AgentController.deleteAgent);

export const AgentRoutes = router;
