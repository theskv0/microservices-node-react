import Joi, { LanguageMessages } from "joi";
import { Types } from "mongoose";

const ValidOrderIdSchema = Joi.object({
  order_id: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (Types.ObjectId.isValid(value)) return value;
      else return helpers.message("order_id is not valid" as unknown as LanguageMessages);
    }),
});

export default ValidOrderIdSchema;
