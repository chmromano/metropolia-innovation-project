import { Document, Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IDevice extends Document {
  _id: Schema.Types.ObjectId;
  hardwareId: string;
  user: Schema.Types.ObjectId;
  plants: Schema.Types.ObjectId[];
}

const schema = new Schema<IDevice>({
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

const Device = model<IDevice>("Device", schema);

export default Device;
