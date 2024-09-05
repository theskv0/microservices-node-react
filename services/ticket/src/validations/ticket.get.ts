import Joi from "joi";

const GetTicketSchema = Joi.object({
  page: Joi.number().integer().optional(),
  limit: Joi.number().integer().optional(),
  own: Joi.valid("0", "1").optional(),
  search: Joi.string().max(100).optional(),
});

export default GetTicketSchema;
