import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
  constructor() {
    super(404, "invalid endpoint");
  }
}
