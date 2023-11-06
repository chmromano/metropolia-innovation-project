export enum ClientType {
  EmbeddedDevice = "embedded-device",
  MobileApp = "mobile-app",
}

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

export enum WateringLevel {
  Never = 0,
  Dry = 1,
  Moist = 2,
  Wet = 3,
}
