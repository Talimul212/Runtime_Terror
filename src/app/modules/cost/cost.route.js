import express from 'express';
import { CostController } from './cost.controller.js';

const router = express.Router();

router.post('/add-cost', CostController.addCost);

router.get('/', CostController.getAllCost);

router.get('/:id', CostController.getSingleCost);

router.patch('/:id', CostController.updateCost);

router.delete('/:id', CostController.deleteCost);

export const CostRoutes = router;
