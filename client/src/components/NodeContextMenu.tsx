import { HTMLAttributes, useCallback } from 'react';
import { useReactFlow, type XYPosition, Node } from '@xyflow/react';
import "@xyflow/react/dist/style.css";
import "../index.css";
import { MenuType } from '../store/workflow.store';
import { IoCopyOutline, IoTrashOutline } from "react-icons/io5";


export default function NodeContextMenu(menu: MenuType & HTMLAttributes<HTMLDivElement> ) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const { id, top, bottom, right, left, label } =menu;
  
  const duplicateNode = useCallback(() => {
    const node = getNode(id) as Node;
    const position: XYPosition = {
      x: node && node.position.x + 50,
      y: node && node.position.y + 50
    };

    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node?.id}-copy`,
      position,
    });
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div style={{ top, left, right, bottom }} className="context-menu" {...menu}>
      <p><strong>Node: {label}</strong></p>
      <div className='p-1'>
        <button onClick={duplicateNode} className='flex justify-between items-center'>
          Copy
          <IoCopyOutline className='w-5 h-5'/>
        </button>
        <button onClick={deleteNode} className='flex justify-between items-center'>
          Delete
          <IoTrashOutline className='w-5 h-5'/>
        </button>
      </div>

    </div>
  );
}

