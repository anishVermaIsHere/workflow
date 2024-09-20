"use strict";
import { model, Schema, SchemaTypes } from "mongoose";

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


const dataSchema =  new Schema(
    {
        label: { type: String, required: [true, "Node has must be a label or title"] },
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

const edgeSchema = new Schema(
    {
      id: { type: String, required: true }, 
      source: { type: String, required: true },
      target: { type: String, required: true },
      animated: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    }
);

const viewportSchema = new Schema(
    {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        zoom: { type: Number, required: true }
    }
);

const workflowSchema =  new Schema(
    {
        workflowId: { type: String, required: true },
        title: { type: String, required: true },
        nodes: [ { type: nodeSchema } ],
        edges: [ { type: edgeSchema } ],
        viewport: { type: viewportSchema, required: true },
        user: { type: SchemaTypes.ObjectId, ref: "Users" }
    },
    {
        timestamps: true
    }
); 

const WorkFlowModel = model('Workflows', workflowSchema);

export default WorkFlowModel;