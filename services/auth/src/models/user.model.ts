import { Model, model, Schema } from "mongoose";
import PasswordUtil from "../utils/password.util";
import IBase from "./base.model";

export interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
}

export type UserModel = Model<IUser>;

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) this.password = await PasswordUtil.hash(this.password);
  next();
});

const User = model<IUser, UserModel>("User", UserSchema);

export default User;
