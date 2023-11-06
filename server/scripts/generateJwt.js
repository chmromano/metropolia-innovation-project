import jwt from "jsonwebtoken";

const json = {
  authUid: "test_auth_uid",
  type: "EmbeddedDeviceToken",
  hardwareId: "test_hardware_id",
};

console.log(jwt.sign(json, "embedded_device_jwt_secret"));
