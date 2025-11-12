import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { UserService } from './auth.service.js';

const registerUser = catchAsync(async (req, res) => {
  const { ...userData } = req.body;
  const result = await UserService.registerUser(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User register successful',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { ...userData } = req.body;
  const result = await UserService.loginUser(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { ...token } = req.body;
  const result = await UserService.refreshToken(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token generate successful',
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  const result = await UserService.getUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const result = await UserService.updateUser(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await UserService.deleteUser(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  registerUser,
  loginUser,
  refreshToken,
  getUsers,
  updateUser,
  deleteUser,
};
