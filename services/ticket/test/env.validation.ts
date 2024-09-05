import Joi from "joi";

process.env.JWT_SECRET = "test-jwt-secret";

const EnvSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
});

const validateEnv = () => {
  const errors: [string?] = [];
  const result = EnvSchema.validate({
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
