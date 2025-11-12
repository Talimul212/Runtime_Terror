import ApiError from '../../../errors/ApiError.js';
import { paginationHelpers } from '../../../helpers/paginationHelper.js';
import { Cost } from '../cost/cost.model.js';
import { projectSearchableField } from './Project.constant.js';
import { Project } from './project.model.js';

const addProject = async payload => {
  const result = await Project.create(payload);
  return result;
};

const getProjects = async (filters, paginationOption) => {
  const { searchTerm, ...filteredData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: projectSearchableField.map(field => ({
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

  const result = await Project.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('costDetails')
    .populate('budgetDetails');

  const total = await Project.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleProject = async id => {
  const project = await Project.findById({ _id: id })
    .populate('costDetails')
    .populate('budgetDetails');

  // Calculate total cost
  const totalCost = project.costDetails.reduce((total, costDetail) => {
    return total + costDetail.costAmount;
  }, 0);

  // Calculate total budget
  const totalBudget = project.budgetDetails.reduce((total, budgetDetail) => {
    return total + budgetDetail.budgetAmount;
  }, 0);
  return {
    project,
    totalCost,
    totalBudget,
  };
};

const updateProject = async (id, payload) => {
  const project = await Project.findById({ _id: id });

  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  const result = await Project.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProject = async id => {
  const project = await Project.findById({ _id: id });

  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }

  await Cost.deleteMany({ _id: { $in: project.costDetails } });

  const result = await Project.findByIdAndDelete({ _id: id });
  return result;
};

export const ProjectService = {
  addProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
