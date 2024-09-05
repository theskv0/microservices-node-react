import { Router } from "express";
import { GlobalHandler, ValidationMiddleware } from "@project3/common";
import ValidOrderIdSchema from "../validations/order.id";
import GetOrderSchema from "../validations/order.get";
import OrderController from "../controllers/order.controller";
import CreateOrderSchema from "../validations/order.create";
import UpdateOrderSchema from "../validations/order.update";

const routes = Router();

routes.post("/", ValidationMiddleware(CreateOrderSchema), GlobalHandler(OrderController.create));
routes.get("/", ValidationMiddleware(GetOrderSchema), GlobalHandler(OrderController.get));
routes.get("/:order_id", ValidationMiddleware(ValidOrderIdSchema), GlobalHandler(OrderController.find));

export default routes;
