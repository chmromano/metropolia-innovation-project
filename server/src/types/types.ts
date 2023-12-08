import { WebSocket } from "ws";

import { IDevice } from "../models/device";
import { IUser } from "../models/user";

interface BaseToken {
  authUid: string;
}

export interface MobileAppToken extends BaseToken {
  type: "MobileAppToken";
}

export interface EmbeddedDeviceToken extends BaseToken {
  type: "EmbeddedDeviceToken";
  hardwareId: string;
}

export type Token = MobileAppToken | EmbeddedDeviceToken;

export interface CustomSocket extends WebSocket {
  currentUser: IUser;
  currentDevice: IDevice;
}
