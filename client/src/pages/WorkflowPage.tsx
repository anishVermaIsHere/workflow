import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Header from '../components/Header'
import Sidebar from '../components/sidebar/Sidebar'
import Subheader from '../components/Subheader'
import WorkFlow from '../components/WorkFlow'
import useWorkFlowStore from '../store/workflow.store';
import { workflowAPI } from '../shared/services/api/workflow';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import { formatDistanceToNow } from 'date-fns';



// const Modal=({ handleModal }: { handleModal: ()=>void })=>{
//   const { workflowTitle, instance, setWorkflowTitle } = useWorkFlowStore(state=>state);

//   const handleChange=(event: ChangeEvent<HTMLInputElement>)=>{
//     setWorkflowTitle(event.target.value);
//   };

//   const onSave = useCallback(async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (instance) {
//       const flow = instance.toObject();
//       const workflowObj = {
//         ...flow,
//         title: workflowTitle,
//       };
//       console.log(workflowObj)
//       // const res = await workflowAPI.create(workflowObj);
//       // if (res.status === 201) {
//       //   toast.success("Saved successfully");
//       // }
//     }
//     handleModal();
//   }, [instance, workflowTitle]);


//   return <div className="overflow-y-auto overflow-x-hidden bg-[#00000094] fixed top-0 right-0 left-0 z-[999] flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
//     <div className="relative p-4 w-full max-w-md max-h-full">
//       <div className="relative bg-white rounded-lg shadow ">
//         <button onClick={handleModal} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
//           <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//           </svg>
//           <span className="sr-only">Close modal</span>
//         </button>
//         <div className="p-4 md:p-5">
//           <h3 className="text-lg font-normal">Filename</h3>
//           <form onSubmit={onSave} method='POST'>
//             <div className='mb-5'>
//                 <input 
//                 type="text" 
//                 name="filename" 
//                 value={workflowTitle} 
//                 onChange={handleChange} 
//                 placeholder="••••••••" 
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded  block w-full p-2.5" 
//                 required 
//                 />
//             </div>
//             <button 
//             type="submit" 
//             className="text-white bg-teal-700 focus:ring-4 focus:outline-none rounded inline-flex items-center px-2 py-1 text-center">
//               Save
//             </button>
//             <button onClick={handleModal} type="button" className="ms-4 text-white bg-gray-700 focus:ring-4 focus:outline-none rounded inline-flex items-center px-2 py-1 text-center">
//               Cancel
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// };



const WorkflowPage = () => {
  const params = useParams();
  const { isPending, isSuccess,  isError, error, data } = useQuery({
    queryKey: ["workflow", params.id],
    queryFn: async () => await workflowAPI.fetchById(params.id!),
    // enabled: !!params?.id
  });
  const { setNodes, setEdges, setWorkflowTitle, setWorkflowId, setViewport, setCreatedAt, setUpdatedAt } = useWorkFlowStore(state=>state);

  useEffect(()=>{
    const workflow = data?.data;
    if(workflow){
      setNodes(workflow.nodes);
      setEdges(workflow.edges);
      setWorkflowId(workflow._id);
      setWorkflowTitle(workflow.title);
      setViewport(workflow.viewport);
      setCreatedAt(workflow.createdAt);
      const updatedAt=formatDistanceToNow(workflow.updatedAt);
      setUpdatedAt(updatedAt);

    }

  }, [isSuccess]);


  if(!params.id){
   return <Alert message='No id provided' type='warning' />
  }

  if(isError) {
    return <Alert message={error.message} type='error' />
  }

  if(isPending){
    return <Spinner />
  }

  return (
    <div className="flex">
      <Sidebar />
        <div className="bg-teal-50 w-full h-screen">
          <Header />
          <Subheader />
          <WorkFlow />
        </div>        
    </div>
  )
};

export default WorkflowPage;