import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import pick from '../../../shared/pick.js';
import { paginationFields } from '../../../constants/pagination.js';
import { PropertyService } from './property.service.js';
import { propertyFilterableField } from './property.constant.js';
import { VisitCount } from './VisitCount.js';

const addProperty = catchAsync(async (req, res) => {
  const thumbnail = req.thumbnail;
  const { ...newsData } = req.body;
  console.log(newsData);

  const data = { ...newsData, thumbnail };
  const result = await PropertyService.addProperty(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property added successful',
    data: result,
  });
});

const getProperties = catchAsync(async (req, res) => {
  const filters = pick(req.query, propertyFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await PropertyService.getProperties(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Properties fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleProperty = catchAsync(async (req, res) => {
  const propertyId = req.params.id;

  // Increment visit count in MongoDB
  let visitCountDoc = await VisitCount.findOneAndUpdate(
    { propertyId },
    { $inc: { count: 1 } },
    { new: true, upsert: true } // Create if not exists, otherwise update
  );

  const result = await PropertyService.getSingleProperty(propertyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property fetched successfully',
    data: result,
    visitCount: visitCountDoc.count,
  });
});

const updateProperty = catchAsync(async (req, res) => {
  const thumbnail = req.thumbnail;
  let payload = {};

  if (thumbnail) {
    payload = { ...req.body, thumbnail };
  } else {
    payload = req.body;
  }

  const result = await PropertyService.updateProperty(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property updated successfully',
    data: result,
  });
});

const deleteProperty = catchAsync(async (req, res) => {
  const result = await PropertyService.deleteProperty(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice deleted successfully',
    data: result,
  });
});

export const PropertyController = {
  addProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};
