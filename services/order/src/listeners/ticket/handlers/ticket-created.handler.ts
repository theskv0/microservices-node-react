import { TicketCreatedEvent } from "@project3/common";
import Ticket from "../../../models/ticket.model";

export const ticketCreatedHandler = async (data: TicketCreatedEvent["data"]): Promise<boolean> => {
  const ticket = new Ticket({ _id: data.id, title: data.title, price: data.price });
  await ticket.save();
  return true;
};
