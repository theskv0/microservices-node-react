import Joi from "joi";

const SignupSchema = Joi.object({
  name: Joi.string().min(3).max(64).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

export default SignupSchema;
