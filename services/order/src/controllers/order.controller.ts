import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { AccessDeniedException, nats, OrderStatus, ValidationException } from "@project3/common";
import Order, { IOrder } from "../models/order.model";
import Ticket from "../models/ticket.model";
import { OrderCreatedPublisher } from "../publishers/order-created.publisher";
import { OrderCancelledPublisher } from "../publishers/order-cancelled.publisher";

const OrderController = {
  create: async (req: Request, res: Response) => {
    const { ticket_id } = req.body;

    const ticket = await Ticket.findById(ticket_id);
    if (!ticket) throw new ValidationException({ ticket_id: "unable to find any ticket with this ticket_id" });

    const existingOrder = await Order.findOne({
      ticket: ticket_id,
      status: { $in: [OrderStatus.Created, OrderStatus.AwaitingPayment, OrderStatus.Complete] },
    });

    if (existingOrder) throw new ValidationException({ ticket_id: "ticket is already resrved" });

    const now = new Date();

    const order = new Order({
      ticket: ticket_id,
      user: req.auth_user_id,
      status: OrderStatus.Created,
      expiresAt: now.setMinutes(now.getMinutes() + 15),
    });
    await order.save();

    new OrderCreatedPublisher(nats.client).publish({
      id: order.id,
      user_id: order.user.toString(),
      ticket_id: order.ticket.toString(),
      expired_at: order.expiresAt.toISOString(),
    });

    return res.status(201).json({ order });
  },

  get: async (req: Request, res: Response) => {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);

    const skip = (page - 1) * limit;

    let payload: { [key: string]: any } = { user: req.auth_user_id };

    const total = await Order.find(payload).countDocuments();
    const records = await Order.find(payload)
      .sort({ createdAt: "asc" })
      .skip(skip)
      .limit(limit)
      .populate(["user", "ticket"]);

    return res.json({ page, limit, total, records });
  },

  find: async (req: Request, res: Response) => {
    const order_id = req.params.order_id;

    const order: HydratedDocument<IOrder> | null = await Order.findOne({
      _id: order_id,
    }).populate(["user", "ticket"]);

    if (!order) throw new ValidationException({ order_id: "unable to find any order with this order_id" });
    if (order.user.id.toString() !== req.auth_user_id) throw new AccessDeniedException();

    return res.json({ order });
  },

  cancel: async (req: Request, res: Response) => {
    const order_id = req.params.order_id;

    const order: HydratedDocument<IOrder> | null = await Order.findOne({
      _id: order_id,
    });

    if (!order) throw new ValidationException({ order_id: "unable to find any order with this order_id" });
    if (order.user.toString() !== req.auth_user_id) throw new AccessDeniedException();

    if (order.status === OrderStatus.Cancelled)
      throw new ValidationException({ order_id: "order is already cancelled" });

    order.status = OrderStatus.Cancelled;
    order.__v += 1;
    await order.save();

    new OrderCancelledPublisher(nats.client).publish({
      id: order.id,
      ticket_id: order.ticket.toString(),
      version: order.__v,
    });

    return res.json({ order });
  },
};

export default OrderController;
