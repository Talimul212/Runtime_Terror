import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { CostService } from './cost.service.js';

const addCost = catchAsync(async (req, res) => {
  const { ...newsData } = req.body;
  const result = await CostService.addCost(newsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cost added successful',
    data: result,
  });
});

const getAllCost = catchAsync(async (req, res) => {
  const result = await CostService.getAllCost();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cost fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCost = catchAsync(async (req, res) => {
  const result = await CostService.getSingleCost(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cost fetched successfully',
    data: result,
  });
});

const updateCost = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await CostService.updateCost(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cost updated successfully',
    data: result,
  });
});

const deleteCost = catchAsync(async (req, res) => {
  const result = await CostService.deleteCost(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cost deleted successfully',
    data: result,
  });
});

export const CostController = {
  addCost,
  getAllCost,
  getSingleCost,
  updateCost,
  deleteCost,
};
