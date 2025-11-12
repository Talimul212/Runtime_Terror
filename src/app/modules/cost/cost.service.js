import ApiError from '../../../errors/ApiError.js';
import { Project } from '../project/project.model.js';
import { Cost } from './cost.model.js';

const addCost = async payload => {
  const result = await Cost.create(payload);

  await Project.findByIdAndUpdate(
    payload.project,
    { $push: { costDetails: result._id } },
    { new: true }
  );

  return result;
};

const getAllCost = async () => {
  const result = await Cost.find({}).sort({ createdAt: 1 });

  const total = await Cost.countDocuments();

  return {
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleCost = async id => {
  const cost = await Cost.findById({ _id: id });
  return cost;
};

const updateCost = async (id, payload) => {
  const cost = await Cost.findById({ _id: id });

  if (!cost) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cost not found');
  }

  const result = await Cost.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCost = async id => {
  const cost = await Cost.findById({ _id: id });

  if (!cost) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cost not found');
  }

  const result = await Cost.findByIdAndDelete({ _id: id });
  return result;
};

export const CostService = {
  addCost,
  getAllCost,
  getSingleCost,
  updateCost,
  deleteCost,
};
