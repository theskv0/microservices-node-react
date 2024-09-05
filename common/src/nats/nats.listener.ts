import { Event, Listener, nats } from ".";
import { JetStreamClient, JsMsg, NatsConnection } from "nats";

export abstract class NatsListener<T extends Listener> {
  abstract stream: T["stream"];
  abstract queueGroup: T["queueGroup"];
  abstract onMessage(data: T["data"], msg: JsMsg): void;

  private client: NatsConnection;
  private jetstream: JetStreamClient;
  protected ackWait: number = 5 * 1000000000;

  constructor(client: NatsConnection) {
    this.client = client;
    this.jetstream = this.client.jetstream();
  }

  async listen() {
    const consumers = await this.jetstream.consumers.get(this.stream, this.queueGroup);

    const messages = await consumers.consume({ max_messages: 1 });

    for await (let msg of messages) {
      const rawData = msg.data.toString();
      const data: T["data"] = JSON.parse(rawData);
      if (nats.debug) {
        console.log({
          stream: msg.info.stream,
          consumer: msg.info.consumer,
          subject: msg.subject,
          seq: msg.seq,
          data: data,
        });
      }
      await this.onMessage(data, msg);
    }
  }
}
