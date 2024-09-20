import { useCallback, useRef, DragEvent, MouseEvent } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeTypes } from "../nodes";
import { edgeTypes } from "../edges";
import useWorkFlowStore, { AppNode } from "../store/workflow.store";
import NodeContextMenu from "./NodeContextMenu";
import { getUID } from "../utils";


const WorkFlow = () => {
  const reactFlowRef=useRef<HTMLDivElement | null>(null);
  const { nodes, edges, menu, setMenu, type, setNodes, setInstance, onNodesChange, onEdgesChange, onConnect } = useWorkFlowStore(state=>state);
  const { screenToFlowPosition } = useReactFlow();


  const onNodeContextMenu= useCallback(
    (event: MouseEvent, node: AppNode) => {
      event.preventDefault();
      if(reactFlowRef.current){
        const pane = reactFlowRef.current.getBoundingClientRect();
        const top = event.clientY < pane.height - 200 ? event.clientY : undefined;
        const left = event.clientX < pane.width - 200 ? event.clientX : undefined;
        const right = event.clientX >= pane.width - 200 ? pane.width - event.clientX : undefined;
        const bottom = event.clientY >= pane.height - 200 ? pane.height - event.clientY : undefined;

        setMenu({
          id: node.id,
          label: node.data.label as string,
          top,
          left,
          right,
          bottom,
        });
      }

    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const label=event.dataTransfer.getData('label');
      // check if the dropped element is valid
      if (!label) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
       const newNode = {
        id: `node-${getUID()}`,
        data: { label },
        type,
        position,
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
      
    },
    [screenToFlowPosition, type],
  );

  return (    
    // <div className="reactflow-wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        ref={reactFlowRef}
        onNodeContextMenu={onNodeContextMenu}
        style={{ maxWidth: "1586px", margin: "auto" }}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onPaneClick={onPaneClick}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setInstance}
        fitView
        fitViewOptions={{ padding: 1 }}
      >
        <Background />
        {/* <MiniMap /> */}
        <Controls />
        {menu && <NodeContextMenu onClick={onPaneClick} {...menu} />}
        {/* <Sidebar /> */}

      </ReactFlow>
    // </div>
  );
};

export default WorkFlow;
