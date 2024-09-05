import { TicketSubjects } from "..";

export interface TicketCreatedEvent {
  subject: TicketSubjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
