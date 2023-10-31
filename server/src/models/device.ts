import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema({
  hardwareId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plant",
    },
  ],
});

schema.plugin(uniqueValidator);

const Device = model("Device", schema);

export default Device;
