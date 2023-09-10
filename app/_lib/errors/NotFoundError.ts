import CustomApiError from "./CustomApiError";

class NotFoundError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
