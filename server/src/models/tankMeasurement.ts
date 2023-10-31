import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema(
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

const TankMeasurement = model("TankMeasurement", schema);

export default TankMeasurement;
