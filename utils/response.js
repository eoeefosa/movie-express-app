export const successResponse = (res, data, message = "Request successful") => {
  res.status(200).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (res, error, statusCode = 500) => {
  res.status(statusCode).json({
    status: "error",
    message: error.message || "An error occurred",
  });
};
