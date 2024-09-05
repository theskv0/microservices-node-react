import Joi from "joi";

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(64).required(),
});

export default LoginSchema;
