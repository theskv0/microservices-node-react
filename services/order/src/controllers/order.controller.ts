import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { AccessDeniedException, ValidationException } from "@project3/common";
import Order, { IOrder, OrderStatus } from "../models/order.model";

const OrderController = {
  create: async (req: Request, res: Response) => {
    const { ticket_id } = req.body;

    const order = new Order({
      ticket: ticket_id,
      user: req.auth_user_id,
      status: OrderStatus.Pending,
      expiresAt: null,
    });
    await order.save();

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
    });

    if (!order) throw new ValidationException({ order_id: "unable to find any order with this order_id" });
    if (order.user.toString() !== req.auth_user_id) throw new AccessDeniedException();

    await order.populate(["user", "ticket"]);

    return res.json({ order });
  },
};

export default OrderController;
