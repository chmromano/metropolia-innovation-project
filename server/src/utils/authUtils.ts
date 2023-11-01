import http from "http";

import jwt from "jsonwebtoken";

import config from "./config";
import { ClientType, Token } from "../types/types";
import {
  isString,
  parseClientType,
  parseEmbeddedDeviceToken,
  parseMobileAppToken,
} from "../types/typeUtils";

const getAuthTokenFromHeader = (headers: http.IncomingHttpHeaders): string => {
  const auth = headers.authorization;

  if (auth && auth.startsWith("Bearer ")) {
    return auth.substring(7);
  }

  throw new Error("Missing or invalid authorization header");
};

const getClientTypeFromHeader = (
  headers: http.IncomingHttpHeaders
): ClientType => {
  const clientTypeHeader = headers["x-client-type"];

  return parseClientType(clientTypeHeader);
};

const getSecretKeyBasedOnClientType = (clientType: ClientType): string => {
  if (
    clientType === ClientType.EmbeddedDevice &&
    isString(config.EMBEDDED_DEVICE_JWT_SECRET)
  ) {
    return config.EMBEDDED_DEVICE_JWT_SECRET;
  }

  if (
    clientType === ClientType.MobileApp &&
    isString(config.MOBILE_APP_JWT_SECRET)
  ) {
    return config.MOBILE_APP_JWT_SECRET;
  }

  throw new Error("Missing or invalid JWT secret");
};

const decodeTokenBasedOnClientType = (
  token: string,
  clientType: ClientType
): Token => {
  const secretKey = getSecretKeyBasedOnClientType(clientType);
  const decodedToken = jwt.verify(token, secretKey);

  if (clientType === ClientType.MobileApp) {
    return parseMobileAppToken(decodedToken);
  }

  if (clientType === ClientType.EmbeddedDevice) {
    return parseEmbeddedDeviceToken(decodedToken);
  }

  throw new Error("Unable to decode token");
};

export default {
  getAuthTokenFromHeader,
  getClientTypeFromHeader,
  decodeTokenBasedOnClientType,
};
