import ApiError from '../../../errors/ApiError.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { WorkImage } from '../../middlewares/uploader/workFileUploader.js';
import { workSearchableField } from './work.constant.js';
import { Work } from './work.model.js';

const addWork = async payload => {
  const result = await Work.create(payload);
  return result;
};

const getAllWorks = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: workSearchableField.map(field => ({
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

  const result = await Work.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Work.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleWork = async id => {
  const result = await Work.findById({ _id: id });

  return result;
};

const updateWork = async (id, payload) => {
  const work = await Work.findById({ _id: id });

  if (!work) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Work not found');
  }

  if (payload.thumbnail && work.thumbnail) {
    WorkImage.deleteImage(work.thumbnail);
  }

  const result = await Work.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteWork = async id => {
  const work = await Work.findById({ _id: id });

  if (!work) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Work not found');
  }

  if (work.thumbnail) {
    WorkImage.deleteImage(work.thumbnail);
  }

  const result = await Work.findByIdAndDelete({ _id: id });
  return result;
};

export const WorkService = {
  addWork,
  getAllWorks,
  getSingleWork,
  updateWork,
  deleteWork,
};
