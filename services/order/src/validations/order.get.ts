import Joi from "joi";

const GetOrderSchema = Joi.object({
  page: Joi.number().integer().optional(),
  limit: Joi.number().integer().optional(),
});

export default GetOrderSchema;
