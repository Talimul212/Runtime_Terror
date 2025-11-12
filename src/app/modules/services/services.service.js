import ApiError from '../../../errors/ApiError.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { ServiceImage } from '../../middlewares/uploader/serviceFileUploader.js';
import { serviceSearchableField } from './services.constant.js';
import { Services } from './services.model.js';

const addService = async payload => {
  const result = await Services.create(payload);

  return result;
};

const getAllService = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: serviceSearchableField.map(field => ({
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

  const result = await Services.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Services.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleService = async id => {
  const result = await Services.findById({ _id: id });

  return result;
};

const updateService = async (id, payload) => {
  const service = await Services.findById({ _id: id });

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Services not found');
  }

  if (payload.thumbnail && service.thumbnail) {
    ServiceImage.deleteImage(service.thumbnail);
  }

  const result = await Services.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteService = async id => {
  const service = await Services.findById({ _id: id });

  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Services not found');
  }

  if (service.thumbnail) {
    ServiceImage.deleteImage(service.thumbnail);
  }

  const result = await Services.findByIdAndDelete({ _id: id });
  return result;
};

export const ServicesService = {
  addService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
