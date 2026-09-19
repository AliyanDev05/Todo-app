class ApiError extends Error {
  statusCode: number;
  errors: unknown[];
  data: null;
  success: boolean;
  constructor(
    statusCode: number,
    message = "something went wrong",
    errors: unknown[] = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
