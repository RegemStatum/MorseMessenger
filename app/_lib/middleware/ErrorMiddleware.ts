import { NextApiRequest, NextApiResponse } from "next";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const errorMiddleware = (handler: Handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      console.error(error);
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Server error" });
    }
  };
};

export default errorMiddleware;
