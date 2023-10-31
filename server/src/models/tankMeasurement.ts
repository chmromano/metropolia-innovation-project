import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface ITankMeasurement extends Document {
  tankLevel: number;
  timestamp: Date;
  metadata: Schema.Types.ObjectId;
}

const schema = new Schema<ITankMeasurement>(
  {
    tankLevel: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    metadata: {
      type: Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
  },
  {
    timeseries: {
      timeField: "timestamp",
      granularity: "minutes",
      metaField: "metadata",
    },
  }
);

schema.plugin(uniqueValidator);

const TankMeasurement = model<ITankMeasurement>("TankMeasurement", schema);

export default TankMeasurement;
