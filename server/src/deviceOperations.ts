import { RawData } from "ws";

import { isString } from "./types/typeUtils";

interface AddDeviceDataOperation {
  type: "AddDeviceDataOperation";
  temperature: number;
  tankLevel: number;
}

interface AddPlantDataOperation {
  type: "AddPlantDataOperation";
  soilMoisture: number;
  plantIndex: number;
}

type Operation = AddDeviceDataOperation | AddPlantDataOperation;

const isAddPlantDataOperation = (
  param: unknown
): param is AddPlantDataOperation => {
  return (
    param !== null &&
    typeof param === "object" &&
    "type" in param &&
    param.type === "AddPlantDataOperation" &&
    "soilMoisture" in param &&
    typeof param.soilMoisture === "number" &&
    "plantIndex" in param &&
    typeof param.plantIndex === "number"
  );
};

const parseAddPlantDataOperation = (operation: unknown): Operation => {
  if (!isAddPlantDataOperation(operation)) {
    throw new Error(
      `Incorrect or missing operation: ${JSON.stringify(operation)}`
    );
  }

  return operation;
};

const isAddDeviceDataOperation = (
  param: unknown
): param is AddDeviceDataOperation => {
  return (
    param !== null &&
    typeof param === "object" &&
    "type" in param &&
    param.type === "AddDeviceDataOperation" &&
    "temperature" in param &&
    typeof param.temperature === "number" &&
    "tankLevel" in param &&
    typeof param.tankLevel === "number"
  );
};

const parseAddDeviceDataOperation = (operation: unknown): Operation => {
  if (!isAddDeviceDataOperation(operation)) {
    throw new Error(
      `Incorrect or missing operation: ${JSON.stringify(operation)}`
    );
  }

  return operation;
};

export const parseOperation = (operation: unknown): Operation => {
  if (isAddDeviceDataOperation(operation)) {
    return parseAddDeviceDataOperation(operation);
  }

  if (isAddPlantDataOperation(operation)) {
    return parseAddPlantDataOperation(operation);
  }

  throw new Error(`Could not parse operation: ${JSON.stringify(operation)}`);
};

export const webSocketRawDataToString = (message: RawData): string => {
  if (Buffer.isBuffer(message)) {
    return message.toString();
  }

  if (isString(message)) {
    return message;
  }

  if (message instanceof ArrayBuffer) {
    return Buffer.from(message).toString();
  }

  if (Array.isArray(message)) {
    return Buffer.concat(message).toString();
  }

  throw new Error("Invalid message type");
};

const addDeviceDataQuery =
  "mutation AddDeviceMeasurement($temperature: Float!, $tankLevel: Float!) { addDeviceMeasurement(temperature: $temperature, tankLevel: $tankLevel) { metadata { id } } }";

const addPlantDataQuery =
  "mutation AddPlantMeasurement($soilMoisture: Int!, $plantIndex: Int!) { addPlantMeasurement(soilMoisture: $soilMoisture, plantIndex: $plantIndex) { metadata { id } } }";

export const getGqlDataFromOperation = (operation: Operation) => {
  if (operation.type === "AddDeviceDataOperation") {
    return {
      query: addDeviceDataQuery,
      variables: {
        temperature: operation.temperature,
        tankLevel: operation.tankLevel,
      },
    };
  }

  if (operation.type === "AddPlantDataOperation") {
    return {
      query: addPlantDataQuery,
      variables: {
        soilMoisture: operation.soilMoisture,
        plantIndex: operation.plantIndex,
      },
    };
  }

  throw new Error("Invalid operation type");
};
