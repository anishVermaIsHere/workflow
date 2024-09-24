import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header'
import Sidebar from '../components/sidebar/Sidebar'
import useWorkFlowStore from '../store/workflow.store';
import { workflowAPI } from '../shared/services/api/workflow';
import { FaRegFile } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { WorkflowType } from '../shared/types';
import { formatDistanceToNow } from 'date-fns';



const WorkflowCard=({ wf }:{ wf: WorkflowType })=>{
  return <NavLink to={`/user/workflow/${wf._id}`} className="w-full md:max-w-[300px] p-4 bg-white border border-gray-200 hover:bg-gray-200 cursor-pointer rounded-lg shadow">
    <FaRegFile className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />
    <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-700 truncate">{wf.title}</h5>
    <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Last updated on: {formatDistanceToNow(wf.updatedAt)}
    </p>
    <button className="inline-flex font-medium items-center px-2 py-1 text-red-500 hover:bg-red-200 hover:text-red-600 rounded">
        <IoTrashOutline className='w-5 h-5 me-2'/>
        Delete
    </button>
</NavLink>
}

const WorkflowListPage = () => {
  const { isSuccess,  data } = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => await workflowAPI.fetch(),
  });
  const { workflowList, setWorkflowList } = useWorkFlowStore(state=>state);

  useEffect(()=>{
    const workflows = data?.data || [];
    setWorkflowList(workflows);

  }, [isSuccess]);

  return (
    <div className="flex">
      <Sidebar />
        <div className="bg-teal-50 w-full h-screen">
          <Header />
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 py-4 px-2 gap-4'>
            <div className="w-full h-[200px] md:max-w-[300px] grid place-items-center p-6 bg-white border border-gray-200 hover:bg-gray-200 rounded-lg shadow cursor-pointer">
              <button title="create new workflow" className="inline-flex font-medium items-center text-gray-600">
                <IoMdAdd className="w-12 h-12 mb-3" />
              </button>
            </div>
            {workflowList.length ? workflowList.map((workflow: WorkflowType) => (<WorkflowCard key={workflow._id} wf={workflow} />)) : ''}
          </div>
        </div>        
    </div>
  )
};

export default WorkflowListPage;