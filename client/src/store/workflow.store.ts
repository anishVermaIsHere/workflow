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
    ReactFlowInstance,
    Viewport
} from '@xyflow/react';
import { CustomNodeType } from '../nodes/types';
import { getUID } from '../utils';
import { WorkflowType } from '../shared/types';


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
  workflowList: WorkflowType[],
  workflowTitle: string;
  workflowId: string;
  nodes: AppNode[];
  edges: Edge[];
  viewport: Viewport;
  createdAt: string;
  updatedAt: string;
  workflow: WorkflowType;
  menu: MenuType;
  type: CustomNodeType;
  instance: ReactFlowInstance | null;
  setWorkflow: (workflow: WorkflowType)=>void;
  setWorkflowList: (workflows: WorkflowType[])=>void;
  setWorkflowTitle: (workflowTitle: string)=>void;
  setWorkflowId: (workflowId: string)=>void;
  setViewport: (viewport: Viewport )=>void;
  setCreatedAt:(date: string)=>void;
  setUpdatedAt:(date: string)=>void;
  setInstance: (instance: ReactFlowInstance) => void;
  setType: (nodeType: CustomNodeType)=>void;
  setMenu: (menu: MenuType)=>void;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[] | ((prevNodes: AppNode[]) => AppNode[])) => void; 
  setEdges: (edges: Edge[]) => void;
  createNew: ()=>void;
};



const useWorkFlowStore = create<AppState>((set, get) => ({
    workflowList: [],
    workflowId: '',
    workflowTitle: `Untitled_${getUID()}`,
    nodes: [],
    edges: [],
    viewport: {
      x:507.4011627906977,
      y: 183.75,
      zoom: 0.8546511627906976
    } as Viewport,
    updatedAt: '',
    createdAt: '',
    workflow: {} as WorkflowType,
    type: '' as CustomNodeType,
    menu: null,
    instance: null,
    setWorkflow: (workflow: WorkflowType)=>set({ workflow }),
    setWorkflowList: (workflows: WorkflowType[])=>set({ workflowList: workflows }),
    setWorkflowTitle: (workflowTitle: string)=>set({ workflowTitle }),
    setWorkflowId: (workflowId)=>set({ workflowId }),
    setViewport: (viewport: Viewport )=>set({ viewport }),
    setCreatedAt: (date: string)=>set({ createdAt: date }),
    setUpdatedAt: (date: string)=>set({ updatedAt: date }),
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
    createNew: ()=>{}
    
  }));
  
  export default useWorkFlowStore;