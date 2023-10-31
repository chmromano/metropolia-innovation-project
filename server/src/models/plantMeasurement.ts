import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema(
  {
    humidity: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    metadata: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
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

const PlantMeasurement = model("PlantMeasurement", schema);

export default PlantMeasurement;
