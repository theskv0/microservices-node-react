import { UserCreatedEvent } from "@project3/common";
import User from "../../../models/user.model";

export const userCreatedHandler = async (data: UserCreatedEvent["data"]): Promise<boolean> => {
  const user = new User({ _id: data.id, name: data.name });
  await user.save();
  return true;
};
