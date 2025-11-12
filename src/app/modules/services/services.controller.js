import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import pick from '../../../shared/pick.js';
import { paginationFields } from '../../../constants/pagination.js';
import { ServicesService } from './services.service.js';
import { serviceFilterableField } from './services.constant.js';
import { PromoteCount } from './promoteVisit.js';

const addService = catchAsync(async (req, res) => {
  const thumbnail = req.thumbnail;
  const { ...newsData } = req.body;
  console.log(req.body);

  const data = { ...newsData, thumbnail };
  const result = await ServicesService.addService(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service added successful',
    data: result,
  });
});

const getAllService = catchAsync(async (req, res) => {
  const filters = pick(req.query, serviceFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServicesService.getAllService(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Works fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const propertyId = req.params.id;

  // Increment visit count in MongoDB
  let visitCountDoc = await PromoteCount.findOneAndUpdate(
    { propertyId },
    { $inc: { count: 1 } },
    { new: true, upsert: true } // Create if not exists, otherwise update
  );
  const result = await ServicesService.getSingleService(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully',
    data: result,
    visitCount: visitCountDoc.count,
  });
});

const updateService = catchAsync(async (req, res) => {
  const thumbnail = req.thumbnail;
  const payload = thumbnail ? { ...req.body, thumbnail } : req.body;

  const result = await ServicesService.updateService(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const result = await ServicesService.deleteService(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const ServicesController = {
  addService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
