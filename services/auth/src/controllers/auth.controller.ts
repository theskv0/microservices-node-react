import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { HydratedDocument } from "mongoose";
import PasswordUtil from "../utils/password.util";
import { JwtUtil, nats, ValidationException } from "@project3/common";
import { UserCreatedPublisher } from "../publishers/user-created.publisher";
import { UserUpdatedPublisher } from "../publishers/user-updated.publisher";

const AuthController = {
  signup: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) throw new ValidationException({ email: "email already taken" });
    user = new User({
      name,
      email,
      password,
    });
    await user.save();
    new UserCreatedPublisher(nats.client).publish({ id: user.id, name: user.name });
    const token = JwtUtil.signToken({ user_id: user.id });
    req.session = { token };
    return res.status(201).json({ user });
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user: HydratedDocument<IUser> | null = await User.findOne({
      email,
    });
    if (!user)
      throw new ValidationException({
        email: "user not found with this email",
      });
    if (!(await PasswordUtil.compair(password, user.password)))
      throw new ValidationException({ password: "password doesn't match" });
    const token = JwtUtil.signToken({ user_id: user.id });
    req.session = { token };
    return res.json({ user });
  },

  logout: async (req: Request, res: Response) => {
    req.session = null;
    return res.json({});
  },

  currentUser: async (req: Request, res: Response) => {
    const user: HydratedDocument<IUser> | null = await User.findById(req.auth_user_id);
    return res.json({ user });
  },

  updateProfile: async (req: Request, res: Response) => {
    const user: HydratedDocument<IUser> | null = await User.findById(req.auth_user_id);
    if (user) {
      user.name = req.body.name;
      await user.save();
      new UserUpdatedPublisher(nats.client).publish({ id: user.id, name: user.name });
    }
    return res.json({ user });
  },
};

export default AuthController;
