export const successResponse = (
  res,
  data = null,
  message = 'Success',
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

export const errorResponse = (
  res,
  message = 'Internal Server Error',
  code = 'INTERNAL_ERROR',
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
    },
  });
};

