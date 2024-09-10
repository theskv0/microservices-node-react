import { model, Model, Schema, ObjectId, Types } from "mongoose";
import IBase from "./base.model";
import { OrderStatus } from "@project3/common";
import { IUser } from "./user.model";
import { ITicket } from "./ticket.model";

export interface IOrder extends IBase {
  user: IUser;
  ticket: ITicket;
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

const Order = model<IOrder, OrderModel>("Order", OrderSchema);

export default Order;
