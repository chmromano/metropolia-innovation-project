import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema({
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

const Plant = model("Plant", schema);

export default Plant;
