import { Schema, SchemaTypes, model } from "mongoose";

const edgeSchema = new Schema(
  {
    source: { type: SchemaTypes.ObjectId, required: true },
    target: { type: SchemaTypes.ObjectId, required: true },
    animated: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
);

const EdgeModel = model("Edges", edgeSchema);

export default EdgeModel;