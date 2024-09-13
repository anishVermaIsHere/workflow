import { useCallback } from 'react';
import { useReactFlow, type XYPosition, Node } from '@xyflow/react';
import "@xyflow/react/dist/style.css";
import "../index.css";
import { MenuType } from '../store';


export default function NodeContextMenu(menu: MenuType) {
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
      <p className='m-2'><strong>Node: {label}</strong></p>
      <button onClick={duplicateNode}>Copy</button>
      <button onClick={deleteNode}>Delete</button>
    </div>
  );
}
