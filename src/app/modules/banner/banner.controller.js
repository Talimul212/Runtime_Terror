import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { BannerService } from './banner.service.js';

const addBanner = catchAsync(async (req, res) => {
  const thumbnail = req.thumbnail;
  const { ...newsData } = req.body;
  const data = { ...newsData, thumbnail };
  const result = await BannerService.addBanner(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner added successful',
    data: result,
  });
});

const getAllBanner = catchAsync(async (req, res) => {
  const result = await BannerService.getAllBanner();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateBanner = catchAsync(async (req, res) => {
  const thumbnail = req.thumbnail;
  const payload = thumbnail ? { ...req.body, thumbnail } : req.body;

  const result = await BannerService.updateBanner(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner updated successfully',
    data: result,
  });
});

const deleteBanner = catchAsync(async (req, res) => {
  const result = await BannerService.deleteBanner(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner deleted successfully',
    data: result,
  });
});

export const BannerController = {
  addBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
};
