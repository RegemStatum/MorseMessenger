import CustomApiError from "./CustomApiError";

class BadRequestError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
