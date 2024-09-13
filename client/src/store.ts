import { create } from 'zustand';
import { 
    addEdge, 
    applyNodeChanges, 
    applyEdgeChanges,
    Edge,
    Node,
    OnNodesChange,
    OnEdgesChange,
    OnConnect
} from '@xyflow/react';
import { initialEdges } from "./edges";
import { initialNodes } from "./nodes";


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
  nodes: AppNode[];
  edges: Edge[];
  menu: MenuType;
  type: null;
  setType: (nodeType: any)=>void;
  setMenu: (menu: MenuType)=>void;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[] | ((prevNodes: AppNode[]) => AppNode[])) => void; 
  setEdges: (edges: Edge[]) => void;
};

const useWorkFlowStore = create<AppState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    type: null,
    setType: (nodeType)=>set({ type: nodeType }),
    menu: null,
    setMenu:(prop)=>set({ menu: prop}),
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
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