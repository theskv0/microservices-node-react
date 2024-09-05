import { model, Model, Schema, ObjectId, Types } from "mongoose";
import IBase from "./base.model";

export enum OrderStatus {
  Pending = "pending",
  Paid = "paid",
  Expired = "expired",
}

export interface IOrder extends IBase {
  user: ObjectId;
  ticket: ObjectId;
  status: OrderStatus;
  expiresAt: Date;
}

export type OrderModel = Model<IOrder>;

const OrderSchema = new Schema<IOrder, OrderModel>(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: Types.ObjectId,
      required: true,
      ref: "Ticket",
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
    },
    expiresAt: {
      type: Date,
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

const Order = model<IOrder, OrderModel>("Order", OrderSchema);

export default Order;
