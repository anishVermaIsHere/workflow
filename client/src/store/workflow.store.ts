import { create } from 'zustand';
import { 
    addEdge, 
    applyNodeChanges, 
    applyEdgeChanges,
    Edge,
    Node,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    ReactFlowInstance
} from '@xyflow/react';
import { initialEdges } from "../edges";
import { initialNodes } from "../nodes";
import { CustomNodeType } from '../nodes/types';
import { getUID } from '../utils/uidgenerator';

export type MenuType={
  id: string,
  label: string,
  top: string | number | undefined,
  left: string | number | undefined,
  right: string | number | undefined,
  bottom: string | number | undefined,
} | null;

export type AppNode = Node;
export type AppState = {
  workflowId: string;
  nodes: AppNode[];
  edges: Edge[];
  menu: MenuType;
  type: CustomNodeType;
  instance: ReactFlowInstance | null;
  setWorkflowId: (workflowId: string)=>void;
  setInstance: (instance: ReactFlowInstance) => void;
  setType: (nodeType: CustomNodeType)=>void;
  setMenu: (menu: MenuType)=>void;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[] | ((prevNodes: AppNode[]) => AppNode[])) => void; 
  setEdges: (edges: Edge[]) => void;
};

const useWorkFlowStore = create<AppState>((set, get) => ({
    workflowId: getUID(),
    nodes: initialNodes,
    edges: initialEdges,
    type: '' as CustomNodeType,
    menu: null,
    instance: null,
    setWorkflowId: (workflowId)=>set({ workflowId }),
    setInstance: (instance)=>set({ instance }),
    setType: (nodeType)=>set({ type: nodeType }),
    setMenu:(prop)=>set({ menu: prop}), 
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes)
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },
    setNodes: (slug) => {
      set((state) => ({
        nodes: typeof slug === 'function' ? slug(state.nodes) : slug,
      }));
    },
    setEdges: (edges) => {
      set({ edges });
    },
  }));
  
  export default useWorkFlowStore;