import { UserUpdatedEvent } from "@project3/common";
import User from "../../../models/user.model";

export const userUpdatedHandler = async (data: UserUpdatedEvent["data"]): Promise<boolean> => {
  const user = await User.findById(data.id);
  if (user && user.__v === data.version - 1) {
    user.name = data.name;
    user.__v = data.version;
    await user.save();
    return true;
  }
  return false;
};
