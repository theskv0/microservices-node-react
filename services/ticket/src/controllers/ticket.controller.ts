import { Request, Response } from "express";
import Ticket, { ITicket } from "../models/ticket.model";
import { HydratedDocument } from "mongoose";
import { AccessDeniedException, nats, ValidationException } from "@project3/common";
import { TicketCreatedPublisher } from "../publishers/ticket-created.publisher";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated.publisher";

const TicketController = {
  create: async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = new Ticket({ title, price, user: req.auth_user_id });
    await ticket.save();

    new TicketCreatedPublisher(nats.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
    });

    return res.status(201).json({ ticket });
  },

  update: async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const { ticket_id } = req.params;

    const ticket: HydratedDocument<ITicket> | null = await Ticket.findOne({
      _id: ticket_id,
    });

    if (!ticket) throw new ValidationException({ ticket_id: "unable to find any ticket with this ticket_id" });
    if (ticket.user.toString() !== req.auth_user_id) throw new AccessDeniedException();

    ticket.title = title ?? ticket.title;
    ticket.price = price ?? ticket.price;
    await ticket.save();

    new TicketUpdatedPublisher(nats.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
    });

    return res.json({ ticket });
  },

  get: async (req: Request, res: Response) => {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 10);
    const own = +(req.query.own || 0);
    const search = req.query.search?.toString();

    const skip = (page - 1) * limit;

    let payload: { [key: string]: any } = {};
    if (own) payload.user_id = req.auth_user_id;
    if (search) payload.title = new RegExp(search, "i");

    const total = await Ticket.find(payload).countDocuments();
    const records = await Ticket.find(payload).sort({ createdAt: "asc" }).skip(skip).limit(limit).populate("user");

    return res.json({ page, limit, total, records });
  },

  find: async (req: Request, res: Response) => {
    const ticket_id = req.params.ticket_id;

    const ticket: HydratedDocument<ITicket> | null = await Ticket.findOne({
      _id: ticket_id,
    }).populate("user");

    if (!ticket) throw new ValidationException({ ticket_id: "unable to find any ticket with this ticket_id" });

    return res.json({ ticket });
  },

  delete: async (req: Request, res: Response) => {
    const ticket_id = req.params.ticket_id;

    const ticket: HydratedDocument<ITicket> | null = await Ticket.findOne({
      _id: ticket_id,
    });

    if (!ticket) throw new ValidationException({ ticket_id: "unable to find any ticket with this ticket_id" });
    if (ticket.user.toString() !== req.auth_user_id) throw new AccessDeniedException();

    await ticket.deleteOne();

    return res.json({});
  },
};

export default TicketController;
