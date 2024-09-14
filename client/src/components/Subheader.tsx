import { useCallback, useEffect, useState } from "react";
import useWorkFlowStore from "../store/workflow.store";
import { nodeStyle } from "../nodes";
import { getUID } from "../utils/uidgenerator";


type SubheaderProps={
    workFlowId: string
}

const Subheader = ({ workFlowId }: SubheaderProps) => {
  const { nodes, setNodes } = useWorkFlowStore((state) => state);
  const [count, setCount]=useState(1);

  const onAdd = useCallback(() =>{
    setCount(prevCount=>prevCount+1);
    const newNode = {
      id: `node-${getUID()}`,
      data: { label: `Node ${count}` },
      position: {
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400
      },
      style: {
          backgroundColor: nodeStyle.bgColor,
          padding: nodeStyle.padding
      }
    };
    setNodes(prevNodes => [...prevNodes, newNode]);
    
  }, [setNodes, count]);

  useEffect(()=>{
    if(nodes.length===0){
      setCount(1);
    } 
    
  }, [!nodes.length]);

  return (
    <div className="px-5 w-full">
    <div className="flex justify-between flex-col md:flex-row">
    <div className="mr-4"> Workflow id: <strong>{workFlowId} </strong> </div>
        <div className="flex items-center gap-4">
        <button
          title="save workflow button"
          className="text-gray-100 bg-teal-700 shadow cursor-pointer py-1 px-2 mt-1 rounded"
          onClick={onAdd}
        >
          Add node
        </button>
          <button
            title="save workflow button"
            className="text-gray-100 bg-gray-700 shadow cursor-pointer py-1 px-2 mt-1 rounded"
          >
            Save 
          </button>
        </div>
    </div>
  </div>
  )
}

export default Subheader