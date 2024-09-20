"use strict";
import { Schema, model }  from "mongoose";


const dataSchema =  new Schema(
    {
        label: { type: String, required: [true, "Node has must be a label or title"] },
    }
);

const positionSchema = new Schema(
    {
        x: { type: Number, required: [true, "Please add x-axis value "] },
        y: { type: Number, required: [true, "Please add y-axis value "] }
    }
);

const measuredSchema =  new Schema(
    {
        width: { type: Number },
        height: { type: Number }
    }
);

const nodeSchema = new Schema(
    {
        id: { type: String, required: [true, "Node has must be a unique id"] },
        data: { type: dataSchema },
        position: { type: positionSchema, required: true },
        style: { type: Map, of: String },
        type: { type: String },
        dragging: { type: Boolean, default: false },
        selected: { type: Boolean, default: true },
        measured: { type: measuredSchema }
    }
);

const NodeModel = model("Nodes", nodeSchema); 

export default NodeModel;