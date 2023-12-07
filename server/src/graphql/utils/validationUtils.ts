import { GraphQLError } from "graphql";

import { IDevice } from "../../models/device";
import { IUser } from "../../models/user";
import { isNumber, isString } from "../../types/typeUtils";

export const validateUserAuthentication = (user: IUser) => {
  if (!user) {
    throw new GraphQLError("User not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }

  return user;
};

export const validateDeviceAuthentication = (device: IDevice) => {
  if (!device) {
    throw new GraphQLError("Device not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }

  return device;
};

export const validateHardwareId = (hardwareId: unknown): string => {
  if (!isString(hardwareId)) {
    throw new GraphQLError("Invalid hardware ID", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: hardwareId,
      },
    });
  }

  return hardwareId;
};

export const validateSupportedPlants = (supportedPlants: unknown): number => {
  if (!isNumber(supportedPlants)) {
    throw new GraphQLError("Supported plants must be a number", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: supportedPlants,
      },
    });
  }

  if (supportedPlants < 1 || supportedPlants > 4) {
    throw new GraphQLError(
      "Number of supported plants must be between 1 and 4",
      {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: supportedPlants,
        },
      }
    );
  }

  return supportedPlants;
};

export const validateTemperature = (temperature: unknown): number => {
  if (!isNumber(temperature)) {
    throw new GraphQLError("Temperature must be a number", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: temperature,
      },
    });
  }

  return temperature;
};

export const validateTankLevel = (tankLevel: unknown): number => {
  if (!isNumber(tankLevel)) {
    throw new GraphQLError("Tank level must be a number", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: tankLevel,
      },
    });
  }

  return tankLevel;
};

export const validateSoilMoisture = (soilMoisture: unknown): number => {
  if (!isNumber(soilMoisture)) {
    throw new GraphQLError("Soil moisture must be a number", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: soilMoisture,
      },
    });
  }

  return soilMoisture;
};

export const validatePlantIndex = (plantIndex: unknown): number => {
  if (!isNumber(plantIndex)) {
    throw new GraphQLError("Plant index must be a number", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: plantIndex,
      },
    });
  }

  return plantIndex;
};

export const validateWateringLevel = (wateringLevel: unknown): number => {
  if (!isNumber(wateringLevel)) {
    throw new GraphQLError("Watering level must be a number", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: wateringLevel,
      },
    });
  }

  if (wateringLevel < 0 || wateringLevel > 100) {
    throw new GraphQLError("Watering level must be between 0 and 100", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: wateringLevel,
      },
    });
  }

  return wateringLevel;
};

export const validatePlantId = (plantId: unknown): string => {
  if (!isString(plantId)) {
    throw new GraphQLError("Invalid plant ID", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: plantId,
      },
    });
  }

  return plantId;
};

export const validatePlantName = (plantName: unknown): string => {
  if (!isString(plantName)) {
    throw new GraphQLError("Invalid plant name", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: plantName,
      },
    });
  }

  if (plantName.trim() === "") {
    throw new GraphQLError("Plant name cannot be empty", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: plantName,
      },
    });
  }

  return plantName;
};

export const validateUserId = (id: unknown): string => {
  if (!isString(id)) {
    throw new GraphQLError("Invalid user ID", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: id,
      },
    });
  }

  if (id.trim() === "") {
    throw new GraphQLError("User ID cannot be empty", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: id,
      },
    });
  }

  return id;
};

export const validateDeviceId = (id: unknown): string => {
  if (!isString(id)) {
    throw new GraphQLError("Invalid device ID", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: id,
      },
    });
  }

  if (id.trim() === "") {
    throw new GraphQLError("Device ID cannot be empty", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: id,
      },
    });
  }

  return id;
};
