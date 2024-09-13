import { nats } from "@project3/common";
import { AuthListener } from "./auth/auth.listner";
import { OrderListener } from "./order/order.listner";

const startNatsListeners = () => {
  new AuthListener(nats.client).listen();
  new OrderListener(nats.client).listen();
};
export default startNatsListeners;
