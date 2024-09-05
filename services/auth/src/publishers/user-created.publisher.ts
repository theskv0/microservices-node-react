import { auth, NatsPublisher, UserCreatedEvent } from "@project3/common";

export class UserCreatedPublisher extends NatsPublisher<UserCreatedEvent> {
  subject: UserCreatedEvent["subject"] = auth.subjects.AuthUserCreated;
}
