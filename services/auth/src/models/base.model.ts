import { Document } from "mongoose";

export default interface IBase extends Document {
  version: number;
  createdAt: string;
  updatedAt: string;
}
