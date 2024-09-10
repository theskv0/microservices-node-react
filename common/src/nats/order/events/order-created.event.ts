import { OrderSubjects } from "..";

export interface OrderCreatedEvent {
  subject: OrderSubjects.OrderCreated;
  data: {
    id: string;
    user_id: string;
    ticket_id: string;
    expired_at: string;
  };
}
