import { auth, Listener, NatsListener, UserCreatedEvent, UserUpdatedEvent } from "@project3/common";
import { JsMsg } from "nats";
import { userCreatedHandler } from "./handlers/user-created.handler";
import { userUpdatedHandler } from "./handlers/user-updated.handler";

export class AuthListener extends NatsListener<Listener> {
  stream: Listener["stream"] = auth.streamName;
  queueGroup: Listener["queueGroup"] = "ticket-service";

  async onMessage(data: Listener["data"], msg: JsMsg) {
    switch (msg.subject) {
      case auth.subjects.AuthUserCreated:
        if (await userCreatedHandler(data as UserCreatedEvent["data"])) msg.ack();
        break;
      case auth.subjects.AuthUserUpdated:
        if (await userUpdatedHandler(data as UserUpdatedEvent["data"])) msg.ack();
        break;
      default:
        break;
    }
  }
}
