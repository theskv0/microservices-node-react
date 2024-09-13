import { OrderCreatedEvent, UserCreatedEvent } from "@project3/common";
import Ticket from "../../../models/ticket.model";

export const orderCreatedHandler = async (data: OrderCreatedEvent["data"]): Promise<boolean> => {
  const ticket = await Ticket.findById(data.ticket_id);
  if (ticket) {
    ticket.order = data.id;
    await ticket.save();
    return true;
  }
  return false;
};
