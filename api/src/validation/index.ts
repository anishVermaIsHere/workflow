"use strict";
import { object, string, number, record, union, TypeOf, boolean, array } from "zod";

const nodeSchema = object({
    id:  string({ required_error: "Node id is required" }),
    data: object({
        label:  string({ required_error: "Node label is required" }),
    }),
    type: string({ required_error: "Node type is required" }).optional(),
    style: record(union([string(), number()]).optional()),
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
    animated: boolean({ required_error: "isActive is required", invalid_type_error: "isActive must be a boolean" })
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

const workflowGetByIdSchema=object({
    params: object({ 
        id: string({ required_error: "Param id is required" })
    })
});

const workflowCreateSchema=object({
    ...workflowSchema
});

const loginUserSchema = object({
    body:object({
      email: string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),
      password: string({ required_error: "Password is required" })
        .min(8, { message: "Password must be atleast 8 characters" })
    })
});


  
type WFGetById = TypeOf<typeof workflowGetByIdSchema>
type WFCreateType = TypeOf<typeof workflowCreateSchema>;
type LoginUserType = TypeOf<typeof loginUserSchema>;


export type {
    WFGetById,
    WFCreateType,
    LoginUserType,
}

export {
    workflowCreateSchema
}
