import jwt from "jsonwebtoken";

const json = {
  firebaseUid: "test_firebase_uid",
  type: "EmbeddedDeviceToken",
  hardwareId: "test_hardware_id",
};

console.log(jwt.sign(json, "embedded_device_jwt_secret"));
