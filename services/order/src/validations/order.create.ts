import Joi from "joi";

const CreateOrderSchema = Joi.object({
  ticket_id: Joi.string().required(),
});

export default CreateOrderSchema;
