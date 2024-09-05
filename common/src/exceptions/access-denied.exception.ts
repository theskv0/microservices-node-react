import { HttpException } from "./http.exception";

export class AccessDeniedException extends HttpException {
  constructor(public message: string = "access denied") {
    super(403, message);
  }
}
