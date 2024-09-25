
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaRegFile } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from '@tanstack/react-query';
import useCommonStore from '../../store/common.store';
import WorkList from "./WorkList";
import Node from './Node';
import { workflowAPI } from "../../shared/services/api/workflow";
import { CreateWorkflowType } from "../../shared/types";
import { getUID } from "../../utils";
import useWorkFlowStore from "../../store/workflow.store";


const Sidebar = () => {
  const navigate=useNavigate();
  const { sidebarToggle, setSidebarToggle }=useCommonStore(state=>state);
  const { setWorkflowTitle } = useWorkFlowStore(state=>state);
  const queryClient=useQueryClient();
  const createMutation = useMutation({
    mutationFn: async()=>{
      const res = await workflowAPI.create({
        title: `Untitled-${getUID()}`
      } as CreateWorkflowType);
  
      if(res.status === 201) {
        setWorkflowTitle(res.data.title);
        navigate(`/user/workflow/${res.data._id}`);
      }
    },
    onSuccess: () => {
    },
    onSettled:async(_,error)=>{
      if(error){
        //
      }
      else { 
        queryClient.invalidateQueries({ queryKey: ['workflows'] }); 
      }
    }
  });


  const handleSidebar=()=>{
    setSidebarToggle(!sidebarToggle);
  };

  const createNewWorkflow=async()=>{
    createMutation.mutate();
  }

  return (
    <>
    <aside className={`bg-white border-r rounded-md shadow-lg transition-all duration-300 min-w-[250px] h-screen ${sidebarToggle ? `md:static`: `fixed bottom-0`} top-0 z-[999] ${sidebarToggle ? `left-0`:`left-[-250px]`}`}>
      <div className='relative flex items-center justify-between cursor-pointer'>
        <h5 className="p-2 font-semibold bg-gray-700 text-white w-full">Workflow</h5>
        <div onClick={handleSidebar} className={`flex items-center bg-gray-700 text-white rounded-r-full transition-all duration-300  p-1 absolute z-[9999] left-[248px] cursor-pointer`}>
        {sidebarToggle ? <IoArrowBackCircle className='w-8 h-8'/> : <IoArrowForwardCircle className='w-8 h-8'/>}
      </div>
      </div>

      <div className="bg-white h-[calc(100vh-40px)] overflow-auto">
        <div className={`relative px-2 ${sidebarToggle ? `block`: `hidden`}`}>
          <div className=''>
            <button onClick={createNewWorkflow} className='flex items-center justify-center px-2 py-1 my-2 text-center rounded bg-teal-700 text-white w-full'>
              <IoMdAdd className='me-1'/> New
            </button>
          </div>
          <NavLink to="/user/workflow/upload" className='flex items-center justify-center px-2 py-1 my-2 text-center rounded bg-gray-700 text-white w-full'>
              <FaArrowsRotate className='me-1'/> Run worklow
          </NavLink>
            <NavLink to="/user/workflow" className='flex items-center justify-center px-2 py-1 my-2 text-center rounded bg-gray-700 text-white w-full'>
              <FaRegFile className='me-1'/> All docs
            </NavLink>
          <hr className='mt-4'/>

          <div className="">
            <WorkList />
            <hr className='mt-4'/>
            <div className=''>
              <p className="py-2 font-semibold">Nodes</p>
              <div className="">
                <Node type='input' label='Start'/>
                <Node type='default' label='Filter Data'/>
                <Node type='default' label='Wait'/>
                <Node type='default' label='Convert Format'/>
                <Node type='default' label='Send POST Request'/>
                <Node type='output' label='End'/>
              </div>
            </div>
          </div>
          
        </div>
      </div>      
    </aside>
    </>
  );
};

export default Sidebar;