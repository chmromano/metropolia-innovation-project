import { Token } from "./types";

export const isNumber = (number: unknown): number is number => {
  return typeof number === "number" && !isNaN(number) && isFinite(number);
};

export const stringToInt = (string: string): number => {
  if (!/^\d+$/.test(string)) {
    throw new Error("The string contains non-numeric characters");
  }

  const int = parseInt(string);
  if (!isNumber(int)) {
    throw new Error("Invalid number");
  }

  return int;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

export const parseString = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error(`Could not parse string: ${string}`);
  }

  return string;
};

export const toDeviceToken = (object: unknown): Token => {
  console.log(JSON.stringify(object, null, 2));
  if (
    object &&
    typeof object === "object" &&
    "data" in object &&
    object.data &&
    typeof object.data === "object" &&
    "addDevice" in object.data &&
    object.data.addDevice &&
    typeof object.data.addDevice === "object" &&
    "value" in object.data.addDevice &&
    object.data.addDevice.value
  ) {
    const token: Token = {
      value: parseString(object.data.addDevice.value),
    };

    return token;
  }

  throw new Error("Incorrect device token: some fields are missing");
};

export const toUserToken = (object: unknown): Token => {
  if (
    object &&
    typeof object === "object" &&
    "data" in object &&
    object.data &&
    typeof object.data === "object" &&
    "addUser" in object.data &&
    object.data.addUser &&
    typeof object.data.addUser === "object" &&
    "value" in object.data.addUser &&
    object.data.addUser.value
  ) {
    const token: Token = {
      value: parseString(object.data.addUser.value),
    };

    return token;
  }

  throw new Error("Incorrect user token: some fields are missing");
};
