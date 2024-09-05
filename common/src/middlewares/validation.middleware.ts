import { NextFunction, Request, Response } from "express";
import { Schema, ValidationResult } from "joi";
import { ValidationException, ValidationError } from "../exceptions/validation.exception";

export const ValidationMiddleware = function (schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors: ValidationError = {};
    const result: ValidationResult = schema.validate(
      { ...req.params, ...req.query, ...req.body },
      {
        abortEarly: false,
        allowUnknown: true,
      }
    );
    result.error?.details.forEach((error) => {
      if (error.context?.key) errors[error.context.key] = error.message.replace(/\"/g, "");
    });
    if (Object.keys(errors).length) return next(new ValidationException(errors));
    next();
  };
};
