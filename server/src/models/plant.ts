import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IPlant extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  device: Schema.Types.ObjectId;
  plantIndex: number;
}

const schema = new Schema<IPlant>({
  name: {
    type: String,
    required: true,
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
});

schema.plugin(uniqueValidator);

const Plant = model<IPlant>("Plant", schema);

export default Plant;
