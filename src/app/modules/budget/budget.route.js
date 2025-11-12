import express from 'express';
import { BudgetController } from './budget.controller.js';

const router = express.Router();

router.post('/add-budget', BudgetController.addBudget);

router.get('/', BudgetController.getAllBudget);

router.get('/:id', BudgetController.getSingleBudget);

router.patch('/:id', BudgetController.updateBudget);

router.delete('/:id', BudgetController.deleteBudget);

export const BudgetRoutes = router;
