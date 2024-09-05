import Joi from "joi";

const UpdateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(64).required(),
});

export default UpdateProfileSchema;
