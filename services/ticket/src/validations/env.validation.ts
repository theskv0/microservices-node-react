import Joi from "joi";

const EnvSchema = Joi.object({
  PORT: Joi.number().min(1000).max(9999).required(),
  MONGODB_CONN: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});

const validateEnv = () => {
  const errors: [string?] = [];
  const result = EnvSchema.validate({
    PORT: process.env.PORT,
    MONGODB_CONN: process.env.MONGODB_CONN,
    JWT_SECRET: process.env.JWT_SECRET,
  });
  result.error?.details.forEach((error) => {
    if (error.context?.key) errors.push(error.message.replace(/\"/g, ""));
  });
  if (errors.length) {
    console.error(errors);
    throw new Error("env validation failed");
  }
};

export default validateEnv;
