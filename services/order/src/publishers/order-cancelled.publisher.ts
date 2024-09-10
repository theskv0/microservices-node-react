import { NatsPublisher, OrderCancelledEvent, OrderSubjects } from "@project3/common";

export class OrderCancelledPublisher extends NatsPublisher<OrderCancelledEvent> {
  subject: OrderCancelledEvent["subject"] = OrderSubjects.OrderCancelled;
}
