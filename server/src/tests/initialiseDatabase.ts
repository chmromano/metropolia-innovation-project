/* eslint-disable */
// @ts-nocheck

import mongoose from "mongoose";

import Device from "../models/device";
import DeviceMeasurement from "../models/deviceMeasurement";
import Plant from "../models/plant";
import PlantMeasurement from "../models/plantMeasurement";
import User from "../models/user";

let usersCounter = 0;
let devicesCounter = 0;
let plantsCounter = 0;

const generateNameAndUniqueAuthUid = () => {
  const object = {
    id: `unique_user_id_${usersCounter}`,
    name: names[usersCounter],
  };

  usersCounter++;

  return object;
};

const generateUniqueDeviceName = () => {
  const name = `unique_hardware_id_${devicesCounter}`;

  devicesCounter++;

  return name;
};

const generateUniquePlantName = () => {
  const name = `unique_plant_id_${plantsCounter}`;

  plantsCounter++;

  return name;
};

const addUser = () => {
  const generatedNameAndUid = generateNameAndUniqueAuthUid();
  const mongoId = new mongoose.Types.ObjectId();

  users.push({
    _id: mongoId,
    authUid: generatedNameAndUid.id,
    displayName: generatedNameAndUid.name,
    devices: [],
  });

  return mongoId;
};

const addDeviceToUser = (mongoId: mongoose.Types.ObjectId) => {
  const hardwareMongoId = new mongoose.Types.ObjectId();
  const generatedName = generateUniqueDeviceName();

  devices.push({
    _id: hardwareMongoId,
    name: generatedName,
    hardwareId: generatedName,
    user: mongoId,
    plants: [],
  });

  const user = users.find((user) => user._id.equals(mongoId));
  if (user) {
    user.devices.push(hardwareMongoId);
  }

  return hardwareMongoId;
};

const addPlantToUserAndDevice = (
  userId: mongoose.Types.ObjectId,
  deviceId: mongoose.Types.ObjectId
) => {
  const plantMongoId = new mongoose.Types.ObjectId();
  const generatedName = generateUniquePlantName();

  plants.push({
    _id: plantMongoId,
    name: generatedName,
    device: deviceId,
    plantIndex: 0,
    wateringLevel: 0,
    user: userId,
  });

  const device = devices.find((device) => device._id.equals(deviceId));
  if (device) {
    device.plants.push(plantMongoId);
  }

  return plantMongoId;
};

const users = [];

const devices = [];

const plants = [];

const initializeData = () => {
  for (let i = 0; i < 10; i++) {
    const userId = addUser();

    for (let j = 0; j < 10; j++) {
      const deviceId = addDeviceToUser(userId);

      for (let k = 0; k < 1; k++) {
        addPlantToUserAndDevice(userId, deviceId);
      }
    }
  }
};

const emptyDatabase = async () => {
  const deletionPromises = [
    User.deleteMany(),
    Device.deleteMany(),
    Plant.deleteMany(),
    PlantMeasurement.deleteMany(),
    DeviceMeasurement.deleteMany(),
  ];

  await Promise.all(deletionPromises);
};

const initialiseDatabase = async () => {
  const emptyDb = emptyDatabase();

  initializeData();

  await emptyDb;

  const initPromises = [
    User.insertMany(users),
    Device.insertMany(devices),
    Plant.insertMany(plants),
  ];

  await Promise.all(initPromises);
};

export default initialiseDatabase;

const names = [
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Oliver",
  "Ava",
  "Elijah",
  "Charlotte",
  "William",
  "Sophia",
  "James",
  "Amelia",
  "Benjamin",
  "Isabella",
  "Lucas",
  "Mia",
  "Henry",
  "Evelyn",
  "Alexander",
  "Harper",
  "Mason",
  "Camila",
  "Michael",
  "Gianna",
  "Ethan",
  "Abigail",
  "Daniel",
  "Luna",
  "Jacob",
  "Ella",
  "Logan",
  "Elizabeth",
  "Jackson",
  "Sofia",
  "Levi",
  "Emily",
  "Sebastian",
  "Avery",
  "Mateo",
  "Mila",
  "Jack",
  "Scarlett",
  "Owen",
  "Eleanor",
  "Theodore",
  "Madison",
  "Aiden",
  "Layla",
  "Samuel",
  "Penelope",
  "Joseph",
  "Aria",
  "John",
  "Chloe",
  "David",
  "Grace",
  "Wyatt",
  "Ellie",
  "Matthew",
  "Nora",
  "Luke",
  "Hazel",
  "Asher",
  "Zoey",
  "Carter",
  "Riley",
  "Julian",
  "Victoria",
  "Grayson",
  "Lily",
  "Leo",
  "Aurora",
  "Jayden",
  "Violet",
  "Gabriel",
  "Nova",
  "Isaac",
  "Hannah",
  "Lincoln",
  "Emilia",
  "Anthony",
  "Zoe",
  "Hudson",
  "Stella",
  "Dylan",
  "Everly",
  "Ezra",
  "Isla",
  "Thomas",
  "Leah",
  "Charles",
  "Lillian",
  "Christopher",
  "Addison",
  "Jaxon",
  "Willow",
  "Maverick",
  "Lucy",
  "Josiah",
  "Paisley",
];
