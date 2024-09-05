import { TicketCreatedEvent } from "@project3/common";
import { ticketCreatedHandler } from "./ticket-created.handler";
import Ticket from "../../../models/ticket.model";

export const ticketUpdatedHandler = async (data: TicketCreatedEvent["data"]): Promise<boolean> => {
  const ticket = await Ticket.findById(data.id);
  if (ticket) {
    ticket.title = data.title;
    ticket.price = data.price;
    await ticket.save();
    return true;
  }
  return await ticketCreatedHandler(data);
};
