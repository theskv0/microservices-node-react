import { Router } from "express";
import { GlobalHandler, ValidationMiddleware } from "@project3/common";
import CreateTicketSchema from "../validations/ticket.create";
import TicketController from "../controllers/ticket.controller";
import UpdateTicketSchema from "../validations/ticket.update";
import GetTicketSchema from "../validations/ticket.get";
import ValidTicketIdSchema from "../validations/ticket.id";

const routes = Router();

routes.post("/", ValidationMiddleware(CreateTicketSchema), GlobalHandler(TicketController.create));
routes.put("/:ticket_id", ValidationMiddleware(UpdateTicketSchema), GlobalHandler(TicketController.update));
routes.get("/", ValidationMiddleware(GetTicketSchema), GlobalHandler(TicketController.get));
routes.get("/:ticket_id", ValidationMiddleware(ValidTicketIdSchema), GlobalHandler(TicketController.find));
routes.delete("/:ticket_id", ValidationMiddleware(ValidTicketIdSchema), GlobalHandler(TicketController.delete));

export default routes;
