import Sidebar from "../components/sidebar/Sidebar";
import Subheader from "../components/Subheader";
import WorkFlow from "../components/WorkFlow";
import { useParams } from "react-router-dom";

const NewWorkflowPage = () => {
  const params = useParams();
  console.log(params);
  
  return (
    <div className="">
      <Sidebar />
      <div className="flex flex-col bg-teal-50 h-screen w-full">
        <Subheader />
        <WorkFlow />
      </div>
    </div>
  );
};

export default NewWorkflowPage;
