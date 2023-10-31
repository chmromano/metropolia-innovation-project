import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IPlant extends Document {
  name: string;
  device: Schema.Types.ObjectId;
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
});

schema.plugin(uniqueValidator);

const Plant = model<IPlant>("Plant", schema);

export default Plant;
