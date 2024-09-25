import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Subheader from '../components/Subheader'
import WorkFlow from '../components/WorkFlow'
import useWorkFlowStore from '../store/workflow.store';
import { workflowAPI } from '../shared/services/api/workflow';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import { formatDistanceToNow } from 'date-fns';
import { Viewport } from '@xyflow/react';
import Layout from '../components/Layout';


const WorkflowPage = () => {
  const params = useParams();
  const { isPending, isSuccess,  isError, error, data } = useQuery({
    queryKey: ["workflow", params.id],
    queryFn: async () => await workflowAPI.fetchById(params.id!),
    // enabled: !!params?.id
  });
  const { setNodes, setEdges, setWorkflowId, setWorkflowTitle, setViewport, setCreatedAt, setUpdatedAt } = useWorkFlowStore(state=>state);

  const reInitWorkflowValues=()=>{
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
  };

  useEffect(()=>{
    reInitWorkflowValues();

    return()=>{
        setNodes([]);
        setEdges([]);
        setWorkflowId('');
        setWorkflowTitle('');
        setViewport({} as Viewport);
        setCreatedAt('');
        setUpdatedAt('');
    }

  }, [isSuccess, params.id]);  


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
    <Layout>
      <Subheader />
      <WorkFlow />
    </Layout>
  )
};

export default WorkflowPage;