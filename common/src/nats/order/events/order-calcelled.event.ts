import { OrderSubjects } from "..";

export interface OrderCancelledEvent {
  subject: OrderSubjects.OrderCancelled;
  data: {
    id: string;
    ticket_id: string;
    version: number;
  };
}
