import jwt from "jsonwebtoken";

const hardware = {
  authUid: "unique_user_id_0",
  type: "EmbeddedDeviceToken",
  hardwareId: "unique_hardware_id_0",
};

const client = {
  authUid: "unique_user_id_0",
  type: "MobileAppToken",
};

console.log(
  "HARDWARE TOKEN:",
  jwt.sign(hardware, "embedded_device_jwt_secret")
);
console.log("CLIENT TOKEN:", jwt.sign(client, "mobile_app_jwt_secret"));
