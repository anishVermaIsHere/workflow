"use strict";
import { object, string, number, record, union, TypeOf, boolean, array } from "zod";

const nodeSchema = object({
    id:  string({ required_error: "Node id is required" }),
    data: object({
        label:  string({ required_error: "Node label is required" }),
    }),
    type: string({ required_error: "Node type is required" }).optional(),
    style: record(union([string(), number()])).optional(),
    measured: object({ 
        width: number(),
        height: number()
    }).optional(),
    dragging: boolean().optional(),
    selected: boolean().optional(),
}).array().optional();

const edgeSchema = object({
    id:  string({ required_error: "Edge id is required" }),
    source: string({ required_error: "Edge source is required "}),
    target: string({ required_error: "Edge source is required" }),
    animated: boolean({ required_error: "isActive is required", invalid_type_error: "isActive must be a boolean" }).default(false)
}).array().optional();

const viewportSchema = object({
    x: number({ required_error: "X axis value is required" }),
    y: number({ required_error: "Y axis value is required" }),
    zoom: number({ required_error: "zoom value is required" })
}).optional();

const workflowSchema = {
    body: object({
        title: string({ required_error: "Title is required" }),
        nodes: nodeSchema,
        edges: edgeSchema,
        viewport: viewportSchema,
        user: string({ required_error: "Userid is required" })
    })
};

const paramSchema= object({
    params: object({ 
        id: string({ required_error: "Param id is required" })
    })
});

const workflowCreateSchema=object({
    ...workflowSchema
});

const workflowUpdateSchema = object({
    body: object({
        title: string({ required_error: "Title is required" }),
        nodes: nodeSchema,
        edges: edgeSchema,
        viewport: viewportSchema,
        createdAt: string({ required_error: "Created at time is required" }),
        updatedAt: string({ required_error: "Updated at time is required" }),
        user: string({ required_error: "Userid is required" })
    }),
    params: paramSchema.shape['params']

});

const loginUserSchema = object({
    body:object({
      email: string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
      password: string({ required_error: "Password is required" })
        .min(8, { message: "Password must be atleast 8 characters" })
    })
});


const workflowCSVData = object({
    body:object({
        columns: string({ required_error: "Columns is required" }),
        rows: string({ required_error: "Rows is required" }),
        workfowId: string({ required_error: "Workflow ID is required" }),
    })
});







type WFUpdateType = {
    params: TypeOf<typeof paramSchema>["params"];
    body: TypeOf<typeof workflowUpdateSchema>["body"];
};

type WFCreateType = TypeOf<typeof workflowCreateSchema>;
type WFGetByIdType = TypeOf <typeof paramSchema>;
type LoginUserType = TypeOf<typeof loginUserSchema>;
type WFCSVDataType = TypeOf <typeof workflowCSVData>;


export type {
    WFCreateType,
    WFUpdateType,
    WFGetByIdType,
    LoginUserType,
    WFCSVDataType
}

export {
    workflowCreateSchema,
    workflowUpdateSchema
}
