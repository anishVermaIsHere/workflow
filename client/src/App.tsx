import { ReactFlowProvider } from "@xyflow/react";
import Header from "./components/Header";
import WorkFlow from "./components/WorkFlow";
import "@xyflow/react/dist/style.css";

import Subheader from "./components/Subheader";
import { getUID } from "./utils/uidgenerator";
import Sidebar from "./components/Sidebar";


export default function App() {
  const workFlowId = `work-${getUID()}`;

  

  return (

    
    <ReactFlowProvider>
      <Header />
      <div className="flex ">
      <Sidebar />

      </div>
      <Subheader workFlowId={workFlowId} />
      <WorkFlow />
    </ReactFlowProvider>
  );
}
