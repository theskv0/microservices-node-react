import { model, Model, Schema } from "mongoose";
import IBase from "./base.model";

export interface IUser extends IBase {
  name: string;
}

export type UserModel = Model<IUser>;

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
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
        delete ret.__v;
      },
    },
  }
);

const User = model<IUser, UserModel>("User", UserSchema);

export default User;
