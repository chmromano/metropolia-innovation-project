import jwt from "jsonwebtoken";

import { createNewUser, findExistingUser } from "./addUser.helpers";
import { MobileAppToken } from "../../types/types";
import config from "../../utils/config";
import { validateUserId } from "../utils/validationUtils";

interface Args {
  userId: unknown;
}

export const addUser = async (_root: unknown, args: Args) => {
  const userId = validateUserId(args.userId);

  const user =
    (await findExistingUser(userId)) || (await createNewUser(userId));

  const token: MobileAppToken = {
    type: "MobileAppToken",
    authUid: user.authUid,
  };

  return { value: jwt.sign(token, config.MOBILE_APP_JWT_SECRET) };
};
