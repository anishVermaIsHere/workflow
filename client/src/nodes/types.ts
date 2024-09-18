import type { Node, BuiltInNode } from '@xyflow/react';

type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
type AppNode = BuiltInNode | PositionLoggerNode;
type CustomNodeType = 'input' | 'default' | 'output' | 'group';



export type {
    PositionLoggerNode,
    AppNode,
    CustomNodeType
}

