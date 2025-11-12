import ApiError from '../../../errors/ApiError.js';
import { TeamMemberImage } from '../../middlewares/uploader/teamFileUploader.js';
import { TeamMember } from './team.model.js';

const addMember = async payload => {
  const result = await TeamMember.create(payload);
  return result;
};

const getMembers = async () => {
  const result = await TeamMember.find({}).sort({ createdAt: 1 });

  const total = await TeamMember.countDocuments();

  return {
    meta: {
      total,
    },
    data: result,
  };
};

const updateMember = async (id, payload) => {
  const member = await TeamMember.findById({ _id: id });

  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
  }

  if (payload.profile && member.profile) {
    TeamMemberImage.deleteImage(member.profile);
  }

  const result = await TeamMember.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteMember = async id => {
  const notice = await TeamMember.findById({ _id: id });

  if (!notice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
  }

  if (notice.profile) {
    TeamMemberImage.deleteImage(notice.profile);
  }

  const result = await TeamMember.findByIdAndDelete({ _id: id });
  return result;
};

export const TeamMemberService = {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
};
