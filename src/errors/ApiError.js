class ApiError extends Error {
  statusCode;
  message;

  constructor(statusCode, message, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (stack) {
      this.stack = stack;
    } else if (message) {
      this.message = message;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Method to handle file-related errors
  static handleFileError(err) {
    if (err.code === 'ENOENT') {
      return new ApiError(404, 'File not found');
    } else if (err.code === 'EISDIR') {
      return new ApiError(400, 'Path is a directory, not a file');
    } else if (err.code === 'EMFILE') {
      return new ApiError(500, 'Too many open files in system');
    } else if (err.code === 'ENFILE') {
      return new ApiError(500, 'File table overflow');
    } else if (err.code === 'ENOTDIR') {
      return new ApiError(400, 'A component of the path is not a directory');
    } else if (err.code === 'EACCES') {
      return new ApiError(403, 'Permission denied');
    } else if (err.code === 'EEXIST') {
      return new ApiError(409, 'File already exists');
    } else if (err.code === 'ENOTEMPTY') {
      return new ApiError(409, 'Directory is not empty');
    } else if (err.code === 'ENOSPC') {
      return new ApiError(507, 'No space left on device');
    } else if (err.code === 'EIO') {
      return new ApiError(500, 'Input/output error');
    } else if (err.code === 'ENAMETOOLONG') {
      return new ApiError(400, 'File name too long');
    } else if (err.code === 'EPERM') {
      return new ApiError(400, 'Operation not permitted');
    } else if (err.code === 'EPIPE') {
      return new ApiError(500, 'Broken pipe');
    } else if (err.code === 'ENXIO') {
      return new ApiError(500, 'No such device or address');
    } else if (err.code === 'EROFS') {
      return new ApiError(403, 'Read-only file system');
    } else if (err.code === 'EDEADLK') {
      return new ApiError(500, 'Resource deadlock avoided');
    } else if (err.code === 'EBADF') {
      return new ApiError(500, 'Bad file descriptor');
    } else if (err.code === 'EINVAL') {
      return new ApiError(400, 'Invalid argument');
    } else if (err.code === 'EAGAIN') {
      return new ApiError(503, 'Resource temporarily unavailable');
    } else if (err.code === 'EINTR') {
      return new ApiError(500, 'Interrupted system call');
    } else if (err.code === 'ENOMEM') {
      return new ApiError(500, 'Cannot allocate memory');
    } else if (err.code === 'ENOTBLK') {
      return new ApiError(500, 'Block device required');
    } else if (err.code === 'EXDEV') {
      return new ApiError(400, 'Cross-device link');
    } else if (err.code === 'ENOTTY') {
      return new ApiError(500, 'Inappropriate ioctl for device');
    } else if (err.code === 'EFBIG') {
      return new ApiError(413, 'File too large');
    } else if (err.code === 'ENOSYS') {
      return new ApiError(500, 'Function not implemented');
    } else if (err.code === 'ERANGE') {
      return new ApiError(500, 'Result too large');
    } else if (err.code === 'ESPIPE') {
      return new ApiError(500, 'Invalid seek');
    } else if (err.code === 'ETXTBSY') {
      return new ApiError(403, 'Text file busy');
    } else if (err.code === 'ENOTDIR') {
      return new ApiError(400, 'Not a directory');
    } else if (err.code === 'EROFS') {
      return new ApiError(403, 'Read-only file system');
    }
    return null;
  }
}

export default ApiError;
