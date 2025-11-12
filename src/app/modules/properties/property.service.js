import ApiError from '../../../errors/ApiError.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { PropertyImage } from '../../middlewares/uploader/propertyFileUploader.js';
import { propertySearchableField } from './property.constant.js';
import { Property } from './property.model.js';

const addProperty = async payload => {
  const result = await Property.create(payload);
  return result;
};

const getProperties = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: propertySearchableField.map(field => ({
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

  const result = await Property.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Property.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleProperty = async id => {
  const result = await Property.findById({ _id: id });
  return result;
};

const updateProperty = async (id, payload) => {
  const property = await Property.findById({ _id: id });

  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }

  if (payload.thumbnail && property.thumbnail) {
    PropertyImage.deleteImage(property.thumbnail);
  }

  const result = await Property.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProperty = async id => {
  const property = await Property.findById({ _id: id });

  if (!property) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Property not found');
  }

  if (property.thumbnail) {
    PropertyImage.deleteImage(property.thumbnail);
  }

  const result = await Property.findByIdAndDelete({ _id: id });
  return result;
};

export const PropertyService = {
  addProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};
