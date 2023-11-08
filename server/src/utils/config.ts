import { isNumber, isString } from "../types/typeUtils";

const PORT = Number(process.env.PORT);
if (!isNumber(PORT)) {
  throw new Error("Port configuration is invalid or not defined.");
}

const HOST = process.env.HOST || "localhost"; // Default to localhost if not set

const NODE_ENV = process.env.NODE_ENV || "development"; // Default to development if not set

const MONGODB_URI = (() => {
  let uri;
  switch (NODE_ENV) {
    case "test":
      uri = process.env.TEST_MONGODB_URI;
      break;
    case "production":
      uri = process.env.PROD_MONGODB_URI;
      break;
    case "development":
      uri = process.env.DEV_MONGODB_URI;
      break;
    default:
      throw new Error("No MongoDB URI configured for the current NODE_ENV.");
  }

  if (!isString(uri) || uri.trim() === "") {
    throw new Error(
      `The MongoDB URI for ${NODE_ENV} environment is not defined or is not a valid string.`
    );
  }

  return uri;
})();

const EMBEDDED_DEVICE_JWT_SECRET = process.env.EMBEDDED_DEVICE_JWT_SECRET;
if (
  !isString(EMBEDDED_DEVICE_JWT_SECRET) ||
  EMBEDDED_DEVICE_JWT_SECRET.trim() === ""
) {
  throw new Error(
    "EMBEDDED_DEVICE_JWT_SECRET is not defined or is not a valid string."
  );
}

const MOBILE_APP_JWT_SECRET = process.env.MOBILE_APP_JWT_SECRET;
if (!isString(MOBILE_APP_JWT_SECRET) || MOBILE_APP_JWT_SECRET.trim() === "") {
  throw new Error(
    "MOBILE_APP_JWT_SECRET is not defined or is not a valid string."
  );
}

export default {
  PORT,
  HOST,
  NODE_ENV,
  MONGODB_URI,
  EMBEDDED_DEVICE_JWT_SECRET,
  MOBILE_APP_JWT_SECRET,
};
