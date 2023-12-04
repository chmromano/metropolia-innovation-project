import { WebSocket } from "ws";

import {
  CustomSocket,
  EmbeddedDeviceToken,
  MobileAppToken,
  Token,
} from "./types";
import { IDevice } from "../models/device";
import { IUser } from "../models/user";

export const isNumber = (number: unknown): number is number => {
  return typeof number === "number" && !isNaN(number) && isFinite(number);
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

export const parseString = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error(`Could not parse string: ${string}`);
  }

  return string;
};

const isEmbeddedDeviceToken = (
  param: unknown
): param is EmbeddedDeviceToken => {
  return (
    param !== null &&
    typeof param === "object" &&
    "type" in param &&
    "authUid" in param &&
    "hardwareId" in param &&
    param.type === "EmbeddedDeviceToken"
  );
};

const parseEmbeddedDeviceToken = (
  embeddedDeviceToken: unknown
): EmbeddedDeviceToken => {
  if (
    !isEmbeddedDeviceToken(embeddedDeviceToken) ||
    !isString(embeddedDeviceToken.authUid) ||
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
    "authUid" in param &&
    param.type === "MobileAppToken"
  );
};

const parseMobileAppToken = (mobileAppToken: unknown): MobileAppToken => {
  if (!isMobileAppToken(mobileAppToken) || !isString(mobileAppToken.authUid)) {
    throw new Error(
      `Incorrect or missing token for embedded device: ${JSON.stringify(
        mobileAppToken
      )}`
    );
  }

  return mobileAppToken;
};

export const parseToken = (token: unknown): Token => {
  if (isEmbeddedDeviceToken(token)) {
    return parseEmbeddedDeviceToken(token);
  }

  if (isMobileAppToken(token)) {
    return parseMobileAppToken(token);
  }

  throw new Error(`Could not parse token: ${JSON.stringify(token)}`);
};

const isCustomSocket = (param: WebSocket): param is CustomSocket => {
  return (
    param !== null &&
    typeof param === "object" &&
    "currentUser" in param &&
    typeof param.currentUser === "object" &&
    "currentDevice" in param &&
    typeof param.currentDevice === "object"
  );
};

export const parseCustomSocket = (socket: WebSocket): CustomSocket => {
  if (isCustomSocket(socket)) {
    return socket;
  }

  throw new Error(`Could not parse custom socket: ${JSON.stringify(socket)}`);
};

export const toCustomSocket = (
  socket: WebSocket,
  user: IUser,
  device: IDevice
): CustomSocket => {
  const customSocket = socket as CustomSocket;

  customSocket.currentUser = user;
  customSocket.currentDevice = device;

  return customSocket;
};
