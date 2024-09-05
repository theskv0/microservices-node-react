import Joi, { LanguageMessages } from "joi";
import { Types } from "mongoose";
import { OrderStatus } from "../models/order.model";

const UpdateOrderSchema = Joi.object({
  order_id: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (Types.ObjectId.isValid(value)) return value;
      else return helpers.message("order_id is not valid" as unknown as LanguageMessages);
    }),
  status: Joi.string().valid(Object.values(OrderStatus)),
});

export default UpdateOrderSchema;
