import { BadRequestError, MethodNotAllowedError } from "../errors";

type RequestMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

const verifyApiRequestMethod = (
  requestMethod: string | undefined,
  allowedApiRequestMethods: Array<RequestMethod>
) => {
  if (!requestMethod) throw new BadRequestError("Provide request method");
  const isAllowed =
    allowedApiRequestMethods.findIndex(
      (allowedMethod) => allowedMethod === requestMethod
    ) === -1
      ? false
      : true;
  if (!isAllowed) throw new MethodNotAllowedError("Method not allowed");
};

export default verifyApiRequestMethod;
