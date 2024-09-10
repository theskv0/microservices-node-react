export enum OrderSubjects {
  OrderCreated = "order.created",
  OrderCancelled = "order.cancelled",
}

export const order = {
  streamName: "order",
  subjects: OrderSubjects,
};

export * from "./events/order-created.event";
export * from "./events/order-calcelled.event";
