import { Node, Edge, Viewport } from "@xyflow/react";


interface CreateWorkflowType {
    title: string;
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
}
interface WorkflowType extends CreateWorkflowType {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

interface WorkflowUploadDataType {
    rows: string[];
    columns: string[];
    workflowId: string;
    socketId?: string;
}


export type { 
    WorkflowType,
    CreateWorkflowType,
    WorkflowUploadDataType
}