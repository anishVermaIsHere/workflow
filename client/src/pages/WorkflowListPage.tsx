import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient,} from '@tanstack/react-query';
import useWorkFlowStore from '../store/workflow.store';
import { workflowAPI } from '../shared/services/api/workflow';
import { IoMdAdd } from "react-icons/io";
import { CreateWorkflowType, WorkflowType } from '../shared/types';
import WorkflowCard from '../components/WorkflowCard';
import Layout from '../components/Layout';
import { getUID } from '../utils';
import { useNavigate } from 'react-router-dom';



const WorkflowListPage = () => {
  const navigate = useNavigate();
  const queryClient=useQueryClient();
  const { isSuccess, data } = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => await workflowAPI.fetch()
  });
  const { workflowList, setWorkflowList, setWorkflowTitle } = useWorkFlowStore(state=>state);

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



  useEffect(() => {
    if (isSuccess && data) {
      const workflows = data.data || []; 
      setWorkflowList(workflows);
    }
    
    return () => setWorkflowList([]); 
  }, [isSuccess, data]); 

  return (
    <Layout>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 py-4 px-2 gap-4'>
        <div className="w-full h-[200px] md:max-w-[300px] grid place-items-center p-6 bg-white border border-gray-200 hover:bg-gray-200 rounded-lg shadow cursor-pointer">
          <button onClick={()=>createMutation.mutate()} title="create new workflow" className="inline-flex font-medium items-center text-gray-600">
            <IoMdAdd className="w-12 h-12 mb-3" />
          </button>
        </div>
        {workflowList.length ? workflowList.map((workflow: WorkflowType) => (<WorkflowCard key={workflow._id} wf={workflow} />)) : ''}
      </div>
    </Layout>
  )
};

export default WorkflowListPage;