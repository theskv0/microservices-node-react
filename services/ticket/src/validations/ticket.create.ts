import Joi from "joi";

const CreateTicketSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
});

export default CreateTicketSchema;
