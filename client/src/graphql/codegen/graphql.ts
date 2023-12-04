/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Device = {
  __typename?: "Device";
  hardwareId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  plants: Array<Plant>;
  user: User;
};

export type DeviceMeasurement = {
  __typename?: "DeviceMeasurement";
  metadata: Device;
  tankLevel: Scalars["Float"]["output"];
  temperature: Scalars["Float"]["output"];
  timestamp: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  addDevice?: Maybe<Token>;
  addDeviceMeasurement?: Maybe<DeviceMeasurement>;
  addPlantMeasurement?: Maybe<PlantMeasurement>;
  addUser?: Maybe<Token>;
  editPlant: Plant;
  waterPlant: Scalars["Boolean"]["output"];
};

export type MutationAddDeviceArgs = {
  hardwareId: Scalars["String"]["input"];
  supportedPlants: Scalars["Int"]["input"];
};

export type MutationAddDeviceMeasurementArgs = {
  tankLevel: Scalars["Float"]["input"];
  temperature: Scalars["Float"]["input"];
};

export type MutationAddPlantMeasurementArgs = {
  plantIndex: Scalars["Int"]["input"];
  soilMoisture: Scalars["Int"]["input"];
};

export type MutationAddUserArgs = {
  userId: Scalars["String"]["input"];
};

export type MutationEditPlantArgs = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  plant: Scalars["String"]["input"];
  wateringLevel?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationWaterPlantArgs = {
  hardwareId: Scalars["String"]["input"];
  plantIndex: Scalars["Int"]["input"];
};

export type Plant = {
  __typename?: "Plant";
  device: Device;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  plantIndex: Scalars["Int"]["output"];
  user: User;
};

export type PlantMeasurement = {
  __typename?: "PlantMeasurement";
  metadata: Plant;
  soilMoisture: Scalars["Float"]["output"];
  timestamp: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  getDevices: Array<Device>;
  getPlants: Array<Plant>;
};

export type Token = {
  __typename?: "Token";
  value: Scalars["String"]["output"];
};

export type User = {
  __typename?: "User";
  authUid: Scalars["String"]["output"];
  devices: Array<Device>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type AddDeviceMutationVariables = Exact<{
  hardwareId: Scalars["String"]["input"];
  supportedPlants: Scalars["Int"]["input"];
}>;

export type AddDeviceMutation = {
  __typename?: "Mutation";
  addDevice?: { __typename?: "Token"; value: string } | null;
};

export type AddUserMutationVariables = Exact<{
  userId: Scalars["String"]["input"];
}>;

export type AddUserMutation = {
  __typename?: "Mutation";
  addUser?: { __typename?: "Token"; value: string } | null;
};

export type WaterPlantMutationVariables = Exact<{
  hardwareId: Scalars["String"]["input"];
  plantIndex: Scalars["Int"]["input"];
}>;

export type WaterPlantMutation = {
  __typename?: "Mutation";
  waterPlant: boolean;
};

export type GetDevicesQueryVariables = Exact<{ [key: string]: never }>;

export type GetDevicesQuery = {
  __typename?: "Query";
  getDevices: Array<{ __typename?: "Device"; id: string; name: string }>;
};

export type GetPlantsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPlantsQuery = {
  __typename?: "Query";
  getPlants: Array<{
    __typename?: "Plant";
    id: string;
    name: string;
    plantIndex: number;
  }>;
};

export const AddDeviceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "addDevice" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hardwareId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "supportedPlants" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addDevice" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "hardwareId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hardwareId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "supportedPlants" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "supportedPlants" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "value" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddDeviceMutation, AddDeviceMutationVariables>;
export const AddUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "addUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "value" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const WaterPlantDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "waterPlant" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "hardwareId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "plantIndex" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "waterPlant" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "hardwareId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "hardwareId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "plantIndex" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "plantIndex" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WaterPlantMutation, WaterPlantMutationVariables>;
export const GetDevicesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getDevices" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getDevices" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDevicesQuery, GetDevicesQueryVariables>;
export const GetPlantsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getPlants" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getPlants" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "plantIndex" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPlantsQuery, GetPlantsQueryVariables>;
