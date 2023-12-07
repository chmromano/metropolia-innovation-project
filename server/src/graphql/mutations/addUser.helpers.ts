import User from "../../models/user";

export const findExistingUser = async (id: string) => {
  const user = await User.findOne({
    authUid: id,
  }).exec();

  return user;
};

export const createNewUser = async (id: string) => {
  const user = new User({
    authUid: id,
    displayName: "Plantonaut",
  });

  await user.save();

  return user;
};
