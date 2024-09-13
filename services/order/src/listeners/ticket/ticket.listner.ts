import { ticket, Listener, NatsListener, TicketCreatedEvent, TicketUpdatedEvent } from "@project3/common";
import { JsMsg } from "nats";
import { ticketCreatedHandler } from "./handlers/ticket-created.handler";
import { ticketUpdatedHandler } from "./handlers/ticket-updated.handler";

export class TicketListener extends NatsListener<Listener> {
  stream: Listener["stream"] = ticket.streamName;
  queueGroup: Listener["queueGroup"] = "order-service";

  async onMessage(data: Listener["data"], msg: JsMsg) {
    switch (msg.subject) {
      case ticket.subjects.TicketCreated:
        if (await ticketCreatedHandler(data as TicketCreatedEvent["data"])) msg.ack();
        break;
      case ticket.subjects.TicketUpdated:
        if (await ticketUpdatedHandler(data as TicketUpdatedEvent["data"])) msg.ack();
        break;
      default:
        break;
    }
  }
}
