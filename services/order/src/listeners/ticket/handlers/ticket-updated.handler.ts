import { TicketUpdatedEvent } from "@project3/common";
import Ticket from "../../../models/ticket.model";

export const ticketUpdatedHandler = async (data: TicketUpdatedEvent["data"]): Promise<boolean> => {
  const ticket = await Ticket.findById(data.id);
  if (ticket && ticket.__v === data.version - 1) {
    ticket.title = data.title;
    ticket.price = data.price;
    ticket.__v = data.version;
    await ticket.save();
    return true;
  }
  return false;
};
