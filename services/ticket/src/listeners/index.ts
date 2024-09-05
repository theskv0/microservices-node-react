import { nats } from "@project3/common";
import { AuthListener } from "./auth/auth.listner";

const startNatsListeners = () => {
  new AuthListener(nats.client).listen();
};
export default startNatsListeners;
