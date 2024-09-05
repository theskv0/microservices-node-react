import { NatsPublisher, ticket, TicketCreatedEvent } from "@project3/common";

export class TicketCreatedPublisher extends NatsPublisher<TicketCreatedEvent> {
  subject: TicketCreatedEvent["subject"] = ticket.subjects.TicketCreated;
}
