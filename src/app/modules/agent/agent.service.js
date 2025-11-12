import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { Agent } from './agent.model.js';
import { AgentImage } from '../../middlewares/uploader/agentFileUploader.js';

const registerAgent = async payload => {
  const { phoneNumber, nid: nid } = payload;

  const isAgentExist = await Agent.emailExists(phoneNumber);

  if (isAgentExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Phone Number is already used');
  }
  const result = await Agent.create(payload);
  return result;
};

const getAgents = async () => {
  const result = await Agent.find({}).sort({ createdAt: 1 });

  const total = await Agent.countDocuments();

  return {
    meta: {
      total,
    },
    data: result,
  };
};

const updateAgent = async (id, payload) => {
  const agent = await Agent.findById({ _id: id });

  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found');
  }

  if (payload.thumbnail && agent.thumbnail) {
    AgentImage.deleteImage(agent.thumbnail);
  }

  const result = await Agent.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteAgent = async id => {
  const agent = await Agent.findById({ _id: id });

  if (!agent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found');
  }

  const result = await Agent.findByIdAndDelete({ _id: id });
  return result;
};
export const AgentService = {
  registerAgent,
  getAgents,
  updateAgent,
  deleteAgent,
};
