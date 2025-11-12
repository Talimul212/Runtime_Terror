import express from 'express';
import { ProjectController } from './project.controller.js';

const router = express.Router();

router.post('/add-project', ProjectController.addProject);

router.get('/', ProjectController.getProjects);

router.get('/:id', ProjectController.getSingleProject);

router.patch('/:id', ProjectController.updateProject);

router.delete('/:id', ProjectController.deleteProject);

export const ProjectRoutes = router;
