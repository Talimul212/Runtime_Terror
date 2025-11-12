import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { TeamMemberService } from './team.service.js';

const addMember = catchAsync(async (req, res) => {
  const profile = req.profile;
  const { ...newsData } = req.body;
  const data = { ...newsData, profile };
  const result = await TeamMemberService.addMember(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Member added successful',
    data: result,
  });
});

const getMembers = catchAsync(async (req, res) => {
  const result = await TeamMemberService.getMembers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateMember = catchAsync(async (req, res) => {
  const profile = req.profile;
  const payload = profile ? { ...req.body, profile } : req.body;

  const result = await TeamMemberService.updateMember(req.params.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member updated successfully',
    data: result,
  });
});

const deleteMember = catchAsync(async (req, res) => {
  const result = await TeamMemberService.deleteMember(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member deleted successfully',
    data: result,
  });
});

export const TeamMemberController = {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
};
