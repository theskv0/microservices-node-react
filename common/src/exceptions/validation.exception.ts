import { HttpException } from "./http.exception";

export type ValidationError = {
  [key: string]: string;
};

export class ValidationException extends HttpException {
  constructor(public errors: ValidationError) {
    super(422, "unprocessable entity", errors);
  }
}
