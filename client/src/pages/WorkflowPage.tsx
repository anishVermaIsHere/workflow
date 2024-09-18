import Sidebar from '../components/Sidebar'
import Subheader from '../components/Subheader'
import WorkFlow from '../components/WorkFlow'

const WorkflowPage = () => {
  return (
    <div className="">
        <Sidebar />
        <div className="flex flex-col bg-teal-50 h-screen w-full">
        <Subheader />
        <WorkFlow />
        </div>
    </div>
  )
}

export default WorkflowPage