import { Event, nats } from ".";
import { JetStreamClient, NatsConnection } from "nats";

export abstract class NatsPublisher<T extends Event> {
  abstract subject: T["subject"];

  private client: NatsConnection;
  private jetstream: JetStreamClient;

  constructor(client: NatsConnection) {
    this.client = client;
    this.jetstream = this.client.jetstream();
  }

  async publish(data: T["data"]) {
    const publishAck = await this.jetstream.publish(this.subject, JSON.stringify(data));
    if (nats.debug) {
      console.log({
        stream: publishAck.stream,
        subject: this.subject,
        seq: publishAck.seq,
        data: data,
      });
    }
  }
}
