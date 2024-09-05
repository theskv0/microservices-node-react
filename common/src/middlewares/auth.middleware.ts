import { NextFunction, Request, Response } from "express";
import { JwtUtil } from "../utils/jwt.util";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";

declare global {
  namespace Express {
    interface Request {
      auth_user_id?: string;
      session: { [key: string]: string } | null;
    }
  }
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.session?.token;
  if (!token) return next(new UnauthorizedException());
  const payload: any = JwtUtil.validateToken(token);
  if (!payload) return next(new UnauthorizedException());
  req.auth_user_id = payload.user_id;
  next();
};
