import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { workflowAPI } from '../../shared/services/api/workflow';
import Spinner from '../Spinner';
import { WorkflowType } from '../../shared/types';
import { FaRegFile } from "react-icons/fa";
import useWorkFlowStore from '../../store/workflow.store';



const WorkList = () => {
    const navigate=useNavigate();
    const { workflowList, setWorkflowList } = useWorkFlowStore(state=>state);
    const { isPending, isSuccess, data } = useQuery({
        queryKey: ["workflows"],
        queryFn: async () => await workflowAPI.fetch()
    });


    const openFile=(workflowId: string)=>{
        navigate(`/user/workflow/${workflowId}`);  
    };

    useEffect(()=>{
        if(data?.data){
            setWorkflowList(data.data);
        }
    }, [isSuccess]);


    if(isPending){
        return <Spinner />
    }

    return (
        <div className='mt-4'>
            <p className='font-semibold me-4'>List</p>
            <div className='overflow-auto h-[200px]'>
                {workflowList.length ? workflowList?.map((wf: WorkflowType)=>{ 
                    return <div 
                            onClick={()=>openFile(wf._id)} 
                            className={`flex items-center my-[0.22rem] p-1 text-sm text-gray-600 hover:font-semibold transition-all duration-100 cursor-pointer rounded`} 
                            key={wf._id}
                            >
                            <FaRegFile className='me-1 w-5 h-5'/>
                            <p className='truncate w-full'>{wf.title}</p>                                
                        </div>
                })
                :
                <div>No workflows</div>            
                }
            </div>
        </div>
    )
}

export default WorkList