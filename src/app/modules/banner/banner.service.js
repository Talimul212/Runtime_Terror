import ApiError from '../../../errors/ApiError.js';
import { BannerThumbnailUploader } from '../../middlewares/uploader/bannerFileUploader.js';
import { Banner } from './banner.model.js';

const addBanner = async payload => {
  const result = await Banner.create(payload);
  return result;
};

const getAllBanner = async () => {
  const result = await Banner.find({}).sort({ createdAt: 1 });

  const total = await Banner.countDocuments();

  return {
    meta: {
      total,
    },
    data: result,
  };
};

const updateBanner = async (id, payload) => {
  const banner = await Banner.findById({ _id: id });

  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }

  if (payload.thumbnail && banner.thumbnail) {
    BannerThumbnailUploader.deleteImage(banner.thumbnail);
  }

  const result = await Banner.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBanner = async id => {
  const banner = await Banner.findById({ _id: id });

  if (!banner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }

  if (banner.thumbnail) {
    BannerThumbnailUploader.deleteImage(banner.thumbnail);
  }

  const result = await Banner.findByIdAndDelete({ _id: id });
  return result;
};

export const BannerService = {
  addBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
};
