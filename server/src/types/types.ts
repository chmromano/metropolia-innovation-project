export enum ClientType {
  EmbeddedDevice = "embedded-device",
  MobileApp = "mobile-app",
}

interface BaseToken {
  userId: string;
}

export interface MobileAppToken extends BaseToken {
  type: "MobileAppToken";
}

export interface EmbeddedDeviceToken extends BaseToken {
  type: "EmbeddedDeviceToken";
  hardwareId: string;
}

export type Token = MobileAppToken | EmbeddedDeviceToken;
