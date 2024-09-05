import { TicketSubjects } from "..";

export interface TicketUpdatedEvent {
  subject: TicketSubjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
