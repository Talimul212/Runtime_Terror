import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import pick from '../../../shared/pick.js';
import { paginationFields } from '../../../constants/pagination.js';
import { WorkService } from './work.service.js';
import { workFilterableField } from './work.constant.js';
import { WorkCount } from './workCount.js';

const addWork = catchAsync(async (req, res) => {
  const thumbnail = req.thumbnail;
  const { ...newsData } = req.body;

  const data = { ...newsData, thumbnail };
  const result = await WorkService.addWork(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work added successful',
    data: result,
  });
});

const getAllWorks = catchAsync(async (req, res) => {
  const filters = pick(req.query, workFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await WorkService.getAllWorks(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Works fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleWork = catchAsync(async (req, res) => {
  const propertyId = req.params.id;

  // Increment visit count in MongoDB
  let visitCountDoc = await WorkCount.findOneAndUpdate(
    { propertyId },
    { $inc: { count: 1 } },
    { new: true, upsert: true } // Create if not exists, otherwise update
  );
  const result = await WorkService.getSingleWork(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work fetched successfully',
    data: result,
    visitCount: visitCountDoc.count,
  });
});

const updateWork = catchAsync(async (req, res) => {
  const thumbnail = req.thumbnail;
  const payload = thumbnail ? { ...req.body, thumbnail } : req.body;

  const result = await WorkService.updateWork(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work updated successfully',
    data: result,
  });
});

const deleteWork = catchAsync(async (req, res) => {
  const result = await WorkService.deleteWork(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work deleted successfully',
    data: result,
  });
});

export const WorkController = {
  addWork,
  getAllWorks,
  getSingleWork,
  updateWork,
  deleteWork,
};
