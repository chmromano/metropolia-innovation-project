import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { WateringLevel } from "../types/types";

export interface IPlant extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  device: Schema.Types.ObjectId;
  plantIndex: number;
  wateringLevel: WateringLevel;
  user: Schema.Types.ObjectId;
}

const schema = new Schema<IPlant>({
  name: {
    type: String,
    required: true,
    default: "",
  },
  device: {
    type: Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  plantIndex: {
    type: Number,
    required: true,
  },
  wateringLevel: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

schema.plugin(uniqueValidator);

const Plant = model<IPlant>("Plant", schema);

export default Plant;
