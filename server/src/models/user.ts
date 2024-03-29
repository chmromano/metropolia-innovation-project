import { Document, Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  authUid: string;
  displayName: string;
  devices: Schema.Types.ObjectId[];
}

const schema = new Schema<IUser>({
  authUid: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
  ],
});

schema.plugin(uniqueValidator);

const User = model<IUser>("User", schema);

export default User;
