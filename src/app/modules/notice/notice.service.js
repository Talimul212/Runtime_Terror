import ApiError from '../../../errors/ApiError.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { NoticeImage } from '../../middlewares/uploader/noticeFileUploader.js';
import { noticeSearchableField } from './notice.constant.js';
import { Notice } from './notice.model.js';

const addNotice = async payload => {
  const result = await Notice.create(payload);
  return result;
};

const getNotice = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: noticeSearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filteredData).length) {
    andConditions.push({
      $and: Object.entries(filteredData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Notice.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Notice.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleNotice = async id => {
  const result = await Notice.findById(id);
  return result;
};

const updateNotice = async (id, payload) => {
  const notice = await Notice.findById({ _id: id });

  if (!notice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notice not found');
  }

  if (payload.file && notice.file) {
    NoticeImage.deleteImage(notice.file);
  }

  const result = await Notice.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteNotice = async id => {
  const notice = await Notice.findById({ _id: id });

  if (!notice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notice not found');
  }

  if (notice.file) {
    NoticeImage.deleteImage(notice.file);
  }

  const result = await Notice.findByIdAndDelete({ _id: id });
  return result;
};

export const NoticeService = {
  addNotice,
  getNotice,
  getSingleNotice,
  updateNotice,
  deleteNotice,
};
