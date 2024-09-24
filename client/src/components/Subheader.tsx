import { FormEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdAdd, IoIosSave } from "react-icons/io";
import { FaRegFile, FaRegCheckCircle  } from "react-icons/fa";
import useWorkFlowStore from "../store/workflow.store";
import { layoutStyle } from "../utils/styles";
import { getUID } from "../utils";
import { workflowAPI } from "../shared/services/api/workflow";



const Subheader = () => {
  const { workflowTitle, updatedAt, instance, nodes, setNodes, setWorkflowTitle } = useWorkFlowStore((state) => state);
  const [count, setCount] = useState(1); 
  const params = useParams();


  const onSave = useCallback(async () => {
    // if(params.id!){

    // }
    if (instance) {
      const flow = instance.toObject();
      const workflowObj = {
        ...flow,
        title: workflowTitle
      };
      const res = await workflowAPI.create(workflowObj);
      if (res.status === 201) {
        toast.success("Saved successfully");
      }
    }
    // handleModal();
  }, [instance, workflowTitle]);

  const handleTitle = useCallback((e: FormEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;
    setWorkflowTitle(target.innerText); 
  }, [workflowTitle]);

  const onAdd = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
    const newNode = {
      id: `node-${getUID()}`,
      data: { label: `Node ${count}` },
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
      style: {
        backgroundColor: layoutStyle.bgColor,
        padding: layoutStyle.padding,
      },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  }, [setNodes, count]);

  useEffect(() => {
    if (nodes.length === 0) {
      setCount(1);
    }
  }, [!nodes.length]);

  return (
    <div className="px-5 py-2 w-full">
      <div className="flex justify-between flex-col sm:flex-row">
        <div className="mr-4">
          <div className="flex items-center font-semibold">
            <FaRegFile className='me-1 w-5 h-5'/>
            <span className="p-1 hover:border-2 border-gray-500 rounded" contentEditable suppressContentEditableWarning onBlur={handleTitle}>{workflowTitle}</span>
          </div>
          <p className="flex items-center text-sm">
            <FaRegCheckCircle className='me-1 w-4 h-4 text-green-500'/>
            last updated on: {updatedAt} 
          </p>
        </div>
        <div className="">
          <div className="flex items-center gap-4">
            <button
              title="save workflow button"
              className="flex items-center text-gray-100 bg-teal-700 shadow cursor-pointer py-1 px-2 mt-1 rounded"
              onClick={onAdd}
            >
              <IoMdAdd className="me-1" />
              Node
            </button>
            <button
              onClick={onSave}
              title="save workflow button"
              className="flex items-center text-gray-100 bg-gray-700 shadow cursor-pointer py-1 px-2 mt-1 rounded"
            >
              <IoIosSave className="me-1" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
