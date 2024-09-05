export enum AuthSubjects {
  AuthUserCreated = "auth.user-created",
  AuthUserUpdated = "auth.user-updated",
}

export const auth = {
  streamName: "auth",
  subjects: AuthSubjects,
};

export * from "./events/user-created.event";
export * from "./events/user-updated.event";
