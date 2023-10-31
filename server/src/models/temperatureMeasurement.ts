import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface ITemperatureMeasurement extends Document {
  temperature: number;
  timestamp: Date;
  metadata: Schema.Types.ObjectId;
}

const schema = new Schema<ITemperatureMeasurement>(
  {
    temperature: {
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

const TemperatureMeasurement = model<ITemperatureMeasurement>(
  "TemperatureMeasurement",
  schema
);

export default TemperatureMeasurement;
