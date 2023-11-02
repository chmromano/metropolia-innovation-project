import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IPlantMeasurement extends Document {
  soilMoisture: number;
  timestamp: Date;
  metadata: Schema.Types.ObjectId;
}

const schema = new Schema<IPlantMeasurement>(
  {
    soilMoisture: {
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

const PlantMeasurement = model<IPlantMeasurement>("PlantMeasurement", schema);

export default PlantMeasurement;
