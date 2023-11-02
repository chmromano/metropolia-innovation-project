import jwt from "jsonwebtoken";

const json = {
  firebaseUid: "test_firebase_uid",
  type: "EmbeddedDeviceToken",
  hardwareId: "test_hardware_id",
};

console.log(jwt.sign(json, "embedded_device_jwt_secret"));

/*

Must be a POST http request

required headers:
Authorization
value: Bearer TOKEN_HERE

x-client-type
value: either embedded-device or mobile-app

Content-Type
value: application/json

for this request set header as embedded-device

for token set value as eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJlYmFzZVVpZCI6InRlc3RfZmlyZWJhc2VfdWlkIiwidHlwZSI6IkVtYmVkZGVkRGV2aWNlVG9rZW4iLCJoYXJkd2FyZUlkIjoidGVzdF9oYXJkd2FyZV9pZCIsImlhdCI6MTY5ODg1MDM4MH0.H9yVXcfhHaouNxtVkzBd0uwnSkMFqSjaafDI7DrjUfk

Request body:
{
  "query": "mutation AddDeviceMeasurement($temperature: Float!, $tankLevel: Float!) {
  addDeviceMeasurement(temperature: $temperature, tankLevel: $tankLevel) {
    timestamp
    temperature
    tankLevel
    metadata {
      hardwareId
    }
  }
}",
  "variables": { "temperature": 25, "tankLevel": 20 }
}

The variables field contains the parameters of the query (which is a float). In this case the query will send values 25 and 20.
*/
