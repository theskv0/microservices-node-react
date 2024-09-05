import { UserUpdatedEvent } from "@project3/common";
import { userCreatedHandler } from "./user-created.handler";
import User from "../../../models/user.model";

export const userUpdatedHandler = async (data: UserUpdatedEvent["data"]): Promise<boolean> => {
  const user = await User.findById(data.id);
  if (user) {
    user.name = data.name;
    await user.save();
    return true;
  }
  return await userCreatedHandler(data);
};
