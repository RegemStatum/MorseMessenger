import CustomApiError from "./CustomApiError";

class MethodNotAllowedError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = 405;
  }
}

export default MethodNotAllowedError;
