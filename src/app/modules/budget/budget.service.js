import ApiError from '../../../errors/ApiError.js';
import { Project } from '../project/project.model.js';
import { Budget } from './budget.model.js';

const addBudget = async payload => {
  const result = await Budget.create(payload);

  await Project.findByIdAndUpdate(
    payload.project,
    { $push: { budgetDetails: result._id } },
    { new: true }
  );

  return result;
};

const getAllBudget = async () => {
  const result = await Budget.find({}).sort({ createdAt: 1 });

  const total = await Budget.countDocuments();

  return {
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleBudget = async id => {
  const budget = await Budget.findById({ _id: id });
  return budget;
};

const updateBudget = async (id, payload) => {
  const budget = await Budget.findById({ _id: id });

  if (!budget) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Budget not found');
  }

  const result = await Budget.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBudget = async id => {
  const budget = await Budget.findById({ _id: id });

  if (!budget) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Budget not found');
  }

  const result = await Budget.findByIdAndDelete({ _id: id });
  return result;
};

export const BudgetService = {
  addBudget,
  getAllBudget,
  getSingleBudget,
  updateBudget,
  deleteBudget,
};
