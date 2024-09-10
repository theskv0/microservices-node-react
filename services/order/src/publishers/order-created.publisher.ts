import { NatsPublisher, OrderCreatedEvent, OrderSubjects } from "@project3/common";

export class OrderCreatedPublisher extends NatsPublisher<OrderCreatedEvent> {
  subject: OrderCreatedEvent["subject"] = OrderSubjects.OrderCreated;
}
