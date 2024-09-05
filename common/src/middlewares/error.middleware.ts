import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception";

export const ErrorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    return res.status(err.code).json({ message: err.message, errors: err.errors });
  }
  console.error(err);
  return res.status(500).json({ message: err.message });
};
