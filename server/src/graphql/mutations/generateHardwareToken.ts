import jwt from "jsonwebtoken";

import { IUser } from "../../models/user";
import { EmbeddedDeviceToken } from "../../types/types";
import config from "../../utils/config";
import {
  validateHardwareId,
  validateUserAuthentication,
} from "../utils/validationUtils";

interface Context {
  currentUser: IUser;
}

interface Args {
  hardwareId: unknown;
}

export const generateHardwareToken = (
  _root: unknown,
  args: Args,
  context: Context
) => {
  const user = validateUserAuthentication(context.currentUser);
  const hardwareId = validateHardwareId(args.hardwareId);

  const token: EmbeddedDeviceToken = {
    type: "EmbeddedDeviceToken",
    authUid: user.authUid,
    hardwareId,
  };

  const signedToken = {
    value: jwt.sign(token, config.EMBEDDED_DEVICE_JWT_SECRET),
  };

  return signedToken;
};
