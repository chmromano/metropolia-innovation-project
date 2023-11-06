import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IDeviceMeasurement extends Document {
  temperature: number;
  tankLevel: number;
  timestamp: Date;
  metadata: Schema.Types.ObjectId;
}

const schema = new Schema<IDeviceMeasurement>(
  {
    temperature: {
      type: Number,
      required: true,
    },
    tankLevel: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
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

const DeviceMeasurement = model<IDeviceMeasurement>(
  "DeviceMeasurement",
  schema
);

export default DeviceMeasurement;
