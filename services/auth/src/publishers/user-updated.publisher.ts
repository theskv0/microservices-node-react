import { auth, NatsPublisher, UserUpdatedEvent } from "@project3/common";

export class UserUpdatedPublisher extends NatsPublisher<UserUpdatedEvent> {
  subject: UserUpdatedEvent["subject"] = auth.subjects.AuthUserUpdated;
}
