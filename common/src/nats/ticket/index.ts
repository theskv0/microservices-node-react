export enum TicketSubjects {
  TicketCreated = "ticket.created",
  TicketUpdated = "ticket.updated",
}

export const ticket = {
  streamName: "ticket",
  subjects: TicketSubjects,
};

export * from "./events/ticket-created.event";
export * from "./events/ticket-updated.event";
