import { MouseEvent } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { WorkflowType } from '../shared/types';
import { workflowAPI } from '../shared/services/api/workflow';
import { NavLink } from 'react-router-dom';
import { FaRegFile } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { IoTrashOutline } from 'react-icons/io5';


const WorkflowCard = ({ wf }:{ wf: WorkflowType })=>{

    const queryClient=useQueryClient();
    const deleteMutation = useMutation({
      mutationFn: async(workflowId: string )=>{
        await workflowAPI.delete(workflowId);
      },
      onSuccess: () => {
        toast.success('Deleted');
      },
      onSettled:async(_,error)=>{
        if(error){
            toast.error(`${error}`);
        }
        else { 
          queryClient.invalidateQueries({ queryKey: ['workflows'] }); 
        }
      }
    });

    const handleDelete=async(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        e.stopPropagation();  
        deleteMutation.mutate(wf._id);
    }

    
  return (
    <>
    <NavLink to={`/user/workflow/${wf._id}`} className="flex flex-col justify-between w-full md:max-w-[300px] p-4 bg-white border border-gray-200 hover:bg-gray-200 cursor-pointer rounded-lg shadow">
        <div>
          <FaRegFile className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-700 truncate">{wf.title}</h5>
          <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(wf.updatedAt)}
          </p>
        </div>
        
        <button 
        onClick={handleDelete} 
        className="inline-flex font-medium items-center px-2 py-1 text-red-500 hover:bg-red-200 hover:text-red-600 rounded">
            <IoTrashOutline className='w-5 h-5 me-2'/>
            Delete
        </button>
     </NavLink>
    </>
)
}

export default WorkflowCard;