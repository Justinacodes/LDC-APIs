const { MongoError } = require("mongodb");
const httpStatus = require("http-status");
//const ApiError = require("./utils/ApiError");
const ApiError = require("../utils/ApiError")

const errorConverter = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || httpStatus[statusCode];
    err = new ApiError(statusCode, message, false);
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  // Handle MongoDB duplicate key error
  if (err instanceof MongoError && err.code === 11000) {
    statusCode = httpStatus.CONFLICT;
    message = "Duplicate key error";
  }
  // Handle other database errors
  else if (err instanceof MongoError || err.name === "DatabaseError") {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = "Database error";
  } else if (process.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    error: "error",
    code: statusCode,
    message,
    ...(process.env === "development" && {
      stack: err.stack,
      originalError: err,
    }),
  };

  if (process.env === "development") {
    console.log(err);
  }

  res.setHeader("Content-Type", "application/json");
  return res.status(statusCode).json(response);
};

module.exports = { errorConverter, errorHandler };
