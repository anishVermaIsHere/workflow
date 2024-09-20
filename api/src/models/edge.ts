"use strict";
import { Schema, SchemaTypes, model } from "mongoose";

const edgeSchema = new Schema(
  {
    id: { type: String, required: true },
    source: { type: String, required: true },
    target: { type: String, required: true },
    animated: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
);

const EdgeModel = model("Edges", edgeSchema);

export default EdgeModel;