import { order, Listener, NatsListener, OrderCreatedEvent } from "@project3/common";
import { JsMsg } from "nats";
import { orderCreatedHandler } from "./handlers/order-created.handler";

export class OrderListener extends NatsListener<Listener> {
  stream: Listener["stream"] = order.streamName;
  queueGroup: Listener["queueGroup"] = "ticket-service";

  async onMessage(data: Listener["data"], msg: JsMsg) {
    switch (msg.subject) {
      case order.subjects.OrderCreated:
        if (await orderCreatedHandler(data as OrderCreatedEvent["data"])) msg.ack();
        break;
      default:
        break;
    }
  }
}
