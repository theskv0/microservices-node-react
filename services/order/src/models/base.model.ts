import { Document } from "mongoose";

export default interface IBase extends Document {
  createdAt: string;
  updatedAt: string;
}
