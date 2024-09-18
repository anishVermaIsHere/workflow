import { model, Schema, SchemaTypes } from "mongoose";

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

const edgeSchema = new Schema(
    {
      source: { type: SchemaTypes.ObjectId, required: true },
      target: { type: SchemaTypes.ObjectId, required: true },
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
        viewport: viewportSchema,
        user: { type: SchemaTypes.ObjectId, ref: "Users" }
    },
    {
        timestamps: true
    }
); 

const WorkFlowModel = model('Workflows', workflowSchema);

export default WorkFlowModel;