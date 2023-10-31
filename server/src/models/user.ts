import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IUser extends Document {
  displayName: string;
  devices: Schema.Types.ObjectId[];
}

const schema = new Schema<IUser>({
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
