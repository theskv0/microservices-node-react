import Joi, { LanguageMessages } from "joi";
import { Types } from "mongoose";

const ValidTicketIdSchema = Joi.object({
  ticket_id: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (Types.ObjectId.isValid(value)) return value;
      else return helpers.message("ticket_id is not valid" as unknown as LanguageMessages);
    }),
});

export default ValidTicketIdSchema;
