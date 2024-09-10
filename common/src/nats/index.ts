import { AckPolicy, connect, DeliverPolicy, NatsConnection, ReplayPolicy } from "nats";

export interface Event {
  subject: string;
  data: { [key: string]: any };
}

export interface Listener {
  stream: string;
  queueGroup: string;
  data: { [key: string]: any };
}

type ConnectOptions = {
  debug?: boolean;
};

class Nats {
  private _client?: NatsConnection;
  debug: boolean = false;
  ackWait: number | undefined;

  get client() {
    if (this._client) return this._client;
    throw new Error("NATS has not initialized yet");
  }

  async connect(url: string, options: ConnectOptions = {}, callback: Function = () => {}) {
    this.debug = typeof options?.debug === "boolean" ? options.debug : false;

    this._client = await connect({ servers: [url] });

    callback();

    this.client.closed().then(() => console.log("NATS closed"));

    process.on("SIGINT", async () => {
      console.log("NATS shutting down gracefully...");
      await this.client.close();
      process.exit();
    });
    process.on("SIGTERM", async () => {
      console.log("NATS shutting down gracefully...");
      await this.client.close();
      process.exit();
    });
  }

  async createStream(stream: string, subjects: string[]) {
    const jsm = await this.client.jetstreamManager();
    await jsm.streams.add({ name: stream, subjects });
  }

  async addConsumer(stream: string, queueGroup: string) {
    const jsm = await this.client.jetstreamManager();
    await jsm.consumers.add(stream, {
      durable_name: queueGroup,
      ack_policy: AckPolicy.Explicit,
      ack_wait: this.ackWait,
      deliver_policy: DeliverPolicy.All,
      replay_policy: ReplayPolicy.Instant,
    });
  }
}

export const nats = new Nats();

export * from "./nats.listener";
export * from "./nats.publisher";

export * from "./auth";
export * from "./ticket";
export * from "./order";
