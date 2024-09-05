import { NatsPublisher, ticket, TicketUpdatedEvent } from "@project3/common";

export class TicketUpdatedPublisher extends NatsPublisher<TicketUpdatedEvent> {
  subject: TicketUpdatedEvent["subject"] = ticket.subjects.TicketUpdated;
}
