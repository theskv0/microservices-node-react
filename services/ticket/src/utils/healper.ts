import { HydratedDocument } from "mongoose";
import { ITicket } from "../models/ticket.model";

export const isTicketLocked = (ticket: HydratedDocument<ITicket>): boolean => {
  if (ticket.order) {
    return parseInt(ticket.updatedAt.valueOf()) + 15 * 60 * 1000 > Date.now();
  }
  return false;
};
