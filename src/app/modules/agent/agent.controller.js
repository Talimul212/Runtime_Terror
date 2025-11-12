import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendResponse from '../../../shared/sendResponse.js';
import { AgentService } from './agent.service.js';

const registerAgent = catchAsync(async (req, res) => {
  const thumbnail = req.thumbnail;
  const { ...agentData } = req.body;
  console.log(req.body);
  const data = { ...agentData, thumbnail };

  const result = await AgentService.registerAgent(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Agent register successful',
    data: result,
  });
});

const getAgents = catchAsync(async (req, res) => {
  const result = await AgentService.getAgents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Agent fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateAgent = catchAsync(async (req, res) => {
  const result = await AgentService.updateAgent(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Agent updated successfully',
    data: result,
  });
});

const deleteAgent = catchAsync(async (req, res) => {
  const result = await AgentService.deleteAgent(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'agent deleted successfully',
    data: result,
  });
});

export const AgentController = {
  registerAgent,
  getAgents,
  updateAgent,
  deleteAgent,
};
