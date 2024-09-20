import { Node, Edge, Viewport } from "@xyflow/react";


interface WorkflowType {
    workflowId: string;
    title: string;
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
}

export type { 
    WorkflowType
}