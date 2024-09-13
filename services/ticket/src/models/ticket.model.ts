import { CallbackWithoutResultAndOptionalError, model, Model, ObjectId, Schema, Types } from "mongoose";
import IBase from "./base.model";
import { IUser } from "./user.model";

export interface ITicket extends IBase {
  title: string;
  price: number;
  user: IUser;
  order: string;
}

export type TicketModel = Model<ITicket>;

const TicketSchema = new Schema<ITicket, TicketModel>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    order: {
      type: String,
      required: false,
      default: null,
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

async function versitioning(this: any, next: CallbackWithoutResultAndOptionalError) {
  if (typeof this.__v === "number") {
    this.__v += 1;
  } else {
    this.__v = 0;
  }
  next();
}

TicketSchema.pre<ITicket>("save", versitioning);

const Ticket = model<ITicket, TicketModel>("Ticket", TicketSchema);

export default Ticket;
