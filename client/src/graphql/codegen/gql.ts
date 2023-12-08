/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  mutation addDevice($hardwareId: String!, $supportedPlants: Int!) {\n    addDevice(hardwareId: $hardwareId, supportedPlants: $supportedPlants) {\n      id\n    }\n  }\n":
    types.AddDeviceDocument,
  "\n  mutation generateHardwareToken($hardwareId: String!) {\n    generateHardwareToken(hardwareId: $hardwareId) {\n      value\n    }\n  }\n":
    types.GenerateHardwareTokenDocument,
  "\n  mutation addUser($userId: String!) {\n    addUser(userId: $userId) {\n      value\n    }\n  }\n":
    types.AddUserDocument,
  "\n  mutation waterPlant($hardwareId: String!, $plantIndex: Int!) {\n    waterPlant(hardwareId: $hardwareId, plantIndex: $plantIndex)\n  }\n":
    types.WaterPlantDocument,
  "\n  mutation editPlant(\n    $plantId: String!\n    $plantName: String\n    $wateringLevel: Float\n  ) {\n    editPlant(\n      plantId: $plantId\n      plantName: $plantName\n      wateringLevel: $wateringLevel\n    ) {\n      id\n    }\n  }\n":
    types.EditPlantDocument,
  "\n  query getDevicesWithLastMeasurement {\n    getDevicesWithLastMeasurement {\n      device {\n        id\n        name\n        hardwareId\n      }\n      lastMeasurement {\n        temperature\n        tankLevel\n      }\n    }\n  }\n":
    types.GetDevicesWithLastMeasurementDocument,
  "\n  query getPlantsWithLastMeasurement {\n    getPlantsWithLastMeasurement {\n      plant {\n        id\n        name\n        plantIndex\n        wateringLevel\n        device {\n          hardwareId\n        }\n      }\n      lastMeasurement {\n        soilMoisture\n      }\n    }\n  }\n":
    types.GetPlantsWithLastMeasurementDocument,
  "\n  query getPlantMeasurements($plantId: String!) {\n    getPlantMeasurements(plantId: $plantId) {\n      timestamp\n      soilMoisture\n    }\n  }\n":
    types.GetPlantMeasurementsDocument,
  "\n  query getDeviceMeasurements($deviceId: String!) {\n    getDeviceMeasurements(deviceId: $deviceId) {\n      timestamp\n      temperature\n      tankLevel\n    }\n  }\n":
    types.GetDeviceMeasurementsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation addDevice($hardwareId: String!, $supportedPlants: Int!) {\n    addDevice(hardwareId: $hardwareId, supportedPlants: $supportedPlants) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation addDevice($hardwareId: String!, $supportedPlants: Int!) {\n    addDevice(hardwareId: $hardwareId, supportedPlants: $supportedPlants) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation generateHardwareToken($hardwareId: String!) {\n    generateHardwareToken(hardwareId: $hardwareId) {\n      value\n    }\n  }\n"
): (typeof documents)["\n  mutation generateHardwareToken($hardwareId: String!) {\n    generateHardwareToken(hardwareId: $hardwareId) {\n      value\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation addUser($userId: String!) {\n    addUser(userId: $userId) {\n      value\n    }\n  }\n"
): (typeof documents)["\n  mutation addUser($userId: String!) {\n    addUser(userId: $userId) {\n      value\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation waterPlant($hardwareId: String!, $plantIndex: Int!) {\n    waterPlant(hardwareId: $hardwareId, plantIndex: $plantIndex)\n  }\n"
): (typeof documents)["\n  mutation waterPlant($hardwareId: String!, $plantIndex: Int!) {\n    waterPlant(hardwareId: $hardwareId, plantIndex: $plantIndex)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation editPlant(\n    $plantId: String!\n    $plantName: String\n    $wateringLevel: Float\n  ) {\n    editPlant(\n      plantId: $plantId\n      plantName: $plantName\n      wateringLevel: $wateringLevel\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation editPlant(\n    $plantId: String!\n    $plantName: String\n    $wateringLevel: Float\n  ) {\n    editPlant(\n      plantId: $plantId\n      plantName: $plantName\n      wateringLevel: $wateringLevel\n    ) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query getDevicesWithLastMeasurement {\n    getDevicesWithLastMeasurement {\n      device {\n        id\n        name\n        hardwareId\n      }\n      lastMeasurement {\n        temperature\n        tankLevel\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getDevicesWithLastMeasurement {\n    getDevicesWithLastMeasurement {\n      device {\n        id\n        name\n        hardwareId\n      }\n      lastMeasurement {\n        temperature\n        tankLevel\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query getPlantsWithLastMeasurement {\n    getPlantsWithLastMeasurement {\n      plant {\n        id\n        name\n        plantIndex\n        wateringLevel\n        device {\n          hardwareId\n        }\n      }\n      lastMeasurement {\n        soilMoisture\n      }\n    }\n  }\n"
): (typeof documents)["\n  query getPlantsWithLastMeasurement {\n    getPlantsWithLastMeasurement {\n      plant {\n        id\n        name\n        plantIndex\n        wateringLevel\n        device {\n          hardwareId\n        }\n      }\n      lastMeasurement {\n        soilMoisture\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query getPlantMeasurements($plantId: String!) {\n    getPlantMeasurements(plantId: $plantId) {\n      timestamp\n      soilMoisture\n    }\n  }\n"
): (typeof documents)["\n  query getPlantMeasurements($plantId: String!) {\n    getPlantMeasurements(plantId: $plantId) {\n      timestamp\n      soilMoisture\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query getDeviceMeasurements($deviceId: String!) {\n    getDeviceMeasurements(deviceId: $deviceId) {\n      timestamp\n      temperature\n      tankLevel\n    }\n  }\n"
): (typeof documents)["\n  query getDeviceMeasurements($deviceId: String!) {\n    getDeviceMeasurements(deviceId: $deviceId) {\n      timestamp\n      temperature\n      tankLevel\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
