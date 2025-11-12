import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import { User } from './auth.model.js';
import { jwtHelpers } from '../../../helpers/jwtHelpers.js';
import config from '../../../config/index.js';

const registerUser = async payload => {
  const { phoneNumber, password: userPassword } = payload;
  const isUserExist = await User.emailExists(phoneNumber);
  if (isUserExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Phone Number is already used');
  }
  if (userPassword?.length < 6) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Password length have to be at least 6'
    );
  }
  const result = await User.create(payload);
  const accessToken = jwtHelpers.createToken(
    {
      id: result._id,
      phoneNumber: result?.phoneNumber,
      role: result?.role,
      name: result?.name,
    },
    config.jwt.secret,
    config.jwt.expireIn
  );

  const refreshToken = jwtHelpers.createToken(
    {
      id: result._id,
      phoneNumber: result?.phoneNumber,
      role: result?.role,
    },
    config.jwt.refreshSecret,
    config.jwt.refresh_expireIn
  );

  return { accessToken, refreshToken };
};

const loginUser = async payload => {
  const { phoneNumber, password: userPassword } = payload;
  const isUserExist = await User.findOne({ phoneNumber: phoneNumber });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (
    isUserExist.password &&
    userPassword &&
    !(await User.isPasswordMatched(
      userPassword.toString(),
      isUserExist.password.toString()
    ))
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      `Phone Number or Password didn't match`
    );
  }
  const accessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      phoneNumber: isUserExist?.phoneNumber,
      email: isUserExist?.email,
      role: isUserExist?.role,
      name: isUserExist?.name,
    },
    config.jwt.secret,
    config.jwt.expireIn
  );

  const refreshToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      email: isUserExist?.email,
      phoneNumber: isUserExist?.phoneNumber,
      role: isUserExist?.role,
      name: isUserExist?.name,
    },
    config.jwt.refreshSecret,
    config.jwt.refresh_expireIn
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async token => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refreshSecret);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { phoneNumber } = verifiedToken;

  const isUserExist = await User.emailExists(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      phoneNumber: isUserExist?.phoneNumber,
      role: isUserExist?.role,
    },
    config.jwt.secret,
    config.jwt.expireIn
  );

  return {
    accessToken: newAccessToken,
  };
};

const getUsers = async () => {
  const result = await User.find({}).sort({ createdAt: 1 });

  const total = await User.countDocuments();

  return {
    meta: {
      total,
    },
    data: result,
  };
};

const updateUser = async (id, payload) => {
  const user = await User.findById({ _id: id });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const newRole = user.role === 'admin' ? 'user' : 'admin';

  const updatedPayload = { ...payload, role: newRole };

  const result = await User.findByIdAndUpdate({ _id: id }, updatedPayload, {
    new: true,
  });
  return result;
};

const deleteUser = async id => {
  const user = await User.findById({ _id: id });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

export const UserService = {
  registerUser,
  loginUser,
  refreshToken,
  getUsers,
  updateUser,
  deleteUser,
};
