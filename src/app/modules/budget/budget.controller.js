import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { BudgetService } from './budget.service.js';

const addBudget = catchAsync(async (req, res) => {
  const { ...newsData } = req.body;
  const result = await BudgetService.addBudget(newsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Budget added successful',
    data: result,
  });
});

const getAllBudget = catchAsync(async (req, res) => {
  const result = await BudgetService.getAllBudget();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Budget fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBudget = catchAsync(async (req, res) => {
  const result = await BudgetService.getSingleBudget(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Budget fetched successfully',
    data: result,
  });
});

const updateBudget = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await BudgetService.updateBudget(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Budget updated successfully',
    data: result,
  });
});

const deleteBudget = catchAsync(async (req, res) => {
  const result = await BudgetService.deleteBudget(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Budget deleted successfully',
    data: result,
  });
});

export const BudgetController = {
  addBudget,
  getAllBudget,
  getSingleBudget,
  updateBudget,
  deleteBudget,
};
