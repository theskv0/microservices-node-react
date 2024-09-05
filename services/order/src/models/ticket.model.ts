import { model, Model, Schema } from "mongoose";
import IBase from "./base.model";

export interface ITicket extends IBase {
  title: string;
  price: number;
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

const Ticket = model<ITicket, TicketModel>("Ticket", TicketSchema);

export default Ticket;
