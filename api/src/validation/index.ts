import { object, string, number, record, union, TypeOf, boolean } from "zod";

const nodeSchema = object({
    id:  string({ required_error: "Node id is required" }),
    label:  string({ required_error: "Node label is required" }),
    type: string({ required_error: "Node type is required" }),
    style: record(union([string(), number()]).optional())
});

const edgeSchema = object({
    source: string({ required_error: "Edge source is required "}),
    target: string({ required_error: "Edge source is required" }),
    animated: boolean({ required_error: "isActive is required", invalid_type_error: "isActive must be a boolean" })
});

const workflowSchema = {
    body: object({
        workFlowId: string({ required_error: "workflowId is required" }),
        title: string({ required_error: "Title is required" }),
        nodes: nodeSchema,
        edges: edgeSchema,
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


type WFGetById = TypeOf<typeof workflowGetByIdSchema>
type WFCreateSchema = TypeOf<typeof workflowCreateSchema>;



export type {
    WFGetById,
    WFCreateSchema
}
