
import { DragEvent, ComponentType } from 'react';
import { nodeStyle } from '../nodes';
import useWorkFlowStore from '../store/workflow.store';
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import useCommonStore from '../store/common.store';




const workFlowNodeStyle=`px-2 py-1 my-2 text-center rounded`;

const startEndNodeStyle={
    backgroundColor: nodeStyle.darkBgColor,
    color: '#fff'
};

const Sidebar = () => {
  const { setType } = useWorkFlowStore(state=>state);
  const { sidebarToggle, setSidebarToggle }=useCommonStore(state=>state);

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: ComponentType, label: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData("label", label);

  };

  const handleSidebar=()=>{
    setSidebarToggle(!sidebarToggle);
  };

  return (
    <aside className={`mt-10 bg-white border-r rounded-md shadow-lg transition-all duration-300 w-[300px] fixed z-[999] ${ sidebarToggle ? `left-0`:`left-[-300px]`}`}>
      <div className='relative flex items-center justify-between cursor-pointer'>
        <h5 className="p-2 font-semibold bg-gray-700 text-white w-full">Workflow builder app</h5>
        <div onClick={handleSidebar} className='bg-gray-700 text-white rounded-r-full p-1 absolute right-[-40px]'>
        {sidebarToggle ? <IoArrowBackCircle className='w-8 h-8' /> : <IoArrowForwardCircle className='w-8 h-8'/>}
        </div>
      </div>
      <h5 className="py-5">Workflow Nodes</h5>
      <div className="flex flex-col px-4">
        <div className={workFlowNodeStyle} style={startEndNodeStyle} onDragStart={(event) => onDragStart(event, 'input', 'Start')} draggable>
            Start
        </div>
        <div className={workFlowNodeStyle} style={{ background: nodeStyle.bgColor }} onDragStart={(event) => onDragStart(event, 'default', "Filter Data")} draggable>
            Filter Data
        </div>
        <div className={workFlowNodeStyle} style={{ background: nodeStyle.bgColor }} onDragStart={(event) => onDragStart(event, 'default')} draggable>
            Wait
        </div>
        <div className={workFlowNodeStyle} style={{ background: nodeStyle.bgColor }} onDragStart={(event) => onDragStart(event, 'default')} draggable>
            Convert Format
        </div>
        <div className={workFlowNodeStyle} style={{ background: nodeStyle.bgColor }} onDragStart={(event) => onDragStart(event, 'default')} draggable>
            Send POST Request
        </div>
        <div className={workFlowNodeStyle} style={startEndNodeStyle} onDragStart={(event) => onDragStart(event, 'output')} draggable>
            End
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;