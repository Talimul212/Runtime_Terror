import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import pick from '../../../shared/pick.js';
import { paginationFields } from '../../../constants/pagination.js';
import { ProjectService } from './project.service.js';
import { projectFilterableField } from './Project.constant.js';

const addProject = catchAsync(async (req, res) => {
  const { ...newsData } = req.body;
  const result = await ProjectService.addProject(newsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project added successful',
    data: result,
  });
});

const getProjects = catchAsync(async (req, res) => {
  const filters = pick(req.query, projectFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProjectService.getProjects(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const result = await ProjectService.getSingleProject(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project fetched successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await ProjectService.updateProject(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const result = await ProjectService.deleteProject(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project deleted successfully',
    data: result,
  });
});

export const ProjectController = {
  addProject,
  getProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
