import { AuthSubjects } from "..";

export interface UserCreatedEvent {
  subject: AuthSubjects.AuthUserCreated;
  data: {
    id: string;
    name: string;
  };
}
