import { ValidationError } from "./validation.exception";

export class HttpException extends Error {
  constructor(public code: number, public message: string, public errors: ValidationError = {}) {
    super();
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}
