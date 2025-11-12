import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { NoticeService } from './notice.service.js';
import pick from '../../../shared/pick.js';
import { noticeFilterableField } from './notice.constant.js';
import { paginationFields } from '../../../constants/pagination.js';

const addNotice = catchAsync(async (req, res) => {
  const file = req.file;
  const { ...newsData } = req.body;
  const data = { ...newsData, file };
  const result = await NoticeService.addNotice(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice added successful',
    data: result,
  });
});

const getNotice = catchAsync(async (req, res) => {
  const filters = pick(req.query, noticeFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await NoticeService.getNotice(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notices fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleNotice = catchAsync(async (req, res) => {
  const result = await NoticeService.getSingleNotice(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice fetched successfully',
    data: result,
  });
});

const updateNotice = catchAsync(async (req, res) => {
  const file = req.file;
  const payload = file ? { ...req.body, file } : req.body;

  const result = await NoticeService.updateNotice(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice updated successfully',
    data: result,
  });
});

const deleteNotice = catchAsync(async (req, res) => {
  const result = await NoticeService.deleteNotice(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice deleted successfully',
    data: result,
  });
});

export const NoticeController = {
  addNotice,
  getNotice,
  getSingleNotice,
  updateNotice,
  deleteNotice,
};
