import { AuthSubjects } from "..";

export interface UserUpdatedEvent {
  subject: AuthSubjects.AuthUserUpdated;
  data: {
    id: string;
    name: string;
  };
}
