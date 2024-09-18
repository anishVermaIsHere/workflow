import { Schema, model }  from "mongoose";


const positionSchema = new Schema(
    {
        x: { type: Number, required: [true, "Please add x-axis value "] },
        y: { type: Number, required: [true, "Please add y-axis value "] }
    }
);

const nodeSchema = new Schema(
    {
        label: { type: String, required: [true, "Please add node label"] },
        position: { type: positionSchema, required: true },
        style: { type: Map, of: String },
        type: { type: String }
    }
);

const NodeModel = model("Nodes", nodeSchema); 

export default NodeModel;