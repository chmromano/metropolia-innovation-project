import { ClientType, EmbeddedDeviceToken, MobileAppToken } from "./types";

export const isNumber = (number: unknown): number is number => {
  return typeof number === "number" && !isNaN(number) && isFinite(number);
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const isClientType = (param: string): param is ClientType => {
  return Object.values(ClientType)
    .map((v) => v.toString())
    .includes(param);
};

export const parseClientType = (clientType: unknown): ClientType => {
  if (!isString(clientType) || !isClientType(clientType)) {
    throw new Error(`Incorrect or missing client type: ${clientType}`);
  }

  return clientType;
};

const isEmbeddedDeviceToken = (
  param: unknown
): param is EmbeddedDeviceToken => {
  return (
    param !== null &&
    typeof param === "object" &&
    "type" in param &&
    "firebaseUid" in param &&
    "hardwareId" in param &&
    param.type === "EmbeddedDeviceToken"
  );
};

export const parseEmbeddedDeviceToken = (
  embeddedDeviceToken: unknown
): EmbeddedDeviceToken => {
  if (
    !isEmbeddedDeviceToken(embeddedDeviceToken) ||
    !isString(embeddedDeviceToken.firebaseUid) ||
    !isString(embeddedDeviceToken.hardwareId)
  ) {
    throw new Error(
      `Incorrect or missing token for embedded device: ${JSON.stringify(
        embeddedDeviceToken
      )}`
    );
  }

  return embeddedDeviceToken;
};

const isMobileAppToken = (param: unknown): param is MobileAppToken => {
  return (
    param !== null &&
    typeof param === "object" &&
    "type" in param &&
    "firebaseUid" in param &&
    param.type === "MobileAppToken"
  );
};

export const parseMobileAppToken = (
  mobileAppToken: unknown
): MobileAppToken => {
  if (
    !isMobileAppToken(mobileAppToken) ||
    !isString(mobileAppToken.firebaseUid)
  ) {
    throw new Error(
      `Incorrect or missing token for embedded device: ${JSON.stringify(
        mobileAppToken
      )}`
    );
  }

  return mobileAppToken;
};
