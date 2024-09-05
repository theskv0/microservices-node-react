import { nats } from "@project3/common";
import { AuthListener } from "./auth/auth.listner";
import { TicketListener } from "./ticket/ticket.listner";

const startNatsListeners = () => {
  new AuthListener(nats.client).listen();
  new TicketListener(nats.client).listen();
};
export default startNatsListeners;
