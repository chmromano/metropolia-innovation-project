import http from "http";

import jwt from "jsonwebtoken";

import config from "./config";
import { Token } from "../types/types";
import { parseToken } from "../types/typeUtils";

const getAuthTokenFromHeader = (headers: http.IncomingHttpHeaders) => {
  const auth = headers.authorization;

  if (auth && auth.startsWith("Bearer ")) {
    return auth.substring(7);
  }

  return null;
};

const decodeHardwareToken = (token: string): Token => {
  const secretKey = config.EMBEDDED_DEVICE_JWT_SECRET;
  const decodedToken = jwt.verify(token, secretKey);

  return parseToken(decodedToken);
};

const decodeMobileAppToken = (token: string): Token => {
  const secretKey = config.MOBILE_APP_JWT_SECRET;
  const decodedToken = jwt.verify(token, secretKey);

  return parseToken(decodedToken);
};

export default {
  getAuthTokenFromHeader,
  decodeHardwareToken,
  decodeMobileAppToken,
};
